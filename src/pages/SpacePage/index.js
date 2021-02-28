import { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  useUser,
  useFirestore,
  useFirestoreDocData,
} from 'reactfire';

import Navbar from '../../components/Navbar';

function SpacePage() {
  const { id } = useParams();
  const { data: user } = useUser();
  const firestore = useFirestore();

  const spaceDocRef = firestore.collection('users').doc(user.uid).collection('spaces').doc(id);
  const { data } = useFirestoreDocData(spaceDocRef);

  console.log('space', data);

  return (
    <Fragment>
      <Navbar />
      { user && data &&
        <section className="section">
          <p className="title">{data.name}</p>
        </section>
      }
    </Fragment>
  );
}

export default SpacePage;
