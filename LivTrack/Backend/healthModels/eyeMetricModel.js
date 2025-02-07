const mongoose = require("mongoose");

const eyeTestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  visualAcuity: {
    rightEye: {
      type: String, // e.g., "20/20"
      required: true,
    },
    leftEye: {
      type: String,
      required: true,
    },
    withCorrection: {
      type: String, // e.g., "20/20"
      required: true,
    },
  },
  intraocularPressure: {
    rightEye: {
      type: Number, // in mmHg
      required: true,
    },
    leftEye: {
      type: Number,
      required: true,
    },
  },
  pupilReactivity: {
    rightEye: {
      type: String, // e.g., "Normal"
      required: true,
    },
    leftEye: {
      type: String,
      required: true,
    },
  },
  visualFieldTest: {
    rightEye: {
      type: String, // e.g., "Normal"
      required: true,
    },
    leftEye: {
      type: String,
      required: true,
    },
  },
  refraction: {
    rightEye: {
      sphere: {
        type: Number, // in diopters
        required: true,
      },
      cylinder: {
        type: Number,
        required: true,
      },
      axis: {
        type: Number, // in degrees
        required: true,
      },
    },
    leftEye: {
      sphere: {
        type: Number,
        required: true,
      },
      cylinder: {
        type: Number,
        required: true,
      },
      axis: {
        type: Number,
        required: true,
      },
    },
  },
  fundusExamination: {
    rightEye: {
      type: String, // e.g., "Normal"
      required: true,
    },
    leftEye: {
      type: String,
      required: true,
    },
  },
  testDate: {
    type: Date,
    default: Date.now,
  },
  examiner: {
    type: String, // Name of the examiner
    required: true,
  },
  additionalNotes: {
    type: String, // Any additional observations
  },
});

const EyeTestMetric = mongoose.model("EyeTestMetric", eyeTestSchema);

module.exports = EyeTestMetric;
