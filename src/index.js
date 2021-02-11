import React from 'react';
import ReactDOM from 'react-dom';
import firebase from "firebase/app";
import { FirebaseAppProvider } from 'reactfire';
import 'bulma';

import App from './App';
import reportWebVitals from './reportWebVitals';
import config from "./config.js";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}
firebase.auth().useEmulator('http://localhost:9099/');

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={config}>
      <App />
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
