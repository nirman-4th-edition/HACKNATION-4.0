const mongoose = require("mongoose");

const cholesterolTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cholesterolLevels: {
    totalCholesterol: {
      type: [Number], // Multiple readings can be stored
      default: [],
    },
    ldl: {
      type: [Number],
      default: [],
    },
    hdl: {
      type: [Number],
      default: [],
    },
    triglycerides: {
      type: [Number],
      default: [],
    },
    vldl: {
      // Added field for Very Low-Density Lipoprotein (VLDL)
      type: [Number],
      default: [],
    },
    nonHdlCholesterol: {
      // Added field for non-HDL cholesterol
      type: [Number],
      default: [],
    },
  },
  units: {
    totalCholesterol: { type: String, default: "mg/dL" },
    ldl: { type: String, default: "mg/dL" },
    hdl: { type: String, default: "mg/dL" },
    triglycerides: { type: String, default: "mg/dL" },
    vldl: { type: String, default: "mg/dL" },
    nonHdlCholesterol: { type: String, default: "mg/dL" },
  },
  referenceRanges: {
    totalCholesterol: String,
    ldl: String,
    hdl: String,
    triglycerides: String,
    vldl: String, // Added reference range for VLDL
    nonHdlCholesterol: String, // Added reference range for non-HDL cholesterol
  },
  date: {
    type: Date,
    default: Date.now,
  },
  source: String,
  testMethod: String, // Added field to store the method used for the test
  reportGeneratedBy: String, // Added field to store who generated the report
  reportComments: String, // Added field for any additional comments in the report
  testLocation: String, // Added field for the location where the test was conducted
});

const CholesterolTestMetric = mongoose.model(
  "CholesterolTestMetric",
  cholesterolTestSchema
);

module.exports = CholesterolTestMetric;
