import { Fragment } from "react";
import {
  useUser,
  useFirestore,
} from 'reactfire';

import Navbar from '../../components/Navbar';
import SpacesList from './components/SpacesList';

function HomePage() {
  const { data: user } = useUser();
  const firestore = useFirestore();

  function addSpace() {
    firestore.collection('users').doc(user.uid).collection('spaces').add({
      name: 'New Space',
    })
  }

  return (
    <Fragment>
      <Navbar />
      { user &&
        <div className="container">
          <section className="section">
            <div className="columns">
              <div className="column is-half">Welcome, { user.displayName }!</div>
              <div className="column is-half has-text-right-tablet">
                <button className="button" onClick={addSpace}>New Space</button>
              </div>
            </div>
          </section>
          <SpacesList />
        </div>
      }
    </Fragment>
  );
}

export default HomePage;
