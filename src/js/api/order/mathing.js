const {List, Map} = require('immutable')

const groupById = orders => orders.groupBy(o => o.get('id'))

// Expects an order list of bid and ask orders.
const match = (bidOrders, askOrders) => {
  // let i = 0;
  // let result = [];
  // let completed = false;

  // while(!completed && i < bidOrders.size) {
  //   const bidOrder = bidOrders.get(i);
  //   [bidOrder, askOrders] = matchOrders(bidOrder, askOrders);

  //   if(matches.size === 0) {
  //     completed = true;
  //   }

  //   result = [...result, ...matches];
  //   i += 1;
  // }

  return newMatchOrders(Map(), bidOrders, askOrders);
}

const matchAskOrder = (order, bidOrders) => {
}

const fillOrder = (order, qty) => {
  const orderQty = order.get('qty');
  const filled = qty >= orderQty
    ? orderQty
    : orderQty - qty;

  return order
    .set('filled', filled + order.get('filled', 0))
    .set('qty', orderQty - filled);
}

const matchOrders = (bidOrder, askOrders) => {
  const {qty, price} = bidOrder.toJS();

  return askOrders.reduce((filledOrders, askOrder) => {
    const unFilledQty = filledOrders.get('unFilledQty');

    if(unFilledQty > 0 && price >= askOrder.get('price')) {
      const newQty = askOrder.get('qty') - unFilledQty;
      const updatedAskOrder = fillOrder(askOrder, unFilledQty);
      const updatedBidOrder = fillOrder(bidOrder, unFilledQty);

      return filledOrders
        .update('list', l => l.push([updatedAskOrder, updatedBidOrder]))
        .set('unFilledQty', Math.abs(Math.min(newQty, 0)));
    }

    return filledOrders;
  }, Map({ list: List(), unFilledQty: qty }))
  .get('list')
}


/// NEW APPROACH
const newMatchOrders = (updatedOrders, bidOrders, askOrders) => {
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

  return newMatchOrders(updatedOrders, bidOrders, askOrders);
}

module.exports = {match}
