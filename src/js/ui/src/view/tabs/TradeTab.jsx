import React, {Component} from 'react'
import {Grid, Col, Row} from 'react-flexbox-grid'
import TabContent from './TabContent'
import OrderBook from '../trading/OrderBook'
import OrderInput from '../trading/OrderInput'

class TradeTab extends Component {
  state = {
    asks: [],
    bids: []
  }

  async componentWillMount() {
    await this.fetchOrders();
  }

  async fetchOrders() {
    const orders = await this.props.fetchOrders()
    this.setState({bids: orders.bidOrders, asks: orders.askOrders})
  }

  onOrderSubmitted = async () => {
    await this.fetchOrders();
  }

  render() {
    const {submitOrder, ownBalance} = this.props;
    const {asks, bids} = this.state;

    return (
      <TabContent>
        <Grid>
          <Row>
            <Col xs={8}>
              <OrderBook asks={asks} bids={bids} /> 
            </Col>
            <Col xs={4}>
              <OrderInput onOrderSubmitted={this.onOrderSubmitted} submitOrder={submitOrder} ownBalance={ownBalance} />
            </Col>
          </Row>
        </Grid>
      </TabContent>
    )
  }
}

export default TradeTab
