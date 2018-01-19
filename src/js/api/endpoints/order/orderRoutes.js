const {purchaseTokens, getTokenBalance} = require('./orderApi')
const {partial} = require('../../helpers/fn')
const {createOrder} = require('./orderApi')

const routes = {
  '/orders/buy': {
    method: 'post',
    fn: partial(createOrder)
  },

  '/tokens/sell': {
    method: 'post',
    fn: partial(createOrder)
  }
};

module.exports = routes;
