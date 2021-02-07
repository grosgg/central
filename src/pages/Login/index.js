import firebase from "firebase/app";
import "firebase/auth";

function Login() {
  return <section className="section">
    <div className="container">
      <h1 className="title">Central</h1>
      <p className="subtitle">Please sign in.</p>
      <button
        className="button"
        onClick={() => {
          const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(googleAuthProvider);
        }}
      >
        Sign In with Google
      </button>
    </div>
  </section>
}

export default Login;
