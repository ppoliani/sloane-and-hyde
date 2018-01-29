import {connect} from 'react-redux'
import { getAllBalances, getBalanceOf, addToWhitelist, transfer} from '../data/token/tokenActions'
import {fetchOrders, submitOrder} from '../data/order/orderActions'

export default Home => {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({
    getAllBalances,
    getBalanceOf,
    addToWhitelist,
    fetchOrders,
    transfer,
    submitOrder
  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
