export const sortOrders = (orders, type) => {
  const retValue = type === 'ask' ? 1 : -1;

  return orders.sort((orderA, orderB) => {
    if(orderA.price > orderB.price) return retValue;
    if(orderA.price < orderB.price) return -1 * retValue;
    
    // if equal then sort by date
    if(orderA.ts > orderB.ts) return retValue;
    if(orderA.ts < orderB.ts) return -1 * retValue;

    return retValue;
  });
}
