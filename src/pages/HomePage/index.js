import { Fragment } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  useUser,
} from 'reactfire';

import Navbar from './components/Navbar';

function HomePage() {
  const { data: user } = useUser();

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <section className="section">
          <div>{ user && user.displayName }</div>
        </section>
      </div>
    </Fragment>
  );
}

export default HomePage;
