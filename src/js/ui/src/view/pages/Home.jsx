import React, {Component} from 'react'
import HomeConnection from '../../bridge/HomeConnection'
import TabContainer from '../tabs'

class Home extends Component {
  state = {
    balances: []
  }

  async componentDidMount() {
    const {getAllBalances} = this.props;
    const balances = await getAllBalances();

    this.setState({balances})
  }

  render() {
    const {getBalanceOf} = this.props;
    const {balances} = this.state;

    return (
      <div className='page'>
        <TabContainer 
          balances={balances}
          getBalanceOf={getBalanceOf}
        />
      </div>
    );
  }
}

export default HomeConnection(Home);
