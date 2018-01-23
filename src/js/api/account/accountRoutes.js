const {partial} = require('../../common/fn')
const {updateWhitelist} = require('./accountApi')

const routes = {
  '/accounts/whitelist': {
    method: 'post',
    fn: partial(updateWhitelist)
  }
}; 

module.exports = routes;
