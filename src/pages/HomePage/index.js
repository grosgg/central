import firebase from "firebase/app";
import "firebase/auth";
import {
  useUser,
} from 'reactfire';

function HomePage() {
  const { data: user } = useUser();

  return <section className="section">
    <div className="container">
      <div>{ user && user.displayName }</div>
      <button
        className="button"
          onClick={() => firebase.auth().signOut() }
        >
          Sign Out
        </button>

    </div>
  </section>
}

export default HomePage;
