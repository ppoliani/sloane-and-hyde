import React, { Component } from 'react'
import Maybe from 'folktale/maybe'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Grid, Col, Row } from 'react-flexbox-grid';
import { CircularProgress } from 'material-ui/Progress'
import AsyncData from '../../data/core/AsyncData'
import TabContent from './TabContent'
import PieChart from "../charts/pieChart";
import {getDefaultAccount} from '../../../../common/eth/index'
import OrderBook from '../trading/OrderBook'
import OrderInput from '../trading/OrderInput'

class BalanceTab extends Component {
  state = {
    defaultAccount: null,
    account: '',
    balance: AsyncData.Empty(),
    ownBalance: null
  };

  async componentDidMount() {
    const defaultAccount = await getDefaultAccount(); 
    const ownBalance = await this.props.getBalanceOf(defaultAccount)
    this.setState({defaultAccount, ownBalance: ownBalance.toNumber()});
  }

  onAccountChange = event => {
    this.setState({ account: event.target.value });
  }

  getBalanceOf = async () => {
    this.setState({ balance: AsyncData.Loading() });
    const balance = await this.props.getBalanceOf(this.state.account);
    this.setState({ balance: AsyncData.Success(balance) });
  }

  renderBalance() {
    return (
      <div>
        {this.state.balance.matchWith({
          Empty: () => null,
          Loading: () => <CircularProgress thickness={7} />,
          Success: ({ data }) => (
            <Typography type='headline' component='p'>
              Balance: {data.toString()}
            </Typography>
          ),
          Failure: ({ error }) => (
            <Typography type='headline' component='p'>
              An error occured: {error}
            </Typography>
          ),
        })}
      </div>
    );
  }

  renderForm() {
    return (
      <Grid>
        <Row>
          <Col>
            <TextField
              id='name'
              margin='normal'
              label='Account'
              value={this.state.account}
              onChange={this.onAccountChange}
            />
          </Col>
        </Row>
        <Row>
          <Button raised onClick={this.getBalanceOf}>Show Balance</Button>
        </Row>
        <div>
          {this.renderBalance()}
        </div>
      </Grid>
    )
  }

  render() {
    const {fetchOrders, submitOrder, balances} = this.props;

    return (
      <TabContent>
        <OrderBook fetchOrders={fetchOrders}/>
        <OrderInput submitOrder={submitOrder} ownBalance={this.state.ownBalance} />
        {this.renderForm()}
        <PieChart balances={balances} defaultAccount={this.state.defaultAccount} />
      </TabContent>
    )
  }
}

export default BalanceTab
