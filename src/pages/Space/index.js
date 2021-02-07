import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthConsumer,
} from "@react-firebase/auth";

function Space() {
  return <section className="section">
    <div className="container">
      <FirebaseAuthConsumer>
        {({ isSignedIn, user, providerId }) => {
          return (
            <pre>
              {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
            </pre>
          );
        }}
      </FirebaseAuthConsumer>

      <button
        className="button"
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>

    </div>
  </section>
}

export default Space;
