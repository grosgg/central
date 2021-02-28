import {
  useUser,
  useFirestore,
  useFirestoreCollectionData,
} from 'reactfire';

import { Link } from "react-router-dom";

function SpacesList() {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const spacesCollectionRef = firestore.collection('users').doc(user.uid).collection('spaces');
  let { data } = useFirestoreCollectionData(spacesCollectionRef, {idField: 'id'});

  // console.log('spacesCollection', data);

  if (!data || data.length === 0) {
    return <div>Please create a space.</div>
  }

  return (
    <div>
      { data.map((space) => (
        <div className='box' key={space.id}>
          <Link to={`/space/${space.id}`}>
            { space.name }
          </Link>
        </div>
      ))}
    </div>
  );
}

export default SpacesList;
