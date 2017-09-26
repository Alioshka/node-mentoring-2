import { promisify } from 'util';

let _promisify;

promisify ? _promisify = promisifyFn :  _promisify = promisifyFn;

function promisifyFn(fn) {
    return function promisified(...params) {
        return new Promise((resolve, reject) => fn(...params.concat([(err, ...args) => err ? reject(err) : resolve( args.length < 2 ? args[0] : args )])))
    }
}

export { _promisify };