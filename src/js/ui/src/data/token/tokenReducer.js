import {Map, List} from 'immutable'
import {handleActions} from 'redux-actions'
import {GET_TOKEN_BALANCE, ADD_TO_WHITELIST} from './tokenActions'
import AsyncData from '../core/AsyncData'

const handleUpdateBalances = (state, {payload}) => state.setIn(['balances', payload.account], payload.balance);
const handleUpdateWhitelist = (state, {payload}) => state.setIn(['whitelist', payload.account], payload.isWhitelisted);

const TokenModel = Map({
  balances: Map(),
  whitelist: Map()
});

export default handleActions({
  [GET_TOKEN_BALANCE]: handleUpdateBalances,
  [ADD_TO_WHITELIST]: handleUpdateWhitelist
}, TokenModel)
