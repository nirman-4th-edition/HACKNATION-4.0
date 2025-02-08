const { Transaction } = require('../models/index');

const createTransaction = async (data) => {
  try {
    const trx = await Transaction.create(data);
    return trx;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

const getTransactionByUserId = async (userId) => {
  try {
    const trx = await Transaction.find({ user_id: userId }).sort({ created_at: -1 });
    return trx[0];
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

module.exports = {
  createTransaction,
  getTransactionByUserId,
}