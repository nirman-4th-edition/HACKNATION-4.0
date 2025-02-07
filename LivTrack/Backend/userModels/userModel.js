const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: false,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   healthMetrics: {
//     type: [Object], // or you can define a more specific structure based on your app's needs
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('User', userSchema);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: false, // You can make this required if needed
  },
  weight: {
    type: Number,
    required: false, // You can make this required if needed
  },
  height: {
    type: Number,
    required: false, // You can make this required if needed
  },
  healthMetrics: {
    type: [Object], // or you can define a more specific structure based on your app's needs
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
