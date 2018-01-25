const {List, Map} = require('immutable')

// Expects an order list of bid and ask orders.
// The ordering is based on the price (descending for bid and ascending for ask orders)
const match = (order, bidOrders, askOrders) => {
  return order.type === 'ask' 
    ? matchAskOrder(order, bidOrders)
    : matchBidOrder(order, askOrders)
}

const matchAskOrder = (order, bidOrders) => {
}

const fillOrder = (askOrder, qty) => {
  const orderQty = askOrder.get('qty');
  const filled = qty >= orderQty
    ? orderQty
    : orderQty - qty;

  return askOrder
    .set('filled', filled)
    .set('qty', orderQty - filled);
}

const matchBidOrder = (order, askOrders) => {
  const {qty, price} = order.toJS();

  return askOrders.reduce((filledOrders, askOrder) => {
    const unFilledQty = filledOrders.get('unFilledQty');

    if(unFilledQty > 0 && price >= askOrder.get('price')) {
      const newQty = askOrder.get('qty') - unFilledQty;
      const updatedAskOrder = fillOrder(askOrder.get('qty'), unFilledQty);

      return filledOrders
        .update(['list'], l => l.push(updatedAskOrder))
        .set('unFilledQty', Math.abs(Math.min(newQty, 0)));
    }

    return filledOrders;
  }, Map({ list: List(), unFilledQty: qty }))
  .get('list');
}

module.exports = {match}
