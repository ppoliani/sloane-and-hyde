// composition hack
Function.prototype['∘'] = function(f){
  return x => this(f(x))
}

const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));
const prop = key => obj => obj[key];
const noop = () => {}

module.exports = {partial, prop, noop}
