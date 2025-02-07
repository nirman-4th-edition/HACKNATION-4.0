import mongoose,{Schema} from "mongoose";

const charitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  contactInfo: {
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

export const Charity = mongoose.model('Charity', charitySchema);
