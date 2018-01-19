import {Map, List} from 'immutable'
import {handleActions} from 'redux-actions'
import AsyncData from '../core/AsyncData'

const TokenModel = Map({
  balances: Map(),
  whitelist: Map()
});

export default handleActions({
}, TokenModel)
