const cleanText = (ocrText) => {
  const debug = true;
  if (debug) console.log("Starting text cleaning...");

  // Enhanced patterns to remove personal information and irrelevant content
  const unwantedPatterns = [
    /(patient|patients?)\s*(name|id|details?)\s*:?.*/gi,
    /(age|sex|gender)\s*:?[\s\d\/]+(male|female)?/gi,
    /(date|lab no|ref\.? no)\s*:?[\s\w\/-]+/gi,
    /(hospital|clinic|center)\s*:?[\w\s.-]+/gi,
    /(address|phone|ph\.?)\s*:?[\d\s-]+/gi,
    /(dr\.?|doctor|consultant)\s[\w\s.-]+/gi,
    /normal\s+values?|reference\s+range/gi,
    /auth\.?\s+signatory|signature/gi,
    /[\d-]{10,}/g, // Remove long numbers (IDs, phone numbers)
  ];

  let cleanedText = ocrText;

  // Remove unwanted sections
  unwantedPatterns.forEach((pattern) => {
    cleanedText = cleanedText.replace(pattern, " ");
  });

  // Enhanced cleaning pipeline
  cleanedText = cleanedText
    .replace(/[^a-zA-Z0-9\s.,:%()\/-]/g, " ") // Keep essential symbols
    .replace(/(\d)\s+([.,])\s+(\d)/g, "$1$2$3") // Fix decimal numbers
    .replace(/\s+/g, " ")
    .replace(/\b\s*\.\s*\b/g, ". ")
    .trim()
    .toLowerCase();

  if (debug) console.log("Cleaned Text:", cleanedText);
  return cleanedText;
};

