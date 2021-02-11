import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
// ---- Workaround for Auth lost on refresh (dev only)
import 'firebase/firestore';
import 'firebase/auth';
// ----
import {
  FirebaseAppProvider,
  preloadAuth,
  preloadFirestore,
} from 'reactfire';
import 'bulma';

import App from './App';
import reportWebVitals from './reportWebVitals';
import config from "./config.js";

// const firebaseApp = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
const firebaseApp = firebase.initializeApp(config);
// console.log('NODE_ENV', process.env.NODE_ENV);

const preloadSDKs = firebaseApp => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup: async (factory) => {
        const firestore = factory();

        if (process.env.NODE_ENV !== 'production') {
          firestore.useEmulator('localhost', 8081);
        }

        //if (process.env.NODE_ENV === 'production') {
        //  await firestore.enablePersistence({ synchronizeTabs: true })
        //}
        return firestore;
      },
    }),
    preloadAuth({
      firebaseApp,
      setup: async (factory) => {
        const auth = factory();

        if (process.env.NODE_ENV !== 'production') {
          auth.useEmulator('http://localhost:9099');
        }
        return auth;
      },
    })
  ]);
};

preloadSDKs(firebaseApp).then(() => {
  Promise.resolve();
  ReactDOM.render(
    <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={config}>
        <App />
      </FirebaseAppProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
