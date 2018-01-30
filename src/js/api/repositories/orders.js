const {promisify} = require('util')
const {fromJS, Map, List} = require('immutable')
const {db} = require('../core/db')
const {match} = require('../order/matching')

const triggerOrderMathing = async (order, account) => {
  const newOrderId = db().ref(`/orders`).push().key;
  const newOrder = {...order, id: newOrderId, ts: Number(new Date())}
  const orders = await getOrders();
  const splitedOrders = splitOrders(orders)
  const finalOrderList = newOrder.type === 'ask' 
    ? splitedOrders.update('askOrders', askOrders => askOrders.push(fromJS(newOrder)))
    : splitedOrders.update('bidOrders', bidOrders => bidOrders.push(fromJS(newOrder)));

  const sortedBidOrders = filterFilledOrders(sortOrders(finalOrderList.get('bidOrders'), 'bid'))
  const sortedAskOrders = filterFilledOrders(sortOrders(finalOrderList.get('askOrders'), 'ask'))
  const [matchedOrders, matches] = match(sortedBidOrders, sortedAskOrders);

  const saveMatchesReq = saveMatches(matches);
  const saveOrdersReq = matchedOrders.size > 0
    ? upsertOrders(matchedOrders, account)
    : upsertOrder(newOrder, account);

  return await Promise.all([saveMatchesReq, saveOrdersReq])
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

const saveMatches = async matches => {
  const batch = matches.map(async match => db().ref(`/matches`).push(match.toJS()))
  return await Promise.all(batch);
}

const upsertOrders = async (orders, account) => {
  const batch = orders.map(async order => {
    const id = order.get('id');
    return await db().ref(`/orders/${id}`).set(order.toJS());
  })
  return await Promise.all(batch);
}

const upsertOrder = async (order, account) => {
  const orderResult = await db().ref(`/orders`).push(order);
  return await db().ref(`/accounts/${account}/orders/${orderResult.key}`).set(true);
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

const filterFilledOrders = orders => orders.filter(o => o.get('qty') > 0);

const getOrders = async order => { 
  const orders = await db()
    .ref(`/orders`)
    .once('value');
  
  return fromJS(orders.toJSON() || []);
}

module.exports = {filterFilledOrders, getOrders, splitOrders, upsertOrder, upsertOrders, triggerOrderMathing}
