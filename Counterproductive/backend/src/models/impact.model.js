import mongoose,{Schema} from "mongoose";

const impactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodSaved: {
    type: Number,
    default: 0, 
  },
  CO2Reduced: {
    type: Number,
    default: 0, 
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true
});

export const Impact = mongoose.model('Impact', impactSchema);
