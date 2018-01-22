const {partial} = require('../helpers/fn')
const {createOrder, getOrders} = require('./orderApi')

const routes = {
  '/orders': {
    method: 'post',
    fn: partial(createOrder)
  },
  
  '/orders': {
    method: 'get',
    fn: partial(getOrders),
    auth: true
  }
};

module.exports = routes;
