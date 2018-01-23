const passport = require('koa-passport')
const entries = require('../helpers/entries')

const routes = [
  require('../auth/authRoutes'),
  require('../account/accountRoutes'),
  require('../order/orderRoutes')
];

const setup = router => {
  routes.forEach(route => {
    for(let [endpoint, {method, auth, middlewares = [], fn}] of entries(route)) {
      middlewares = auth
        ? [passport.authenticate('bearer', {session: false}), ...middlewares]
        : middlewares;

      router[method](endpoint.replace(/[$]*/g,''), ...middlewares, fn);
    }
  });

  return router;
};
module.exports = setup;
