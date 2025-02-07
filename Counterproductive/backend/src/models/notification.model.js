import mongoose,{Schema} from "mongoose";

const notificationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['purchase', 'donation', 'expiry', 'general'],
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
});

export const Notification = mongoose.model('Notification', notificationSchema);
