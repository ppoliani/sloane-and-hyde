import React, { Component } from 'react'
import HomeConnection from '../../bridge/HomeConnection'
import TabContainer from '../tabs'

class Home extends Component {
  state = {
    balances: [],
    selectedTab: 0
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { getAllBalances } = this.props;
    const balances = await getAllBalances();

    this.setState({ balances })
  }

  handleTabChange = (event, selectedTab) => {
    this.setState({ selectedTab });
  }

  render() {
    const {getBalanceOf, transfer, addToWhitelist, accountData, submitOrder, fetchOrders} = this.props;
    const {balances, selectedTab} = this.state;

    return (
      <div className='page'>
        <TabContainer
          role={accountData.role}
          handleTabChange={this.handleTabChange}
          selectedTab={selectedTab}
          balances={balances}
          getBalanceOf={getBalanceOf}
          fetchOrders={fetchOrders}
          transfer={transfer}
          addToWhitelist={addToWhitelist}
          submitOrder={submitOrder}
        />
      </div>
    );
  }
}

export default HomeConnection(Home);
