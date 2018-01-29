
import React, {Component} from 'react'
import {Grid, Col, Row} from 'react-flexbox-grid'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import AppBar from 'material-ui/AppBar'
import Tabs, {Tab} from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import TabContent from '../tabs/TabContent'

export default class OrderInput extends Component {
  state = {
    maxBalance: 9999,
    qty: '',
    type: 'bid',
    price: '',
    selectedTab: 0
  }

  getBalanceOf = async () => {
    this.setState({ balance: AsyncData.Loading() });
    const balance = await this.props.getBalanceOf(this.state.account);
    this.setState({ balance: AsyncData.Success(balance) });
  }

  handleQtyUpdate = (e) => {
    var reg = /^-?\d*\.?\d*$/;
    if (reg.test(e.target.value)) {
      const {ownBalance} = this.props;
      if(e.target.value > ownBalance) {
        alert(`This order is bigger than your balance. Your balance is: ${ownBalance}`)
        return
      }
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  sendOrder = async (e) => {
    e.preventDefault()
    const {type, qty, price} = this.state
    const balance = await this.props.submitOrder({type, qty: Number(qty), price: Number(price)});
    this.props.onOrderSubmitted()
  }

  handleTabChange = (event, selectedTab) => {
    const type = selectedTab === 0 ? 'bid' : 'ask';
    this.setState({selectedTab, type});
  }

  renderOrderForm() {
    const {type, qty, price} = this.state

    return (
      <TabContent>
        <form onSubmit={this.sendOrder}>
          <Grid>
            <Row>
              <Col>
                <TextField
                    id='qty'
                    margin='normal'
                    name='qty'
                    label='Order Size'
                    value={qty}
                    onChange={this.handleChange}
                  />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextField
                    id='price'
                    margin='normal'
                    name='price'
                    label='Price'
                    value={price}
                    onChange={this.handleChange}
                  />
              </Col>
            </Row>
            <Row end='xs'>
              <Button raised onClick={this.sendOrder}>Send</Button>
            </Row>
          </Grid>
        </form>
      </TabContent>
    )
  }

  render() {
    const {selectedTab} = this.state;

    return (
      <div>
        <AppBar position='static'>
        <Tabs value={selectedTab} onChange={this.handleTabChange} centered>
          <Tab label='Buy' />
          <Tab label='Sell' />
        </Tabs>
        {selectedTab === 0 && this.renderOrderForm()}
        {selectedTab === 1 && this.renderOrderForm()}
        </AppBar>
      </div>
    )
  }
}
