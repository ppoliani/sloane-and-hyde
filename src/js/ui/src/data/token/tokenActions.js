import {createAction} from 'redux-actions'
import promisify from 'es6-promisify'
import {Map} from 'immutable'
import {partial} from '../../services/fn'
import SLADCoinContract from '../../services/eth/contracts/SLADCoin'

export const getBalanceOf = async account => {
  try {
    const getBalanceOf = promisify(SLADCoinContract.balanceOf);
    return await getBalanceOf(account);
  }
  catch(err) {
    console.log('>>>>>>>>', err);
  }
}

export const getAllBalances = async () => {
  try {
    const getBalanceOf = promisify(SLADCoinContract.balanceOf);
    const getWhitelistAddresses = promisify(SLADCoinContract.getWhitelistAddresses);
    const whitelistAddresses = await getWhitelistAddresses();
    const balanceCallData = whitelistAddresses.map(addr => ({
      addr, 
      call: partial(getBalanceOf, addr)
    }));

    const balances = await whitelistAddresses.reduce(async (acc, addr) => {
      const balance = await getBalanceOf(addr);
      return [...acc, {addr, balance: balance.toNumber()}]
    }, []);

    return balances;
  }
  catch(err) {
    console.log('>>>>>>>>', err);
  }
}

export const addToWhitelist = async (account, isWhitelisted)  => {
  try {
    const manageWhitelist = promisify(SLADCoinContract.manageWhitelist);
    return await manageWhitelist(account, isWhitelisted);
  }
  catch(err) {
    console.log('>>>>>>>>', err);
  }
}
