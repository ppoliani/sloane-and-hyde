const {HttpError} = require('../core/api')
const {checkSig} = require('../helpers/crypto')

const login = async (loadAccountData, ctx) => {
  try {
    const {sig, account} = ctx.request.body;
    const token = checkSig(sig, account);

    if(!token) throw new Error('No Token');
    const accountData = await loadAccountData(account);
    if(!accountData) throw new Error('No account data found');

    ctx.body = {token, accountData};
  }
  catch(err) {
    ctx.status = 403;
    ctx.body = HttpError(403, 'Access Denied');
  }
}

module.exports = {login}
