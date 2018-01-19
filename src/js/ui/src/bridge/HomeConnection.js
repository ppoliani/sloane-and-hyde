import {connect} from 'react-redux'
import {getAllBalances, getBalanceOf, addToWhitelist, transfer} from '../data/token/tokenActions'

export default Home => {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({
    getAllBalances,
    getBalanceOf,
    addToWhitelist,
    transfer
  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
