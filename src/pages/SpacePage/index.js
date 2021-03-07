import { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  useUser,
  useFirestore,
  useFirestoreDocData,
  useFirestoreCollectionData,
} from 'reactfire';

import Navbar from '../../components/Navbar';
import ModuleSlot from './components/ModuleSlot';

function SpacePage() {
  const { id } = useParams();
  const { data: user } = useUser();
  const firestore = useFirestore();

  const spaceDocRef = firestore.collection('users').doc(user.uid).collection('spaces').doc(id);
  const spaceData = useFirestoreDocData(spaceDocRef, {idField: 'id'}).data;

  const modulesCollectionsRef = spaceDocRef.collection('modules');
  const modulesData = useFirestoreCollectionData(modulesCollectionsRef, {idField: 'id'}).data;

  console.log('space', spaceData);
  console.log('modules', modulesData);

  function getModule(index) {
    return(modulesData.find(module => module.position === index));
  }

  function setModule(id, settings) {
    modulesCollectionsRef.doc(id).set(
      { settings: settings }, { merge: true }
    );

  }

  if (!user || !spaceData || !modulesData) { return <Fragment><Navbar /></Fragment> }

  const grid = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <Fragment>
      <Navbar />
        <section className="section">
          <div className="columns is-multiline">
          { grid.map((a) => (
            <div className="column is-one-quarter" key={a}>
              <ModuleSlot module={getModule(a)} setModule={setModule} />
            </div>
          ))}
          </div>
        </section>
    </Fragment>
  );
}

export default SpacePage;
