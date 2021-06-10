const homeRouter = require('./home');
const userRouter = require('./user');
const logRouter = require('./log');
const billRouter = require('./bill');
const authRouter = require('./auth');

function route(app) {
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/log', logRouter);
  app.use('/bill', billRouter);
  app.use('/', homeRouter);
}

module.exports = route;
