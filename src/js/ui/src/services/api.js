import 'whatwg-fetch'
import {List} from 'immutable'
import {task} from 'folktale/concurrency/task'

export const constructUrl = (url, params) =>
  `
  ${url}?${
    params
      .reduce(
        (acc, v, k) => acc.push(`${k}=${v}`),
        List()
      )
      .join('&')
  }
  `


const getAuthHeader = (auth, bearerToken) => auth
  ? {
      'content-type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`
    }
: {}

export default (url, method='GET', body={}, auth=true, headers={}) => new Promise(async (resolve, reject) => {
  try {
    const options = {
      method,
      headers: Object.assign(
        {},
        getAuthHeader(auth, ''),
        headers
      )
    };

    // dissalow body inclusion for methods that don't support it
    if(method !== 'GET' && method !== 'DELETE') {
      options['body'] = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    if(response.status === 401) window.location.href = '/login';
    if(response.status >= 400) throw new Error(response.status);
    // including the deleted resource is usefull for any further actions
    if(method === 'DELETE' && response.status === 204) return resolve({result: body});

    const json = await response.json()
    resolve(json);
  }
  catch(error) {
    console.log('>>>>>', error)
    reject(error);
  }
});
   