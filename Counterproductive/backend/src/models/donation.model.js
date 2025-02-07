import mongoose,{Schema} from 'mongoose';

const donationSchema = new Schema({
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  foodListing: {
    type: Schema.Types.ObjectId,
    ref: 'FoodListing',
    required: true,
  },
  charity: {
    type: Schema.Types.ObjectId,
    ref: 'Charity',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined', 'completed'],
    default: 'pending',
  },
  pickupDate: {
    type: Date,
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true
});

export const Donation = mongoose.model('Donation', donationSchema);
