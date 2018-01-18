import React, {Component} from 'react'
import Tabs, {Tab} from 'material-ui/Tabs'
import AppBar from 'material-ui/AppBar'
import BalanceTab from './BalanceTab'

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
        <Tabs value={selectedTab} onChange={this.handleChange}>
          <Tab label='Balances' />
          <Tab label='White List' />
          <Tab label='Transfer' />
        </Tabs>
        {selectedTab === 0 && <BalanceTab token={token} getBalanceOf={getBalanceOf} />}
        {selectedTab === 1 && <div>White List</div>}
        {selectedTab === 2 && <div>Transfer</div>}
      </AppBar>
    )
  }
}

export default TabContainer

