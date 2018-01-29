const firebase = require('firebase')
const {promisify} = require('util')
const {fromJS, Map, List} = require('immutable')
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
    ? await upsertOrders(upsertOrders)
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
  const orderResult = await firebase.database().ref(`/orders`).push(order);
  await firebase.database().ref(`/accounts/${account}/orders/${orderResult.key}`).set(true);
}

const splitOrders = orders => 
  orders.reduce((acc, order, key) => {
    return order.get('type') === 'ask'
      ? acc.update('askOrders', askOrders => askOrders.push(order.set('key', key)))
      : acc.update('bidOrders', bidOrders => bidOrders.push(order.set('key', key)));
  }, Map({
    askOrders: List(),
    bidOrders: List()
  }))

const getOrders = async order => { 
  const orders = await firebase.database()
    .ref(`/orders`)
    .once('value');
  
  return fromJS(orders.toJSON() || []);
}

module.exports = {getOrders, splitOrders, upsertOrder, upsertOrders, triggerOrderMathing}
