const {login} = require('./authApi')
const {partial} = require('../helpers/fn')

const routes = {
  '/auth/login': {
    method: 'post',
    fn: partial(login)
  }
};

module.exports = routes;
