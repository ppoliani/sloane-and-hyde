const entries = require('../helpers/entries');

const routes = [
  require('../endpoints/auth/authRoutes'),
  require('../endpoints/order/orderRoutes')
];

const setup = router => {
  routes.forEach(route => {
    for(let [endpoint, {method, middlewares = [], fn}] of entries(route)) {
      router[method](endpoint.replace(/[$]*/g,''), ...middlewares, fn);
    }
  });

  return router;
};

module.exports = setup;
