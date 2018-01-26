const {getOrders, splitOrders} = require('../repositories/orders')

const createOrder = async (ctx) => {
  ctx.body = 'Not Implemented!';
}

const fetchOrders = async (ctx) => {
  const orders = await getOrders();
  
  ctx.body = {
    orders: splitOrders(orders),
    msg:`Orders for User: ${ctx.state.user}`
  };
}


module.exports = {createOrder, fetchOrders};
