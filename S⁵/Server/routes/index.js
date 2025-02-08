const Health = require('./health');
const Auth = require('./auth');
const Expense = require('./expense');
const Transaction = require('./transaction');



module.exports = (app) => {
  app.use('/api', Auth);
  app.use('/api', Expense);
  app.use('/api', Transaction);
  app.use(Health);
}