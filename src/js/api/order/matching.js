const {List, Map} = require('immutable')

// Expects an order list of bid and ask orders.
const match = (bidOrders, askOrders) => matchOrders(Map(), List(), bidOrders, askOrders);

const fillOrder = (order, qty) => {
  const orderQty = order.get('qty');
  const filled = qty >= orderQty ? orderQty : qty;
  const filledOrder = order
    .set('filled', filled + order.get('filled', 0))
    .set('qty', orderQty - filled);

  return [filledOrder, filled];
}

const createMatchObj = (bid, ask, filled) => Map({
  bid: bid.get('id'),
  ask: ask.get('id'),
  filled
})

const matchOrders = (updatedOrders, matches, bidOrders, askOrders) => {
  if(bidOrders.size === 0 || askOrders.size === 0) return [updatedOrders, matches];

  let topAsk = askOrders.get(0);
  let topBid = bidOrders.get(0);

  if(topBid.get('price') < topAsk.get('price')) return [updatedOrders, matches];

  // update orders
  const askQty = topAsk.get('qty');
  const bidQty = topBid.get('qty');

  [topAsk, filled] = fillOrder(topAsk, bidQty);
  [topBid] = fillOrder(topBid, askQty);

  matches = matches.push(createMatchObj(topBid, topAsk, filled));

  updatedOrders = updatedOrders
    .set(topAsk.get('id'), topAsk)
    .set(topBid.get('id'), topBid);

  bidOrders = topBid.get('qty') === 0
    ? bidOrders.shift()
    : bidOrders.set(0, topBid);
  
  askOrders = topAsk.get('qty') === 0
    ? askOrders.shift()
    : askOrders.set(0, topAsk);

  return matchOrders(updatedOrders, matches, bidOrders, askOrders);
}

module.exports = {match}
