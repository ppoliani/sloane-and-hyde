import React, {Component} from 'react'
import {Grid, Col, Row} from 'react-flexbox-grid'
import TabContent from './TabContent'
import OrderBook from '../trading/OrderBook'
import OrderInput from '../trading/OrderInput'

class TradeTab extends Component {
  render() {
    const {fetchOrders, submitOrder, ownBalance} = this.props;

    return (
      <TabContent>
        <Grid>
          <Row>
            <Col xs={8}>
              <OrderBook fetchOrders={fetchOrders}/> 
            </Col>
            <Col xs={4}>
              <OrderInput submitOrder={submitOrder} ownBalance={ownBalance} />
            </Col>
          </Row>
        </Grid>
      </TabContent>
    )
  }
}

export default TradeTab
