import { takeLatest, all } from 'redux-saga/effects'
import { AuthTypes } from '../Redux/AuthRedux'
import API from '../Services'
import { getFirebase } from 'react-redux-firebase'

/* ------------- Types ------------- */

/* ------------- Sagas ------------- */
import { signup, signin } from './AuthSagas'

/* ------------- API ------------- */

const AuthApi = API.Auth.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root(context = {}) {
    yield all([
        takeLatest(AuthTypes.SIGNUP, signup, AuthApi, getFirebase),
    ])
}