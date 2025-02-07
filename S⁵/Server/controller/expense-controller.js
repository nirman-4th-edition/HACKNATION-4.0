const { createExpense, getExpenseByUserId } = require('../manager/expense-manager');

const createNewExpense = async(req, res) => {
  try {
    const data = req.body;
    const exp = await createExpense(data);
    if (exp) {
      const expensePayload = {
        expenseId: exp._id,
        totalAmount: exp.total_amount,
        travelExpense: exp.travel,
        foodExpense: exp.food,
        utilitiesExpense: exp.utilities,
        entertainmentExpense: exp.entertainment,
        shoppingExpense: exp.shopping,
        healthExpense: exp.health
      }
      res.status(201).json({ message: 'Expense created successfully', expenses: expensePayload });
    }
  } catch (error) {
    console.error("Error creating new user", error);
    res.status(400).json({ error: "Error creating new user" });
  }
}

const getExpenses = async(req, res) => {
  try {
    const { id } = req.params;
    const exp = await getExpenseByUserId(id);
    console.log(exp);
    if (exp) {
      const expensePayload = {
        expenseId: exp._id,
        totalAmount: exp.total_amount,
        travelExpense: exp.travel,
        foodExpense: exp.food,
        utilitiesExpense: exp.utilities,
        entertainmentExpense: exp.entertainment,
        shoppingExpense: exp.shopping,
        healthExpense: exp.health
      }
      res.status(200).json({ message: 'Expenses fetched successfully', expenses: expensePayload });
    } else {
      res.status(404).json({ error: 'No expenses found' });
    }
  } catch (error) {
    console.error("Error fetching expenses", error);
    res.status(500).json({ error: "Error fetching expenses" });
  }
}



module.exports = {
  createNewExpense,
  getExpenses
}