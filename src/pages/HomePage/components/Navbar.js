import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useAuth,
} from 'reactfire';

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const auth = useAuth();

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
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
              <button className="button">New Space</button>
              <button className="button is-text" onClick={() => auth.signOut() }>Sign Out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
