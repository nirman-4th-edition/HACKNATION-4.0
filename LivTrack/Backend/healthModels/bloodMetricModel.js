const mongoose = require("mongoose");

const bloodTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // ✅ Complete Blood Count (CBC)
  rbc: { type: [Number], default: [] }, // Red Blood Cell Count
  wbc: { type: [Number], default: [] }, // White Blood Cell Count
  hemoglobin: { type: [Number], default: [] },
  hematocrit: { type: [Number], default: [] }, // % of blood volume occupied by RBCs
  mcv: { type: [Number], default: [] }, // Mean Corpuscular Volume
  mch: { type: [Number], default: [] }, // Mean Corpuscular Hemoglobin
  mchc: { type: [Number], default: [] }, // Mean Corpuscular Hemoglobin Concentration
  rdw: { type: [Number], default: [] }, // Red Cell Distribution Width
  plateletCount: { type: [Number], default: [] }, // Platelets

  wbcDifferential: {
    neutrophils: { type: [Number], default: [] },
    lymphocytes: { type: [Number], default: [] },
    eosinophils: { type: [Number], default: [] },
    monocytes: { type: [Number], default: [] },
    basophils: { type: [Number], default: [] },
  },

  // ✅ Cholesterol & Lipid Profile
  cholesterol: {
    total: { type: [Number], default: [] }, // Total Cholesterol
    hdl: { type: [Number], default: [] }, // High-Density Lipoprotein (Good)
    ldl: { type: [Number], default: [] }, // Low-Density Lipoprotein (Bad)
    triglycerides: { type: [Number], default: [] },
  },

  // ✅ Blood Sugar
  glucose: { type: [Number], default: [] }, // Fasting Blood Sugar
  hba1c: { type: [Number], default: [] }, // HbA1c (Diabetes marker)

  // ✅ Kidney Function Tests (KFT)
  kidneyFunction: {
    creatinine: { type: [Number], default: [] },
    urea: { type: [Number], default: [] },
    bun: { type: [Number], default: [] }, // Blood Urea Nitrogen
  },

  // ✅ Liver Function Tests (LFT)
  liverFunction: {
    alt: { type: [Number], default: [] }, // Alanine Aminotransferase (SGPT)
    ast: { type: [Number], default: [] }, // Aspartate Aminotransferase (SGOT)
    alp: { type: [Number], default: [] }, // Alkaline Phosphatase
    bilirubinTotal: { type: [Number], default: [] },
    bilirubinDirect: { type: [Number], default: [] },
    bilirubinIndirect: { type: [Number], default: [] },
  },

  // ✅ Electrolytes & Minerals
  electrolytes: {
    sodium: { type: [Number], default: [] },
    potassium: { type: [Number], default: [] },
    calcium: { type: [Number], default: [] },
  },

  // ✅ Thyroid Function Tests (TFT)
  thyroidFunction: {
    t3: { type: [Number], default: [] },
    t4: { type: [Number], default: [] },
    tsh: { type: [Number], default: [] },
  },

  // ✅ Additional Fields
  testType: { type: String, required: true }, // e.g., "CBC", "LFT", "KFT"
  units: {
    hemoglobin: String,
    rbc: String,
    wbc: String,
    plateletCount: String,
    glucose: String,
    cholesterol: String,
    creatinine: String,
    sodium: String,
  },
  referenceRanges: {
    hemoglobin: String,
    rbc: String,
    wbc: String,
    plateletCount: String,
    glucose: String,
    cholesterol: String,
    creatinine: String,
    sodium: String,
  },

  date: { type: Date, default: Date.now }, // Date of the test
  source: String, // e.g., "Apollo Hospital"
});

const BloodTestMetric = mongoose.model("BloodTestMetric", bloodTestSchema);

module.exports = BloodTestMetric;
