const {login} = require('./authApi')
const {partial} = require('../helpers/fn')
const {loadAccountData} = require('../repositories/accounts')

const routes = {
  '/auth/login': {
    method: 'post',
    fn: partial(login, loadAccountData)
  }
};

module.exports = routes;
