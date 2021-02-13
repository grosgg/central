import firebase from 'firebase/app';
import {
  useAuth,
  useFirestore,
} from 'reactfire';
import { Redirect, useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();
  const firestore = useFirestore();
  const auth = useAuth();

  if (auth.currentUser) {
    return <Redirect to="/" />;
  }

  function initUserDoc(loginResult) {
    const { user } = loginResult;

    const userDocRef = firestore.collection('users').doc(user.uid);

    userDocRef.set({email: user.email}, {merge: true}).then(() => history.push("/"));
  }

  function handleLogin(event) {
    try {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(googleAuthProvider).then((result) => initUserDoc(result));
    } catch (e) {
      alert(e.message);
    }
  }


  return <section className="section">
    <div className="container">
      <h1 className="title">Central</h1>
      <p className="subtitle">Please sign in.</p>
      <button
        className="button"
        onClick={handleLogin}
      >
        Sign In with Google
      </button>
    </div>
  </section>
}

export default LoginPage;
