import React, { Component } from 'react'
import TabContent from './TabContent'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import {Grid, Col, Row} from 'react-flexbox-grid'

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
    console.log('transfering!')
  }

  render() {
    return (
      <TabContent>
        <Grid>
          <Row middle='xs'>
            <Col xs={6}>
              <TextField
                id='toAccount'
                margin='normal'
                label='To Account'
                value={this.state.toAccount}
                onChange={this.onAccountChange}
              />
            </Col> 
            <Col xs={6}>
              <TextField
                id='amount'
                margin='normal'
                label='Amount'
                value={this.state.amount}
                onChange={this.onAccountChange}
              />
            </Col>
          </Row>
          <Row end='xs'>
            <Col>
              <Button raised onClick={this.transfer}>Transfer</Button>
            </Col>
          </Row>
        </Grid>  
      </TabContent>
    )
  }
}

export default TransactionTab
