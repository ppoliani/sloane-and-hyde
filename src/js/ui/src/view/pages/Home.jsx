import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import {CircularProgress} from 'material-ui/Progress'
import AsyncData from '../../data/core/AsyncData'
import HomeConnection from '../../bridge/HomeConnection'

class Home extends Component {
  state = {
    account: ''
  };

  onAccountChange = event => {
    this.setState({account: event.target.value});
  }

  getBalanceOf = () => {
    this.props.getBalanceOf(this.state.account);
  }

  renderBalance() {
    const {token} = this.props;

    return (
      <div>
        {token.getIn(['balances', this.state.account], AsyncData.Empty()).matchWith({
          Empty: () => null,
          Loading: () => <CircularProgress thickness={7} />,
          Success: ({data}) => (
            <Typography type='headline' component='p'>
              Balance: {data.toString()}
            </Typography>
          ),
          Failure: ({error}) => (
            <Typography type='headline' component='p'>
              An error occured: {error}
            </Typography>
          ),
        })}
      </div>
    );
  }

  renderForm() {
    return (
      <div>
        <TextField 
          id='name'
          margin='normal' 
          label='Account'
          value={this.state.account}
          onChange={this.onAccountChange}
        />
        <Button raised color='primary' onClick={this.getBalanceOf}>Show Balance</Button>
        <div>
          {this.renderBalance()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className='page'>
        <Typography type='headline' component='h3'>Welcome to Sloan and Hyde</Typography>
        {this.renderForm()}
      </div>
    );
  }
}

export default HomeConnection(Home);
