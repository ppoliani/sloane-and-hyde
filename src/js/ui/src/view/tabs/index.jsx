import React, { Component } from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import BalanceTab from './BalanceTab'
import WhiteListTab from './WhiteListTab'
import {getDefaultAccount} from '../../../../common/eth/index'
import TransactionTab from './TransactionTab'
import TradeTab from './TradeTab'

class TabContainer extends Component {
  state = {
    defaultAccount: null,
    ownBalance: null
  };

  async componentDidMount() {
    const defaultAccount = await getDefaultAccount(); 
    const ownBalance = await this.props.getBalanceOf(defaultAccount)
    this.setState({defaultAccount, ownBalance: ownBalance.toNumber()});
  }

  render() {
    const {handleTabChange, selectedTab, getBalanceOf, balances, transfer, addToWhitelist, role, submitOrder, fetchOrders} = this.props;
    const {defaultAccount, ownBalance} = this.state;
    
    return (
      <AppBar position='static'>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label='Balances' />
          {role === 'admin' ? <Tab label='Whitelist' /> : null}
          <Tab label='Transfer' />
          <Tab label='Trade' />
        </Tabs>
        {selectedTab === 0 && <BalanceTab defaultAccount={defaultAccount} ownBalance={ownBalance} getBalanceOf={getBalanceOf} balances={balances} />}
        {selectedTab === 1 && role === 'admin' && <WhiteListTab addToWhitelist={addToWhitelist} />}
        {selectedTab === 2 && <TransactionTab transfer={transfer} />}
        {selectedTab === 3 && <TradeTab ownBalance={ownBalance} fetchOrders={fetchOrders} submitOrder={submitOrder} />}
      </AppBar>
    )
  }
}

export default TabContainer

