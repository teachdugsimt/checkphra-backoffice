import { call, put, select } from 'redux-saga/effects'
import AuthActions from '../Redux/AuthRedux'

export function* signup(api, getFirebase, { email, password }) {

  const data = {
    email,
    password
  }

  const response = yield call(api.signup, data)
  console.log(response)

  if (response.ok) {
    yield * signupAtFirebase(getFirebase, email, response.data.access_token)
  } else {
    let message = JSON.parse(response.data.message)
    yield put(AuthActions.signupFailure(message))
  }
}

function * signupAtFirebase(getFirebase, email, accessToken) {

  yield getFirebase().createUser({
    email: email,
    password: accessToken
  }).then(() => {
    console.log('sinup with firebase success')
  }).catch((error) => {
    console.log('sinup with firebase error')
    console.log(error.message)
  })

}

export function* signin(api, { email, password }) {

  const data = {
    
  }

  // const response = yield call(api.cal, data)
  // console.log(response)

  // if (response.ok) {
    // yield put(AuthActions.setDisplay(response.data))
  // } else {
    // alert('พัง')
  // }
}