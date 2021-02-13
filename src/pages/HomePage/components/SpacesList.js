import {
  useUser,
  useFirestore,
  useFirestoreDocData,
} from 'reactfire';

function SpacesList() {
  const { data: user } = useUser();
  const firestore = useFirestore();

  const userDocRef = firestore.collection('users').doc(user.uid);
  let { data } = useFirestoreDocData(userDocRef);

  console.log(data);

  if (!data.spaces || data.spaces.length === 0) {
    return <div>Please create a space.</div>
  }
  return (<div>Spaces List</div>);
}

export default SpacesList;
