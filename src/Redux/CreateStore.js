import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import firebase from 'firebase'
import { reactReduxFirebase } from 'react-redux-firebase'

// creates the store
export default (rootReducer, rootSaga, context = {}) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Analytics Middleware ------------- */


  /* ------------- Saga Middleware ------------- */

  // const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware()
  middleware.push(sagaMiddleware)

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware))


  // Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyArX8zCLvbIN_KpMcoBuv0xQZaUnwCmVL0",
    authDomain: "ift-core.firebaseapp.com",
    databaseURL: "https://ift-core.firebaseio.com",
    projectId: "ift-core",
    storageBucket: "ift-core.appspot.com",
    messagingSenderId: "965069145987"
  }

  // react-redux-firebase config
  const rrfConfig = {
    userProfile: 'users',
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // attachAuthIsReady: true, // attaches auth is ready promise to store
    // firebaseStateName: 'firebase' // should match the reducer name ('firebase' is default)
    // profileFactory: (userData, profileData) => { // how profiles are stored in database
    //   const { user } = userData
    //   return {
    //     email: user.email
    //   }
    // }
  }

  // initialize firebase instance
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }



  // firebase.firestore()
  const messaging = firebase.messaging()
  // Add the public key generated from the console here.
  messaging.usePublicVapidKey("BGRuzj6ZUbisH8SfhAQloLacKKnKJICo7Y6LxEGuywTKy-SLtpng-LQeqIsp_0uDp6OjHlqC20_GLpWoOfLK8oA");
  messaging.requestPermission().then(function() {
    console.log('Notification permission granted.');

  }).catch(function(err) {
    console.log('Unable to get permission to notify.', err);
  });

  messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    // ...
  });

  enhancers.push(reactReduxFirebase(firebase, rrfConfig))

  const store = createStore(rootReducer, compose(...enhancers))
  let persistor = persistStore(store)

  // configure persistStore and check reducer version number

  let sagasManager = sagaMiddleware.run(rootSaga, context)

  return {
    store,
    persistor,
    sagasManager,
    sagaMiddleware
  }
}
