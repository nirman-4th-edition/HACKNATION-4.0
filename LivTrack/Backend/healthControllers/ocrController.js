const vision = require("@google-cloud/vision");
const CholesterolTestMetric = require("../healthModels/cholesterolMetricModel"); // Import the Mongoose model
const { extractHealthParameters } = require("../utils/textParser"); // Helper function to parse health data

// Instantiates a client for Google Vision API
const client = new vision.ImageAnnotatorClient();

const cholesterolExtractTextAndSaveToDB = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Convert image buffer to Base64
    const base64Image = req.file.buffer.toString("base64");
    const image = { content: base64Image };

    // Perform text detection using Google Vision API
    const [result] = await client.textDetection({ image });
    const ocrText = result.fullTextAnnotation
      ? result.fullTextAnnotation.text
      : "";

    console.log("Extracted Text:", ocrText);

    // Extract health parameters
    const healthParameters = extractHealthParameters(ocrText);

    if (
      !healthParameters ||
      !healthParameters.metrics ||
      !healthParameters.metrics.lipidProfile
    ) {
      return res
        .status(400)
        .json({ error: "No cholesterol data found in report" });
    }

    // Extract relevant cholesterol data
    const lipidProfile = healthParameters.metrics.lipidProfile;

    // Create a new CholesterolTestMetric document
    const cholesterolTest = new CholesterolTestMetric({
      user: req.user.id, // Assuming user info is in req.user
      cholesterolLevels: {
        totalCholesterol: lipidProfile.TotalCholesterol
          ? [lipidProfile.TotalCholesterol.value]
          : [],
        ldl: lipidProfile.LDL ? [lipidProfile.LDL.value] : [],
        hdl: lipidProfile.HDL ? [lipidProfile.HDL.value] : [],
        triglycerides: lipidProfile.Triglycerides
          ? [lipidProfile.Triglycerides.value]
          : [],
        vldl: lipidProfile.VLDL ? [lipidProfile.VLDL.value] : [],
        nonHdlCholesterol: lipidProfile.NonHDL
          ? [lipidProfile.NonHDL.value]
          : [],
      },
      units: {
        totalCholesterol: lipidProfile.TotalCholesterol
          ? lipidProfile.TotalCholesterol.unit
          : "",
        ldl: lipidProfile.LDL ? lipidProfile.LDL.unit : "",
        hdl: lipidProfile.HDL ? lipidProfile.HDL.unit : "",
        triglycerides: lipidProfile.Triglycerides
          ? lipidProfile.Triglycerides.unit
          : "",
        vldl: lipidProfile.VLDL ? lipidProfile.VLDL.unit : "",
        nonHdlCholesterol: lipidProfile.NonHDL ? lipidProfile.NonHDL.unit : "",
      },
      source: "OCR", // Indicating the data came from OCR processing
      testMethod: "Blood Test", // Placeholder, can be modified if test method is available in extracted text
      reportGeneratedBy: "", // Extract if available
      reportComments: "", // Extract if available
      testLocation: "", // Extract if available
    });

    // Save to database
    await cholesterolTest.save();

    // Respond with saved data
    res.status(200).json({
      message: "Cholesterol test data saved successfully",
      extractedText: ocrText,
      savedData: cholesterolTest,
    });
  } catch (error) {
    console.error("Error processing OCR and saving data:", error);
    res.status(500).json({ error: "Failed to extract and save data" });
  }
};

module.exports = { cholesterolExtractTextAndSaveToDB };
