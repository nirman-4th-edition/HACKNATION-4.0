const express = require('express');

const router = new express.Router();

/**
 * @description will return health status
 */
router.get('/health', (req, res) => {
  res.status(200).json('Server Running Fine');
});

module.exports = router;
