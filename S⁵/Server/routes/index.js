const Health = require('./health');
const Auth = require('./auth');
const Expense = require('./expense');



module.exports = (app) => {
  app.use('/api', Auth);
  app.use('/api', Expense);
  app.use(Health);
}