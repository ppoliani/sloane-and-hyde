import React, { Component } from 'react'
import Tabs, { Tab } from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import BalanceTab from './BalanceTab'
import WhiteListTab from './WhiteListTab'
import TransactionTab from './TransactionTab'

class TabContainer extends Component {
  render() {
    const { handleTabChange, selectedTab, getBalanceOf, balances, transfer, addToWhitelist } = this.props;

    return (
      <AppBar position='static'>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label='Balances' />
          <Tab label='Whitelist' />
          <Tab label='Transfer' />
        </Tabs>
        {selectedTab === 0 && <BalanceTab getBalanceOf={getBalanceOf} balances={balances} />}
        {selectedTab === 1 && <WhiteListTab addToWhitelist={addToWhitelist} />}
        {selectedTab === 2 && <TransactionTab transfer={transfer} />}
      </AppBar>
    )
  }
}

export default TabContainer

