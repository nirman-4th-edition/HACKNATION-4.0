const mongoose = require('mongoose');

module.exports = () => {
  const transactionSchema = new mongoose.Schema({
    date: {
      type: [String],
    },
    description: {
      type: [String],
    },
    amount: {
      type: [Number],
    },
    category: {
      type: [String],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    }
  }, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  });
  return mongoose.model('Transactions', transactionSchema);
};