const extractHealthParameters = (ocrText) => {
  const debug = true;
  if (debug) console.log("Starting parameter extraction...");

  if (!ocrText || typeof ocrText !== "string") {
    console.error("Invalid OCR text input.");
    return {};
  }

  // Enhanced health patterns with units handling and common aliases
  const healthPatterns = {
    // Lipid Panel
    CholesterolTotal: /(total\s*chol|cholesterol,\s*total)\D*(\d+\.?\d*)/i,
    HDL: /(hdl\s*chol|hdl)\D*(\d+\.?\d*)/i,
    LDL: /(ldl\s*chol|ldl)\D*(\d+\.?\d*)/i,
    Triglycerides: /(triglycerides|tg)\D*(\d+\.?\d*)/i,

    // Blood Glucose
    GlucoseFasting: /(fasting\s*glucose|b\.?\s*sugar\s*\(?f\)?)\D*(\d+\.?\d*)/i,
    GlucosePostprandial:
      /(postprandial\s*glucose|b\.?\s*sugar\s*\(?pp\)?)\D*(\d+\.?\d*)/i,
    GlucoseRandom: /(random\s*glucose|b\.?\s*sugar\s*\(?r\)?)\D*(\d+\.?\d*)/i,

    // Kidney Function
    Urea: /(blood\s*urea|b\.?\s*urea)\D*(\d+\.?\d*)/i,
    Creatinine: /(creatinine|s\.?\s*creatinine)\D*(\d+\.?\d*)/i,
    eGFR: /(egfr|estimated\s*gfr)\D*(\d+\.?\d*)/i,

    // Liver Function
    BilirubinTotal: /(total\s*bilirubin|bilirubin\s*total)\D*(\d+\.?\d*)/i,
    SGOT: /(sgot|ast)\D*(\d+\.?\d*)/i,
    SGPT: /(sgpt|alt)\D*(\d+\.?\d*)/i,
    AlkalinePhosphatase: /(alk\s*phos|alkaline\s*phosphatase)\D*(\d+\.?\d*)/i,

    // Electrolytes
    Sodium: /(sodium|na\+?)\D*(\d+\.?\d*)/i,
    Potassium: /(potassium|k\+?)\D*(\d+\.?\d*)/i,
    Chloride: /(chloride|cl\-?)\D*(\d+\.?\d*)/i,
    Calcium: /(calcium|ca\+?)\D*(\d+\.?\d*)/i,

    // Proteins
    ProteinTotal: /(total\s*protein|protein,\s*total)\D*(\d+\.?\d*)/i,
    Albumin: /albumin\D*(\d+\.?\d*)/i,
    Globulin: /globulin\D*(\d+\.?\d*)/i,
    AGRatio: /(a[:\s/]*g\s*ratio)\D*(\d+\.?\d*)/i,

    // Others
    UricAcid: /uric\s*acid\D*(\d+\.?\d*)/i,
    VLDL: /vldl\D*(\d+\.?\d*)/i,
    LipoproteinA: /lipoprotein\s*\(?a\)?\D*(\d+\.?\d*)/i,
  };

  const extractedParams = {};
  const cleanedText = cleanText(ocrText);

  // Extract parameters with value validation
  for (const [key, pattern] of Object.entries(healthPatterns)) {
    const match = cleanedText.match(pattern);
    if (match && match[2]) {
      const value = parseFloat(match[2]);
      if (!isNaN(value)) {
        extractedParams[key] = value;
        if (debug) console.log(`Extracted ${key}: ${value}`);
      }
    }
  }

  // Organized category mapping for database storage
  const categoryMapping = {
    lipidProfile: [
      "CholesterolTotal",
      "HDL",
      "LDL",
      "Triglycerides",
      "VLDL",
      "LipoproteinA",
    ],
    glucoseMetabolism: [
      "GlucoseFasting",
      "GlucosePostprandial",
      "GlucoseRandom",
    ],
    kidneyFunction: ["Urea", "Creatinine", "eGFR", "UricAcid"],
    liverFunction: ["BilirubinTotal", "SGOT", "SGPT", "AlkalinePhosphatase"],
    electrolytes: ["Sodium", "Potassium", "Chloride", "Calcium"],
    proteinAnalysis: ["ProteinTotal", "Albumin", "Globulin", "AGRatio"],
  };

  // Structure data for database
  const structuredData = {
    timestamp: new Date().toISOString(),
    metrics: {},
  };

  for (const [category, tests] of Object.entries(categoryMapping)) {
    structuredData.metrics[category] = tests.reduce((acc, test) => {
      if (extractedParams[test] !== undefined) {
        acc[test] = {
          value: extractedParams[test],
          unit: getUnitForTest(test), // Implement unit mapping function
          status: getValueStatus(test, extractedParams[test]), // Implement status check
        };
      }
      return acc;
    }, {});
  }

  // Add unmatched parameters to miscellaneous
  structuredData.misc = Object.keys(extractedParams)
    .filter((key) => !Object.values(categoryMapping).flat().includes(key))
    .reduce((acc, key) => {
      acc[key] = extractedParams[key];
      return acc;
    }, {});

  if (debug) console.log("Structured Data:", structuredData);
  return structuredData;
};

// Helper functions (implement according to your needs)
const getUnitForTest = (test) => {
  const units = {
    CholesterolTotal: "mg/dL",
    HDL: "mg/dL",
    LDL: "mg/dL",
    // ... Add other test-unit mappings
  };
  return units[test] || "unknown";
};

const getValueStatus = (test, value) => {
  // Implement your logic to determine normal/high/low status
  return "normal"; // Placeholder
};

module.exports = { extractHealthParameters };

/////////////

// const cleanText = (ocrText) => {
//   const debug = true;
//   if (debug) console.log("Starting text cleaning...");

//   const unwantedPatterns = [
//     /(patient|patients?)\s*(name|id|details?)\s*:?.*/gi,
//     /(age|sex|gender)\s*:?[\s\d\/]+(male|female)?/gi,
//     /(date|lab no|ref\.? no)\s*:?[\s\w\/-]+/gi,
//     /(hospital|clinic|center)\s*:?[\w\s.-]+/gi,
//     /(address|phone|ph\.?)\s*:?[\d\s-]+/gi,
//     /(dr\.?|doctor|consultant)\s[\w\s.-]+/gi,
//     /normal\s+values?|reference\s+range/gi,
//     /auth\.?\s+signatory|signature/gi,
//     /[\d-]{10,}/g,
//   ];

