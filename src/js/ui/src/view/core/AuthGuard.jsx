import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {CircularProgress} from 'material-ui/Progress'
import {getItem} from '../../services/storage'
import {login} from '../../services/crypto'

class AuthGuard extends Component {
  constructor(props, state) {
    super(props, state);
  }

  state = {
    isAuthenticated: null,
    error: null
  }

  componentDidMount() {
    if(this.verifyToken()) {
      this.markAuthenticated(true);
    }
    else {
      this.login();
    } 
  }

  markAuthenticated(status) {
    this.setState({isAuthenticated: status});
  }

  verifyToken() {
    const token = getItem(process.env.ACCESS_TOKEN_KEY);
    return Boolean(token);
  }

  getAccountData() {
    return JSON.parse(getItem(process.env.ACCOUNT_DATA_KEY));
  }

  async login() {
    try {
      await login();
      this.markAuthenticated(true);
    }
    catch(error) {
      this.setState({error})
    }
  }

  render() {
    const Component = this.props.component;

    if(this.state.isAuthenticated === null) {
      return <CircularProgress thickness={7} />
    }

    return this.state.isAuthenticated
      ? <Component accountData={this.getAccountData()}/>
      : <Redirect to={{
          pathname: '/login',
          state: {
            from: this.props.location
          }
        }}/>
  }
}

export default AuthGuard
