import { Schema, model } from "mongoose";
const session = new Schema({
	sessionID: String,
	data: Object,
	creationDate: Date,
	expiryDate: Date,
});
export const Session = model("Session", session);
