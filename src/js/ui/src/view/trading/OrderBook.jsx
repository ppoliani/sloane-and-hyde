import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {compare} from '../../utils/utils'
import './styles.scss'

export default class OrderBook extends Component {
  constructor() {
    super()

    this.state = {
      bids: [
        {
          price: 1,
          quantity: 3,
          owners: ['123', '456']
        },
        {
          price: 1,
          quantity: 3,
          owners: ['123', '456']
        },
        {
          price: 1,
          quantity: 3,
          owners: ['123', '456']
        },
        {
          price: 12,
          quantity: 33,
          owners: ['123', '456']
        },
        {
          price: 11,
          quantity: 23,
          owners: ['123', '456']
        }
      ],
      asks: [
        {
          price: 7,
          quantity: 3,
          owners: ['123', '456']
        },
        {
          price: 127,
          quantity: 3,
          owners: ['123', '456']
        },
        {
          price: 174,
          quantity: 3,
          owners: ['123', '456']
        },
        {
          price: 17,
          quantity: 3,
          owners: ['123', '456']
        },
        {
          price: 17,
          quantity: 73,
          owners: ['123', '456']
        },
        {
          price: 61,
          quantity: 53,
          owners: ['123', '456'],
          owned: true
        }
      ]
    }
  }

  renderBids = () => {
    const orderedBids = this.state.bids.sort(compare)
    return orderedBids.map((bid, i) => (
      <div className="order-item" key={i}>
        <span>Price: {bid.price}</span> a<span>Qnt: {bid.quantity}</span>
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
    const orderedAsks = this.state.asks.sort(compare)

    return orderedAsks.map((ask, i) => (
      <div className="order-item" key={i}>
        <span>Price: {ask.price}</span> <span>Qnt: {ask.quantity}</span>
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