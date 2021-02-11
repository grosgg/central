import { Fragment } from "react";
import {
  useUser,
  useFirestore,
  useFirestoreDocData,
} from 'reactfire';

function SpacesList() {
  const { data: user } = useUser();

  // const firestore = useFirestore();
  // const userDetailsRef = firestore
  // .collection('users')
  // .doc(user.uid);

  // console.log(userDetailsRef);

  // let data = useFirestoreDocData(
  //   userDetailsRef
  // );

  // console.log(data);

  return (<div>Spaces List</div>);
}

export default SpacesList;
