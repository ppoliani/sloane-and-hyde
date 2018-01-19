import {connect} from 'react-redux'
import {getAllBalances, getBalanceOf, addToWhitelist} from '../data/token/tokenActions'

export default Home => {
  const mapStateToProps = state => ({});

  const mapDispatchToProps = dispatch => ({
    getAllBalances,
    getBalanceOf,
    addToWhitelist
  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
