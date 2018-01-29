const {HttpError} = require('../core/api')
const {getOrders, splitOrders, upsertOrders, triggerOrderMathing} = require('../repositories/orders')

const createOrder = async (ctx) => {
  try {
    await triggerOrderMathing(ctx.request.body, ctx.state.user);

    ctx.body = result;
  }
  catch(err) {
    ctx.status = 500;
    ctx.body = HttpError(500, 'Error');
  }
}

const fetchOrders = async (ctx) => {
  try {
    const orders = await getOrders();
    ctx.body = splitOrders(orders);
  }
  catch(err) {
    ctx.status = 500;
    ctx.body = HttpError(500, 'Error');
  }
}


module.exports = {createOrder, fetchOrders};
