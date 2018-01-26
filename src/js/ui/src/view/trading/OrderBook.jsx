import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {compare} from '../../utils/utils'
import './styles.scss'
import {fetchOrders} from '../../data/token/tokenActions'

export default class OrderBook extends Component {

  async componentDidMount() {
    const orders = await fetchOrders()
    console.log('orders', orders)
    this.setState({asks: orders.askOrders, bids: orders.bidOrders})
  }

  renderBids = () => {
    if(!this.state.bids) {
      return ''
    }
    const orderedBids = this.state.bids.sort(compare)
    return orderedBids.map((bid, i) => (
      <div className="order-item" key={i}>
        <span>Price: {bid.price}</span> a<span>Qnt: {bid.qty}</span>
      </div>
    ))
  }

  cancelOrderButton = (flag) => {
    return (
      <a href="#">
        <strong>
          {flag ? 'X' : ' '}
        </strong>
      </a>
    )
  }

  renderAsks = () => {
    if (!this.state.asks) {
      return ''
    }

    const orderedAsks = this.state.asks.sort(compare)

    return orderedAsks.map((ask, i) => (
      <div className="order-item" key={i}>
        <span>Price: {ask.price}</span> <span>Qnt: {ask.qty}</span>
        {ask.owned ? this.cancelOrderButton(true) : this.cancelOrderButton()}
      </div>
    ))
  }

  render() {
    return (
      <div id="order-book">
        <div id="bids" className="ordersWrapper">
          {this.renderBids()}
        </div>
        <div id="spread">SPREAD</div>
        <div id="asks" className="ordersWrapper">
          {this.renderAsks()}
        </div>
      </div>
    )
  }
}