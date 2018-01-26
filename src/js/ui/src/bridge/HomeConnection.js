import {connect} from 'react-redux'
import { getAllBalances, getBalanceOf, addToWhitelist, transfer, submitOrder} from '../data/token/tokenActions'

export default Home => {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({
    getAllBalances,
    getBalanceOf,
    addToWhitelist,
    transfer,
    submitOrder
  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
