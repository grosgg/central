import { Fragment } from "react";
import {
  useUser,
} from 'reactfire';

import Navbar from './components/Navbar';
import SpacesList from './components/SpacesList';

function HomePage() {
  console.log('On est la');
  const { data: user } = useUser();

  return (
    <Fragment>
      <Navbar />
      { user &&
        <div className="container">
          <section className="section">
            <div>{ user.displayName }</div>
          </section>
          <section className="section">
            <SpacesList />
          </section>
        </div>
      }
    </Fragment>
  );
}

export default HomePage;
