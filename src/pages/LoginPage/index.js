import firebase from "firebase/app";
import "firebase/auth";
import { useAuth } from 'reactfire';
import { useHistory } from "react-router-dom";

function LoginPage() {
  const history = useHistory();
  const auth = useAuth();

  async function handleLogin(event) {
    try {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(googleAuthProvider);
      history.push("/");
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
