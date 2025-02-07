const mongoose = require('mongoose');

module.exports = () => {
  const expenseSchema = new mongoose.Schema({
    total_amount: {
      type: Number,
    },
    travel: {
      type: Number,
      default: 0
    },
    food: {
      type: Number,
      default: 0
    },
    entertainment: {
      type: Number,
      default: 0
    },
    shopping: {
      type: Number,
      default: 0
    },
    utilities: {
      type: Number,
      default: 0
    },
    health: {
      type: Number,
      default: 0
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });
  return mongoose.model('Expenses', expenseSchema);
};
