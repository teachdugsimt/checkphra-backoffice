import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

import { firebaseReducer } from 'react-redux-firebase'
// import { firestoreReducer } from 'redux-firestore'
// import firebase from 'firebase'
import ReduxPersist from '../Config/ReduxPersist'


/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  firebase: firebaseReducer,
  auth: require('./AuthRedux').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  let { store, persistor, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga, {
    // routerHistory: this.props.history
  })

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return { store, persistor }
}
