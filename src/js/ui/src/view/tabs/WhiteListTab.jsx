import React, { Component } from 'react'
import Maybe from 'folktale/maybe'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import {Grid, Col, Row} from 'react-flexbox-grid'
import {CircularProgress} from 'material-ui/Progress'
import AsyncData from '../../data/core/AsyncData'
import TabContent from './TabContent'

class WhiteListTab extends Component {
  state = {
    account: '',
    name: '',
    IBAN: ''
  };

  onAccountChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  }

  whitelisAddress = async () => {
    const {account, amount, name, IBAN} = this.state
    const balance = await this.props.addToWhitelist(account, true, name, IBAN);
  }

  renderForm() {
    return (
      <Grid>
        <Row>
          <Col xs={4}>
            <TextField
              id='account'
              margin='normal'
              label='Account to whitelist'
              value={this.state.account}
              onChange={this.onAccountChange}
            />
          </Col>
          <Col xs={4}>
            <TextField
              id='name'
              margin='normal'
              label="Account holder 's name"
              value={this.state.name}
              onChange={this.onAccountChange}
            />
          </Col>
          <Col xs={4}>
            <TextField
              id='IBAN'
              margin='normal'
              label="Account holder's IBAN"
              value={this.state.IBAN}
              onChange={this.onAccountChange}
            />
          </Col>
        </Row>
        <Row end='xs'>
          <Button raised onClick={this.whitelisAddress}>Whitelist Address!</Button>
        </Row>
      </Grid>
    )
  }

  render() {
    return (
      <TabContent>
        {this.renderForm()}
      </TabContent>
    )
  }
}

export default WhiteListTab
