import {connect} from 'react-redux'
import {getBalanceOf} from '../data/token/tokenActions'

export default Home => {
  const mapStateToProps = state => ({
    token: state.token
  });

  const mapDispatchToProps = dispatch => ({
    getBalanceOf: (dispatch) ['∘'] (getBalanceOf),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Home);
}
