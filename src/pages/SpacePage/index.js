import { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  useUser,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';

import Navbar from '../../components/Navbar';
import ModuleSlot from './components/ModuleSlot';

function SpacePage() {
  const { id } = useParams();
  const { data: user } = useUser();
  const firestore = useFirestore();

  // Get module collection from DB
  const modulesCollectionsRef = firestore.collection('users').doc(user.uid)
    .collection('spaces').doc(id).collection('modules');
  const modules = useFirestoreCollectionData(modulesCollectionsRef, {idField: 'id'}).data;

  console.log('modules', modules);

  if (!user || !id || !modules) { return <Fragment><Navbar /></Fragment> }

  const grid = [];
  let newPosition = null;

  for (let index = 0; index < 12; index++) {
    const module = modules.find(module => module.position === index);
    grid.push(module ? <ModuleSlot module={module} spaceId={id} /> : null);
    if(!module) { newPosition = index }
  }

  // console.log(grid.map(slot => slot ? slot.props.module.text : null));
  // console.log(newPosition);

  return (
    <Fragment>
      <Navbar spaceId={id} newPosition={newPosition} />
      <section className="section">
        <div className="columns is-multiline">
        { grid.map((module, i) => (
          <div className="column is-one-quarter" key={i}>
            { module }
          </div>
        ))}
        </div>
      </section>
    </Fragment>
  );
}

export default SpacePage;
