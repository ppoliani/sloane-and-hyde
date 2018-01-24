const {List} = require('immutable')

const match = (order, bidOrders, askOrders) => {
  return order.type === 'ask' 
    ? matchAskOrder(order, bidOrders)
    : matchBidOrder(order, askOrders)
}

const matchAskOrder = (order, bidOrders) => {
}

const matchBidOrder = (order, askOrders) => {
  const {qty, price} = order.toJS();

  askOrders.reduce((filledOrders, askOrder) => {
    if(price >= askOrder.get('price')) {
      const remainingQty = Math.abs(askOrder.get('qty') - filledOrders.get('remainingQty'))

      return filledOrders.update(['list'], l => l.push(askOrder.set('qty', )))
    }
  }, Map({ list: List(), remainingQty: qty }));
}
