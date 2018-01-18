import {Map, List} from 'immutable'
import {handleActions} from 'redux-actions'
import {GET_TOKEN_BALANCE, PURCHASE_TOKENS} from './tokenActions'
import AsyncData from '../core/AsyncData'

const handleUpdateBalances = (state, {payload}) => {
  return state.setIn(['balances', payload.account], payload.balance);
}

const TokenModel = Map({
  balances: Map()
});

export default handleActions({
  [GET_TOKEN_BALANCE]: handleUpdateBalances
}, TokenModel)
