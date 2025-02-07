import mongoose,{Schema} from "mongoose";

const auditLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true 
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
