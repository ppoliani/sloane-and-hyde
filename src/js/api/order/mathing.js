const {List, Map} = require('immutable')

// Expects an order list of bid and ask orders.
const match = (bidOrders, askOrders) => matchOrders(Map(), bidOrders, askOrders);

const fillOrder = (order, qty) => {
  const orderQty = order.get('qty');
  const filled = qty >= orderQty ? orderQty : qty;

  return order
    .set('filled', filled + order.get('filled', 0))
    .set('qty', orderQty - filled);
}

const matchOrders = (updatedOrders, bidOrders, askOrders) => {
  let topAsk = askOrders.get(0);
  let topBid = bidOrders.get(0);

  if(topBid.get('price') < topAsk.get('price')) return updatedOrders;

  // update orders
  const askQty = topAsk.get('qty');
  const bidQty = topBid.get('qty');

  topAsk = fillOrder(topAsk, bidQty);
  topBid = fillOrder(topBid, askQty);

  updatedOrders = updatedOrders
    .set(topAsk.get('id'), topAsk)
    .set(topBid.get('id'), topBid);

  bidOrders = topBid.get('qty') === 0
    ? bidOrders.shift()
    : bidOrders.set(0, topBid);
  
  askOrders = topAsk.get('qty') === 0
    ? askOrders.shift()
    : askOrders.set(0, topAsk);

  return matchOrders(updatedOrders, bidOrders, askOrders);
}

module.exports = {match}
