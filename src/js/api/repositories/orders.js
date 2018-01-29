const {promisify} = require('util')
const {fromJS, Map, List} = require('immutable')
const {db} = require('../core/db')
const {match} = require('../order/matching')

const triggerOrderMathing = async (order, account) => {
  const newOrder = {...order, ts: Number(new Date())}
  const orders = await getOrders();
  const splitedOrders = splitOrders(orders)
  const finalOrderList = newOrder.type === 'ask' 
    ? splitedOrders.update('askOrders', askOrders => askOrders.push(fromJS(newOrder)))
    : splitedOrders.update('bidOrders', bidOrders => bidOrders.push(fromJS(newOrder)));

  const sortedBidOrders = sortOrders(finalOrderList.get('bidOrders'), 'bid')
  const sortedAskOrders = sortOrders(finalOrderList.get('askOrders'), 'ask')
  const matchedOrders = match(sortedBidOrders, sortedAskOrders);

  return matchedOrders.size > 0
    ? await upsertOrders(matchedOrders)
    : await upsertOrder(newOrder, account);
}

const sortOrders = (orders, type) => {
  const retValue = type === 'ask' ? 1 : -1;

  return orders.sort((orderA, orderB) => {
    if(orderA.get('price') > orderB.get('price')) return retValue;
    if(orderA.get('price') < orderB.get('price')) return -1 * retValue;
    
    // if equal then sort by date
    if(orderA.get('ts') > orderB.get('ts')) return retValue;
    if(orderA.get('ts') < orderB.get('ts')) return -1 * retValue;

    return retValue;
  });
}

const upsertOrders = async orders => {
  console.log('>>>>>>>>', orders.toJS())
}

const upsertOrder = async (order, account) => {
  const orderResult = await db().ref(`/orders`).push(order);
  await db().ref(`/accounts/${account}/orders/${orderResult.key}`).set(true);
}

const splitOrders = orders => 
  orders.reduce((acc, order, key) => {
    return order.get('type') === 'ask'
      ? acc.update('askOrders', askOrders => askOrders.push(order.set('id', key)))
      : acc.update('bidOrders', bidOrders => bidOrders.push(order.set('id', key)));
  }, Map({
    askOrders: List(),
    bidOrders: List()
  }))

const getOrders = async order => { 
  const orders = await db()
    .ref(`/orders`)
    .once('value');
  
  return fromJS(orders.toJSON() || []);
}

module.exports = {getOrders, splitOrders, upsertOrder, upsertOrders, triggerOrderMathing}
