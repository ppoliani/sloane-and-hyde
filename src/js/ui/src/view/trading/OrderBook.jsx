import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {sortOrders} from '../../utils/utils'
import './styles.scss'

export default class OrderBook extends Component {
  renderBids = () => {
    const {bids} = this.props;

    if(!bids) {
      return ''
    }
    const orderedBids = sortOrders(bids, 'bid');
    return orderedBids.map((bid, i) => (
      <div className='order-item' key={i}>
        <span>Price: {bid.price}</span><span>Qnt: {bid.qty}</span>
      </div>
    ))
  }

  cancelOrderButton = (flag) => {
    return (
      <a href='#'>
        <strong>
          {flag ? 'X' : ' '}
        </strong>
      </a>
    )
  }

  renderAsks = () => {
    const {asks} = this.props;

    if (!asks) {
      return ''
    }

    const orderedAsks = sortOrders(asks, 'ask');

    return orderedAsks.map((ask, i) => (
      <div className='order-item' key={i}>
        <span>Price: {ask.price}</span> <span>Qnt: {ask.qty}</span>
        {ask.owned ? this.cancelOrderButton(true) : this.cancelOrderButton()}
      </div>
    ))
  }

  render() {
    return (
      <div id='order-book'>
        <div id='bids' className='ordersWrapper'>
          {this.renderBids()}
        </div>
        <div id='spread'>SPREAD</div>
        <div id='asks' className='ordersWrapper'>
          {this.renderAsks()}
        </div>
      </div>
    )
  }
}
