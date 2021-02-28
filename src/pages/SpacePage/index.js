import { Fragment } from "react";
import { useParams } from "react-router-dom";

import Navbar from '../../components/Navbar';

function SpacePage() {
  const { id } = useParams();

  return (
    <Fragment>
      <Navbar />
      <div>Space {id}</div>
    </Fragment>
  );
}

export default SpacePage;
