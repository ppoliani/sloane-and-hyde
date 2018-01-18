import {createAction} from 'redux-actions'
import promisify from 'es6-promisify'
import {Map} from 'immutable'
import AsyncData from '../core/AsyncData'
import {partial} from '../../services/fn'
import SLADCoinContract from '../../services/eth/contracts/SLADCoin'

export const GET_TOKEN_BALANCE = 'TOKEN::GET_TOKEN_BALANCE';

const createGetBalanceAction = payload => createAction(GET_TOKEN_BALANCE)(payload);

export const getBalanceOf = account => async dispatch => {
  try {
    dispatch(
      createGetBalanceAction(
        {account, balance: AsyncData.Loading()}
      )
    );
    
    const getBalanceOf = promisify(SLADCoinContract.balanceOf);
    const balance = await getBalanceOf(account);

    return dispatch(
      createGetBalanceAction(
        {account, balance: AsyncData.Success(balance)}
      )
    );
  }
  catch(err) {
    // raise an error action
    console.log('>>>>>>>>', err);
  }
}
