const {partial} = require('../../common/fn')
const {createOrder, fetchOrders} = require('./orderApi')

const routes = {
  '/orders': {
    method: 'post',
    auth: true,
    fn: partial(createOrder)
  },
  
  '/orders$': {
    method: 'get',
    fn: partial(fetchOrders),
    auth: true
  }
};

module.exports = routes;
