const {HttpError} = require('../core/api')
const {checkSig} = require('../helpers/crypto')

const login = async (loadAccountData, ctx) => {
  const {sig, account} = ctx.request.body;
  const token = checkSig(sig, account);

  if(token) {
    const accountData = await loadAccountData(account);
    ctx.body = {token, accountData};
  }
  else {
    ctx.status = 403;
    ctx.body = HttpError(403, 'Access Denied');
  }
}

module.exports = {login}
