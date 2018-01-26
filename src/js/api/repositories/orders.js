const firebase = require('firebase')
const {promisify} = require('util')
const {fromJS, Map, List} = require('immutable')

const splitOrders = orders => 
  orders.reduce((acc, order) => {
    return order.get('type') === 'ask'
      ? acc.update('askOrders', List(), askOrders => askOrders.push(order),)
      : acc.update('bidOrders', List(), bidOrders => bidOrders.push(order));
  }, Map())

const getOrders = async order => { 
  const orders = await firebase.database()
    .ref(`/orders`)
    .once('value');
  
  return fromJS(orders.toJSON());
}

const upsertOrder = async order => {
  await firebase.database()
      .ref(`/accounts/${account}`)
      .set(createAccount(name, iban, email));
}

module.exports = {getOrders, splitOrders, upsertOrder}
