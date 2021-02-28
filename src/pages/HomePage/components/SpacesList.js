import { useState } from 'react';
import {
  useUser,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';
import { Link } from "react-router-dom";

import SpaceModal from './SpaceModal';

function SpacesList() {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const [modalSpace, setModalSpace] = useState();

  const spacesCollectionRef = firestore.collection('users').doc(user.uid).collection('spaces');
  let { data } = useFirestoreCollectionData(spacesCollectionRef, {idField: 'id'});

  if (!data || data.length === 0) {
    return (
      <section className="hero">
        <div className="hero-body">
          <p className="title">First, create a space.</p>
          <p className="subtitle">You will then be able to add modules in your space.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="columns is-multiline">
        { data.map((space) => (
          <div className="column is-one-quarter" key={space.id}>
            <div className="box">
              <p className="title">{ space.name }</p>
              <div className="columns is-mobile">
                <div className="column">
                  <Link to={`/space/${space.id}`} className="button is-small">View</Link>
                </div>
                <div className="column has-text-right">
                  <button className="button is-small" onClick={() => setModalSpace(space)}>Set</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SpaceModal
        space={modalSpace}
        onClose={() => setModalSpace(null)}
      />
    </section>
  );
}

export default SpacesList;
