import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";

import config from "./config.js";

import Login from "./pages/Login";
import Space from "./pages/Space";

function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  } else {
    firebase.app();
  }
  firebase.auth().useEmulator('http://localhost:9099/');

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <IfFirebaseUnAuthed>
          {() => <Login />}
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          {() => <Space />}
        </IfFirebaseAuthed>
      </div>
    </FirebaseAuthProvider>
  );
}

export default App;
