const homeRouter = require('./home');
const userRouter = require('./user');
const logRouter = require('./log');

function route(app) {
  app.use('/user', userRouter);
  app.use('/log', logRouter);
  app.use('/', homeRouter);
}

module.exports = route;
