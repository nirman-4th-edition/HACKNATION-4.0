const { createTransaction, getTransactionByUserId } = require('../manager/transaction-manager');

const createNewTransaction = async (req, res) => {
  try {
    const data = req.body;
    const trans = await createTransaction(data);
    if (trans) {
      res.status(201).json({ message: 'Transaction created successfully' });
    }
  } catch (error) {
    console.error("Error creating new transaction", error);
    res.status(400).json({ error: "Error creating new transaction" });
  }
};

const getTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transactions = await getTransactionByUserId(id);
    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error getting transactions", error);
    res.status(500).json({ error: "Error getting transactions" });
  }
}


module.exports = {
  createNewTransaction,
  getTransaction,
}
