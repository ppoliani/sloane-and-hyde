import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { submitOrder } from '../../data/token/tokenActions'

export default class OrderInput extends Component {
  state = {
    maxBalance: 9999,
    qty: '',
    type: '',
    price: ''
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
    const { type, qty, price } = this.state
    const balance = await this.props.submitOrder({type, qty, price});
  }

  render() {
    return (
      <div>
        <h1>Insert order</h1>
        <form  onSubmit={this.sendOrder}>
          <input type="text" name="qty" onChange={this.handleChange} value={this.state.qty} />
          <input type="text" name="price" onChange={this.handleChange} value={this.state.price} />
          <input type="radio" value="ask" onChange={this.handleChange} name="type" /> BUY
          <input type="radio" value="bid" onChange={this.handleChange} name="type" /> SELL
          <button type="submit" >Send Order</button>
        </form>
      </div>
    )
  }
}
