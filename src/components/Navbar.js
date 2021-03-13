import { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from 'reactfire';

import NewModuleModal from './NewModuleModal';

function Navbar({ spaceId, newPosition }) {
  const auth = useAuth();
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [modal, setModal] = useState();

  function handleLogout() {
    try {
      auth.signOut().then(() => {
        history.push("/login");
      });
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <Fragment>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand has-text-weight-semi-bold is-size-4">
          <Link className="navbar-item" to="/">Central</Link>

          <a className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="central-navbar" onClick={() => setExpanded(!expanded)} >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="central-navbar" className={`navbar-menu ${expanded ? 'is-active' : ''} `}>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                { spaceId && newPosition &&
                  <button className="button" onClick={() => setModal(spaceId)}>New Module</button>
                }
                <button className="button is-text" onClick={handleLogout}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      { modal &&
        <NewModuleModal
          spaceId={spaceId}
          newPosition={newPosition}
          onClose={() => setModal(null)}
        />
      }
    </Fragment>
  );
}

export default Navbar;
