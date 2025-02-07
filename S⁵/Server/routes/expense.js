const express = require('express');

const router = new express.Router();
const { createNewExpense, getExpenses } = require('../controller/expense-controller');

/**
 * @description This is for creating expense
 */
router.post('/expense', (req, res) => { createNewExpense(req, res) });

/**
 * @description This is for getting expense
 */
router.get('/expense/:id', (req, res) => { getExpenses(req, res) });

module.exports = router;
