const {partial} = require('../helpers/fn')
const {manageWhitelist} = require('./accountApi')

const routes = {
  '/accounts/whitelist': {
    method: 'post',
    fn: partial(manageWhitelist)
  }
};

module.exports = routes;
