const {HttpError} = require('../core/api')
const {filterFilledOrders, getOrders, splitOrders, upsertOrders, triggerOrderMathing} = require('../repositories/orders')

const createOrder = async (ctx) => {
  try {
    await triggerOrderMathing(ctx.request.body, ctx.state.user);

    ctx.status = 204;
  }
  catch(err) {
    ctx.status = 500;
    ctx.body = HttpError(500, 'Error');
  }
}

const fetchOrders = async (ctx) => {
  try {
    const orders = await getOrders();
    const ordersGroup = splitOrders(orders);

    ctx.body = {
      askOrders: filterFilledOrders(ordersGroup.get('askOrders')),
      bidOrders: filterFilledOrders(ordersGroup.get('bidOrders'))
    };
  }
  catch(err) {
    ctx.status = 500;
    ctx.body = HttpError(500, 'Error');
  }
}


module.exports = {createOrder, fetchOrders};
