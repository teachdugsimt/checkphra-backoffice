import apisauce from 'apisauce'

let b
if (process.env.NODE_ENV === 'production') {
  b = 'http://test.infiltech.org/core-profile/web/index.php/v1/'
} else {
  b = 'http://test.infiltech.org/core-profile/web/index.php/v1/'
}

const create = (baseURL = b) => {

  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache',
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  })

  const signup = (data) => api.post('user/signup', data)

  return {
    signup
  }
}

// let's return back our create method as the default.
export default {
  create
}
