// composition hack
Function.prototype['∘'] = function(f){
  return x => this(f(x))
}

export const prop = key => obj => obj[key];
export const partial = (fn, ...args) => (...restArgs) => fn.apply(this, args.concat(restArgs));
export const noop = () => {}
