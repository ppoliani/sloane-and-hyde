import React, { Component } from 'react'
import TabContent from './TabContent'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'

class TransactionTab extends Component {
  state = {
    amount: '',
    toAccount: ''
  };

  onAccountChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  transfer = async () => {
    const {toAccount, amount} = this.state
    const balance = await this.props.transfer(toAccount, amount);
  }

  render() {
    return (
      <TabContent>
        Transaction
        <br />
        <TextField
          id='amount'
          margin='normal'
          label='Amount'
          value={this.state.amount}
          onChange={this.onAccountChange}
        />
        <TextField
          id='toAccount'
          margin='normal'
          label='To Account'
          value={this.state.toAccount}
          onChange={this.onAccountChange}
        />
        <br />
        <Button raised onClick={this.transfer}>Transfer</Button>

      </TabContent>
    )
  }
}

export default TransactionTab
