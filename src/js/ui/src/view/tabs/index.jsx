import React, {Component} from 'react'
import Tabs, {Tab} from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import BalanceTab from './BalanceTab'
import WhiteListTab from './WhiteListTab'
import TransactionTab from './TransactionTab'

class TabContainer extends Component {
  state = {
    selectedTab: 0
  }

  handleChange = (event, selectedTab) => {
    this.setState({selectedTab});
  }

  render() {
    const {selectedTab} = this.state;
    const {token, getBalanceOf} = this.props;

    return (
      <AppBar position='static'>
        <Tabs value={selectedTab} onChange={this.handleChange} centered>
          <Tab label='Balances' />
          <Tab label='Whitelist' />
          <Tab label='Transfer' />
        </Tabs>
        {selectedTab === 0 && <BalanceTab token={token} getBalanceOf={getBalanceOf} />}
        {selectedTab === 1 && <WhiteListTab />}
        {selectedTab === 2 && <TransactionTab />}
      </AppBar>
    )
  }
}

export default TabContainer

