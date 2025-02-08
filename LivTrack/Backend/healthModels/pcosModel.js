const mongoose = require("mongoose");

const PcosPcodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // ✅ Hormonal Profile
  hormones: {
    lh: { type: [Number], default: [] }, // Luteinizing Hormone
    fsh: { type: [Number], default: [] }, // Follicle-Stimulating Hormone
    estradiol: { type: [Number], default: [] }, // Estrogen
    testosterone: { type: [Number], default: [] }, // Free & Total Testosterone
    androstenedione: { type: [Number], default: [] }, // Androgen precursor
    dhea_s: { type: [Number], default: [] }, // Dehydroepiandrosterone sulfate
    amh: { type: [Number], default: [] }, // Anti-Müllerian Hormone (High in PCOS)
    shbg: { type: [Number], default: [] }, // Sex Hormone-Binding Globulin (Low in PCOS)
    cortisol: { type: [Number], default: [] }, // Stress hormone (Linked to PCOS)
  },

  // ✅ Thyroid Panel
  thyroid: {
    tsh: { type: [Number], default: [] }, // Thyroid-Stimulating Hormone
    free_t3: { type: [Number], default: [] }, // Triiodothyronine
    free_t4: { type: [Number], default: [] }, // Thyroxine
    reverse_t3: { type: [Number], default: [] }, // Reverse T3 (For deeper thyroid insights)
  },

  // ✅ Glucose & Insulin Resistance
  glucoseInsulin: {
    fasting_glucose: { type: [Number], default: [] }, // Fasting Blood Sugar
    fasting_insulin: { type: [Number], default: [] }, // Insulin Levels
    homa_ir: { type: [Number], default: [] }, // Insulin Resistance Score
    ogtt: { type: [Number], default: [] }, // Oral Glucose Tolerance Test
    hba1c: { type: [Number], default: [] }, // Long-term sugar levels (Diabetes Risk)
  },

  // ✅ Prolactin (Can be Elevated in PCOS)
  prolactin: { type: [Number], default: [] },

  // ✅ General Health Metrics
  healthMetrics: {
    weight: { type: [Number], default: [] },
    bmi: { type: [Number], default: [] },
    waist_to_hip_ratio: { type: [Number], default: [] },
  },

  // ✅ Menstrual & Ovulation Cycle Details
  cycleDetails: {
    menstrual_cycle_length: { type: [Number], default: [] },
    days_of_bleeding: { type: [Number], default: [] },
    period_irregularity: { type: Boolean, default: false },
    ovulation_tracking: { type: Boolean, default: false },
    hirsutism: { type: Boolean, default: false }, // Excess facial/body hair
    acne: { type: Boolean, default: false }, // Hormonal acne
    hair_loss: { type: Boolean, default: false }, // Thinning of scalp hair
  },

  // ✅ Lipid Profile
  lipidProfile: {
    total_cholesterol: { type: [Number], default: [] },
    ldl: { type: [Number], default: [] }, // Low-Density Lipoprotein
    hdl: { type: [Number], default: [] }, // High-Density Lipoprotein
    triglycerides: { type: [Number], default: [] },
  },

  // ✅ Ultrasound Findings (Polycystic Ovaries)
  ultrasoundFindings: {
    antralFollicleCount: { type: [Number], default: [] }, // No. of follicles
    ovarianVolume: { type: [Number], default: [] }, // Ovarian size (ml)
    multipleCystsDetected: { type: Boolean, default: false },
  },

  // ✅ Additional Fields
  createdAt: { type: Date, default: Date.now },
  testType: { type: String, required: true }, // E.g., "Hormone Test", "Thyroid Test", etc.
  source: String, // Lab name or Hospital

  // ✅ Units & Reference Ranges
  units: {
    lh: String,
    fsh: String,
    testosterone: String,
    fasting_glucose: String,
    bmi: String,
  },
  referenceRanges: {
    lh: String,
    fsh: String,
    testosterone: String,
    fasting_glucose: String,
    bmi: String,
  },
});

const PcosPcod = mongoose.model("PcosPcod", PcosPcodSchema);

module.exports = PcosPcod;
