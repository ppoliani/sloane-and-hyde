import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { submitOrder } from '../../data/token/tokenActions'

export default class OrderInput extends Component {
  state = {
    maxBalance: 9999,
    orderBalance: '',
    orderType: ''
  }

  getBalanceOf = async () => {
    this.setState({ balance: AsyncData.Loading() });
    const balance = await this.props.getBalanceOf(this.state.account);
    this.setState({ balance: AsyncData.Success(balance) });
  }

  inputUpdate = (e) => {
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

  sendOrder = async () => {
    const { orderType, size, price } = this.state
    const balance = await submitOrder(orderType, size, price);
  }

  render() {
    return (
      <div>
        <h1>Insert order</h1>
        <input type="text" name="orderBalance" value={this.state.orderBalance} onChange={this.inputUpdate} />
        <input type="radio" value="BUY" name="orderType" /> BUY
        <input type="radio" value="SELL" name="orderType" /> SELL
        <button onClick={this.sendOrder} >Send Order</button>
      </div>
    )
  }
}