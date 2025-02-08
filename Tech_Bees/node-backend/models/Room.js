import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
  },
  roomLink: {
    type: String,
  },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