//   let cleanedText = ocrText;

//   unwantedPatterns.forEach((pattern) => {
//     cleanedText = cleanedText.replace(pattern, " ");
//   });

//   cleanedText = cleanedText
//     .replace(/[^a-zA-Z0-9\s.,:%()\/-]/g, " ")
//     .replace(/(\d)\s+([.,])\s+(\d)/g, "$1$2$3")
//     .replace(/\s+/g, " ")
//     .replace(/\b\s*\.\s*\b/g, ". ")
//     .trim()
//     .toLowerCase();

//   if (debug) console.log("Cleaned Text:", cleanedText);
//   return cleanedText;
// };

// const extractHealthParameters = (ocrText) => {
//   const debug = true;
//   if (debug) console.log("Starting parameter extraction...");

//   if (!ocrText || typeof ocrText !== "string") {
//     console.error("Invalid OCR text input.");
//     return {};
//   }

//   const healthPatterns = {
//     CholesterolTotal:
//       /(?:(\d+\.?\d*)\s*)?(total\s*chol|cholesterol,\s*total)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     HDL: /(?:(\d+\.?\d*)\s*)?(hdl\s*chol|hdl)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     LDL: /(?:(\d+\.?\d*)\s*)?(ldl\s*chol|ldl)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Triglycerides:
//       /(?:(\d+\.?\d*)\s*)?(triglycerides|tg)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     GlucoseFasting:
//       /(?:(\d+\.?\d*)\s*)?(fasting\s*glucose|b\.?\s*sugar\s*\(?f\)?)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     GlucosePostprandial:
//       /(?:(\d+\.?\d*)\s*)?(postprandial\s*glucose|b\.?\s*sugar\s*\(?pp\)?)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     GlucoseRandom:
//       /(?:(\d+\.?\d*)\s*)?(random\s*glucose|b\.?\s*sugar\s*\(?r\)?)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Urea: /(?:(\d+\.?\d*)\s*)?(blood\s*urea|b\.?\s*urea)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Creatinine:
//       /(?:(\d+\.?\d*)\s*)?(creatinine|s\.?\s*creatinine)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     BilirubinTotal:
//       /(?:(\d+\.?\d*)\s*)?(total\s*bilirubin|bilirubin\s*total)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     SGOT: /(?:(\d+\.?\d*)\s*)?(sgot|ast)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     SGPT: /(?:(\d+\.?\d*)\s*)?(sgpt|alt)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Sodium: /(?:(\d+\.?\d*)\s*)?(sodium|na\+?)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Potassium: /(?:(\d+\.?\d*)\s*)?(potassium|k\+?)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Calcium: /(?:(\d+\.?\d*)\s*)?(calcium|ca\+?)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     ProteinTotal:
//       /(?:(\d+\.?\d*)\s*)?(total\s*protein|protein,\s*total)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Albumin: /(?:(\d+\.?\d*)\s*)?(albumin)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     Globulin: /(?:(\d+\.?\d*)\s*)?(globulin)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     AGRatio: /(?:(\d+\.?\d*)\s*)?(a[:\s/]*g\s*ratio)\s*(?:(\d+\.?\d*)\s*)?/gi,
//     UricAcid: /(?:(\d+\.?\d*)\s*)?(uric\s*acid)\s*(?:(\d+\.?\d*)\s*)?/gi,
//   };

//   const extractedParams = {};
//   const cleanedText = cleanText(ocrText);

//   for (const [key, pattern] of Object.entries(healthPatterns)) {
//     const match = cleanedText.match(pattern);
//     if (match) {
//       const value = parseFloat(
//         (match[1] || match[3] || "").replace(/[^\d.]/g, "")
//       );
//       if (!isNaN(value)) {
//         extractedParams[key] = value;
//         if (debug) console.log(`Extracted ${key}: ${value}`);
//       }
//     }
//   }

