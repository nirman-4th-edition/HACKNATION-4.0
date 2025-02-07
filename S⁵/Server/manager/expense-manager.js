const { Expense } = require('../models/index');

const createExpense = async (data) => {
  try {
    const exp = await Expense.create(data);
    return exp;
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

const getExpenseByUserId = async (userId) => {
  try {
    const expenses = await Expense.find({ user_id: userId }).sort({ created_at: -1 });
    return expenses[0];
  } catch (error) {
    console.error(error);
    throw new Error;
  }
}

module.exports = {
  createExpense,
  getExpenseByUserId,
}