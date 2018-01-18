import {connect} from 'react-redux'
import {getBalanceOf, addToWhitelist} from '../data/token/tokenActions'

export default Home => {
  const mapStateToProps = state => ({
    token: state.token
  });

  const mapDispatchToProps = dispatch => ({
    getBalanceOf: (dispatch) ['∘'] (getBalanceOf),
    addToWhitelist: (dispatch) ['∘'] (addToWhitelist),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
