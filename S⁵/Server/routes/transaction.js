const express = require('express');

const router = new express.Router();
const { createNewTransaction, getTransaction } = require('../controller/transaction-controller');

/**
 * @description This is for creating Transaction
 */
router.post('/transaction', (req, res) => { createNewTransaction(req, res) });

/**
 * @description This is for getting Transaction
 */
router.get('/transaction/:id', (req, res) => { getTransaction(req, res) });

module.exports = router;
