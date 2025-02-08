import mongoose, { Schema } from "mongoose";

const ObjectId = Schema.ObjectId;

// Schemas

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const MessageSchema = new Schema({
  room: { type: String, required: true },
  sender: { type: String, required: true },
  message: { type: String },
  file: { type: String, default: null }, // url
  timestamp: { type: Date, default: Date.now },
  fileName: { type: String, default: null },
  fileType: { type: String, default: null },
});

const imageMetaSchema = new Schema({
  room: { type: String, required: true },
  sender: { type: String, required: true },
  fileUrl: { type: String, required: true },
  dir: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now },
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
});

// Collection Models
const userModel = mongoose.model("user", userSchema);
const messageModel = mongoose.model("message", MessageSchema);
const imageMetaModel = mongoose.model("imageMeta", imageMetaSchema);

export { userModel, messageModel, imageMetaModel };
