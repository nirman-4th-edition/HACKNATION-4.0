const mongoose = require('mongoose');

module.exports = () => {
  const userSchema = new mongoose.Schema({
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone_no: {
      type: Number,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    monthly_income: {
      type: Number,
    },
    total_expense: {
      type: Number,
    },
    total_savings: {
      type: Number,
    },
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });

  userSchema.virtual('expense', {
    ref: 'Expenses',
    localField: '_id',
    foreignField: 'user_id',
    justOne: false,
    options: { sort: { created_at: -1 } }
  });

  return mongoose.model('Users', userSchema);
};
