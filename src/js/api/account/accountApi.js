const {manageWhitelist} = require('../repositories/accounts')

const updateWhitelist = async (ctx) => {
  const {account, isWhitelisted, name, iban, email} = ctx.request.body;

  try {
    await manageWhitelist(account, isWhitelisted, name, iban, email);
    ctx.status = 204;
  }
  catch(err) {
    ctx.status = 500;
    ctx.body = HttpError(500, 'Error');
  }
}
 
module.exports = {updateWhitelist}
