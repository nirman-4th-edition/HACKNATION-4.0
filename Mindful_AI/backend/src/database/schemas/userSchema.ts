import { Schema, model } from "mongoose";
const userSchema = new Schema({
	id: Number,
	googleID: String,
	name: String,
	age: String,
	email: String,
});
export const User = model("user", userSchema);