//   const categoryMapping = {
//     lipidProfile: ["CholesterolTotal", "HDL", "LDL", "Triglycerides"],
//     glucoseMetabolism: [
//       "GlucoseFasting",
//       "GlucosePostprandial",
//       "GlucoseRandom",
//     ],
//     kidneyFunction: ["Urea", "Creatinine", "UricAcid"],
//     liverFunction: ["BilirubinTotal", "SGOT", "SGPT"],
//     electrolytes: ["Sodium", "Potassium", "Calcium"],
//     proteinAnalysis: ["ProteinTotal", "Albumin", "Globulin", "AGRatio"],
//   };

//   const structuredData = {
//     timestamp: new Date().toISOString(),
//     metrics: {},
//   };

//   for (const [category, tests] of Object.entries(categoryMapping)) {
//     structuredData.metrics[category] = tests.reduce((acc, test) => {
//       if (extractedParams[test] !== undefined) {
//         acc[test] = {
//           value: extractedParams[test],
//           unit: getUnitForTest(test),
//           status: getValueStatus(test, extractedParams[test]),
//         };
//       }
//       return acc;
//     }, {});
//   }

//   structuredData.misc = Object.keys(extractedParams)
//     .filter((key) => !Object.values(categoryMapping).flat().includes(key))
//     .reduce((acc, key) => {
//       acc[key] = extractedParams[key];
//       return acc;
//     }, {});

//   if (debug) console.log("Structured Data:", structuredData);
//   return structuredData;
// };

// // Enhanced helper functions
// const getUnitForTest = (test) => {
//   const units = {
//     CholesterolTotal: "mg/dL",
//     HDL: "mg/dL",
//     LDL: "mg/dL",
//     Triglycerides: "mg/dL",
//     GlucoseFasting: "mg/dL",
//     GlucosePostprandial: "mg/dL",
//     GlucoseRandom: "mg/dL",
//     Urea: "mg/dL",
//     Creatinine: "mg/dL",
//     BilirubinTotal: "mg/dL",
//     SGOT: "IU/L",
//     SGPT: "IU/L",
//     Sodium: "meq/L",
//     Potassium: "meq/L",
//     Calcium: "mg/dL",
//     ProteinTotal: "gm/dL",
//     Albumin: "gm/dL",
//     Globulin: "gm/dL",
//     UricAcid: "mg/dL",
//   };
//   return units[test] || "unknown";
// };

// const normalRanges = {
//   CholesterolTotal: { min: 125, max: 200 },
//   HDL: { min: 30, max: 65 },
//   LDL: { min: 85, max: 130 },
//   Triglycerides: { min: 25, max: 200 },
//   GlucoseFasting: { min: 70, max: 110 },
//   GlucosePostprandial: { min: 100, max: 140 },
//   GlucoseRandom: { max: 140 },
//   Urea: { min: 10, max: 50 },
//   Creatinine: { min: 0.2, max: 1.4 },
//   BilirubinTotal: { min: 0.2, max: 1.4 },
//   SGOT: { max: 40 },
//   SGPT: { max: 35 },
//   Sodium: { min: 135, max: 155 },
//   Potassium: { min: 3.5, max: 5.0 },
//   Calcium: { min: 8.5, max: 10.5 },
//   ProteinTotal: { min: 6.0, max: 7.8 },
//   Albumin: { min: 3.5, max: 5.5 },
//   Globulin: { min: 1.5, max: 3.0 },
//   UricAcid: { male: { min: 3.4, max: 7.0 }, female: { min: 2.4, max: 5.7 } },
// };

// const getValueStatus = (test, value) => {
//   const range = normalRanges[test];
//   if (!range) return "unknown";

//   if (test === "UricAcid") {
//     // Gender-specific handling would require additional patient data
//     const combinedRange = { min: 2.4, max: 7.0 };
//     if (value < combinedRange.min) return "low";
//     if (value > combinedRange.max) return "high";
//     return "normal";
//   }

//   if (range.min !== undefined && value < range.min) return "low";
//   if (range.max !== undefined && value > range.max) return "high";
//   return "normal";
// };

// module.exports = { extractHealthParameters };
