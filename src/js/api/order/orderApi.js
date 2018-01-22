const createOrder = async (ctx) => {
  ctx.body = 'Not Implemented!';
}

const getOrders = async (ctx) => {
  ctx.body = {order:`Orders for User: ${ctx.state.user}`};
}


module.exports = {createOrder, getOrders};
