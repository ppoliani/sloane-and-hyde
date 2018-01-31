const SLHToken = artifacts.require('./SLHToken.sol');

module.exports = (deployer) => {
  deployer.deploy(SLHToken, 1000000, 'SLH', 'SLH', 18); 
};
