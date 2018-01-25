const test = require('ava')
const {fromJS} = require('immutable')
const {match} = require('./mathing')

test.beforeEach(t => {
  t.context.bidOrders = fromJS([
    {qty: 100, price: 20, filled: 0, type: 'bid'},
    {qty: 100, price: 15, filled: 0, type: 'bid'},
    {qty: 50, price: 10, filled: 0, type: 'bid'},
  ]);

  t.context.askOrders = fromJS([
    {qty: 100, price: 30, filled: 0, type: 'ask'},
    {qty: 200, price: 40, filled: 0, type: 'ask'},
    {qty: 200, price: 50, filled: 0, type: 'ask'}
  ]);
});

test('match bid order should return empty array if no orders where filled', async t => {
  const {bidOrders, askOrders} = t.context;
  const order = fromJS({qty: 50, price: 5, type: 'bid'});

  t.deepEqual(match(order, bidOrders, askOrders).toJS(), []);
});

test('match bid orders partially fill the first order', async t => {
  const {bidOrders, askOrders} = t.context;
  const order = fromJS({qty: 50, price: 30, type: 'bid'});
  const expected = [
    {qty: 50, price: 30, type: 'bid'}
  ];

  t.deepEqual(match(order, bidOrders, askOrders).toJS(), [{}]);
});
