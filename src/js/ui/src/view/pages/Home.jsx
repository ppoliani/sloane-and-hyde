import React, {Component} from 'react'
import HomeConnection from '../../bridge/HomeConnection'
import TabContainer from '../tabs'

class Home extends Component {
  async componentDidMount() {
    const {getAllBalances} = this.props;

    const balances = await getAllBalances();
    console.log('>>>>>>>>', balances) 
    // load data
    // props.getBalanceOf()
    // tokenActions.getAllBalances()
  }

  render() {
    const {getBalanceOf, token} = this.props;

    return (
      <div className='page'>
        <TabContainer 
          token={token}
          getBalanceOf={getBalanceOf}
        />
      </div>
    );
  }
}

export default HomeConnection(Home);
