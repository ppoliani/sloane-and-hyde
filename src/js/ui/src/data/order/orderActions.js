import fetch from '../../services/api'

export const fetchOrders = async () => {
  try {
    return await fetch(`${process.env.API_URL}/orders`);
  }
  catch (err) {
    console.log('Error fetching orders', err);
  }
}

export const submitOrder = async order => {
  try {
    return await fetch(`${process.env.API_URL}/orders`, 'POST', order);
  }
  catch (err) {
    console.log('Error submiting orders', err);
  }
}
