const test = require('ava')
const {fromJS} = require('immutable')
const {match} = require('./matching')

test.beforeEach(t => {
  t.context.bidOrders = fromJS([
    {id: 1, qty: 100, price: 20, filled: 0, type: 'bid'},
    {id: 2, qty: 100, price: 15, filled: 0, type: 'bid'},
    {id: 3, qty: 50, price: 10, filled: 0, type: 'bid'},
  ]);

  t.context.askOrders = fromJS([
    {id: 4, qty: 100, price: 30, filled: 0, type: 'ask'},
    {id: 5, qty: 200, price: 40, filled: 0, type: 'ask'},
    {id: 6, qty: 200, price: 50, filled: 0, type: 'ask'}
  ]);
});

test('match orders should return empty array if no orders where filled', async t => {
  const {bidOrders, askOrders} = t.context;
  const [updatedOrders, matches] = match(bidOrders, askOrders);
  const result = [...updatedOrders.values()];

  t.deepEqual(result, []);
});

test('match orders should return an empty array if there is no bidOrders available', async t => {
  const [updatedOrders, matches] = match(fromJS([]), t.context.askOrders);
  const result = [...updatedOrders.values()];
  t.deepEqual(result, []);
});

test('match orders should return an empty array if there is no askOrders available', async t => {
  const [updatedOrders, matches] = match(t.context.bidOrders, fromJS([]));
  const result = [...updatedOrders.values()];
  t.deepEqual(result, []);
});

test('match orders should partially fill the first order', async t => {
  const {askOrders} = t.context;
  const bidOrders = t.context.bidOrders.unshift(fromJS({id: 7, qty: 50, price: 30, type: 'bid'}));
  
  const expected = [
    {id: 4, qty: 50, price: 30, filled: 50, type: 'ask'},
    {id: 7, qty: 0, price: 30, filled: 50, type: 'bid'}
  ];

  const [updatedOrders, matches] = match(bidOrders, askOrders);
  const result = [...updatedOrders.values()].map(o => o.toJS());
  t.deepEqual(result, expected);
});

test('match orders should fill multiple orders', async t => {
  const {askOrders} = t.context;
  const bidOrders = t.context.bidOrders.unshift(
    fromJS({id: 7, qty: 50, price: 30, type: 'bid'}),
    fromJS({id: 8, qty: 100, price: 30, type: 'bid'})
  );
  
  const expected = [
    {id: 4, qty: 0, price: 30, filled: 100, type: 'ask'},
    {id: 7, qty: 0, price: 30, filled: 50, type: 'bid'},
    {id: 8, qty: 50, price: 30, filled: 50, type: 'bid'}
  ];

  const [updatedOrders, matches] = match(bidOrders, askOrders);
  const result = [...updatedOrders.values()].map(o => o.toJS());

  t.deepEqual(result, expected);
});

test('match orders should fill multiple orders', async t => {
  const {askOrders} = t.context;
  const bidOrders = t.context.bidOrders.unshift(
    fromJS({id: 7, qty: 50, price: 50, type: 'bid'}),
    fromJS({id: 8, qty: 100, price: 42, type: 'bid'}),
    fromJS({id: 9, qty: 100, price: 40, type: 'bid'})
  );
  
  const expected = [
    {id: 4, qty: 0, price: 30, filled: 100, type: 'ask'},
    {id: 7, qty: 0, price: 50, filled: 50, type: 'bid'},
    {id: 8, qty: 0, price: 42, filled: 100, type: 'bid'},
    {id: 5, qty: 50, price: 40, filled: 150, type: 'ask'},
    {id: 9, qty: 0, price: 40, filled: 100, type: 'bid'},
  ];

  const [updatedOrders, matches] = match(bidOrders, askOrders);
  const result = [...updatedOrders.values()].map(o => o.toJS());

  t.deepEqual(result, expected);
});

test('match orders should fill multiple orders', async t => {
  const {askOrders} = t.context;
  const bidOrders = t.context.bidOrders.unshift(
    fromJS({id: 7, qty: 50, price: 50, type: 'bid'}),
    fromJS({id: 8, qty: 100, price: 42, type: 'bid'}),
    fromJS({id: 9, qty: 100, price: 40, type: 'bid'}),
    fromJS({id: 10, qty: 100, price: 40, type: 'bid'})
  );
  
  const expected = [
    {id: 4, qty: 0, price: 30, filled: 100, type: 'ask'},
    {id: 7, qty: 0, price: 50, filled: 50, type: 'bid'},
    {id: 8, qty: 0, price: 42, filled: 100, type: 'bid'},
    {id: 5, qty: 0, price: 40, filled: 200, type: 'ask'},
    {id: 9, qty: 0, price: 40, filled: 100, type: 'bid'},
    {id: 10, qty: 50, price: 40, filled: 50, type: 'bid'},
  ];

  const [updatedOrders, matches] = match(bidOrders, askOrders);
  const result = [...updatedOrders.values()].map(o => o.toJS());
  t.deepEqual(result, expected);
});

test('match orders should return a map of all matching orders', async t => {
  const {askOrders} = t.context;
  const bidOrders = t.context.bidOrders.unshift(fromJS({id: 7, qty: 50, price: 30, type: 'bid'}));
  const expected = [
    {ask: 4, bid: 7, filled: 50}
  ];

  const [_, matches] = match(bidOrders, askOrders);
  const result = [...matches.values()].map(o => o.toJS());
  t.deepEqual(result, expected);
});

test('match orders should return a map of all matching orders', async t => {
  const {askOrders} = t.context;
  const bidOrders = t.context.bidOrders.unshift(
    fromJS({id: 7, qty: 50, price: 30, type: 'bid'}),
    fromJS({id: 8, qty: 100, price: 30, type: 'bid'})
  );
  
  const expected = [
    {ask: 4, bid: 7, filled: 50},
    {ask: 4, bid: 8, filled: 50}
  ];

  const [_, matches] = match(bidOrders, askOrders);
  const result = [...matches.values()].map(o => o.toJS());

  t.deepEqual(result, expected);
});
