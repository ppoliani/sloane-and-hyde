const {union} = require('folktale/adt/union');
const jwt = require('jsonwebtoken');

const JWT_LIFE_SPAN = process.env.JWT_LIFE_SPAN;
const JWT_SECRET = process.env.JWT_SECRET;

const JwtError = union('JwtError', {
  Expired: value => ({value}),
  Decode: value => ({value})
});

const generateToken = accountData => {
  return jwt.sign(accountData, JWT_SECRET, {expiresIn: JWT_LIFE_SPAN});
};

const decodeToken = token => new Promise((resolve, reject) => {
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if(err) {
      return err.name === 'TokenExpiredError'
        ? reject(JwtError.Expired(token))
        : reject(JwtError.Decode());
    }
    else {
      resolve(decoded);
    }

  });
});


module.exports = {JwtError, generateToken, decodeToken};

