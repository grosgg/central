import { Fragment, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  useAuth,
} from 'reactfire';

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  auth.onAuthStateChanged((u) => {
    setUser(u);
    setLoading(false);
  });

  if (loading) { return(<div>Loading</div>); }

  return (
    <Fragment>
      <Router authed={!!user} />
    </Fragment>
  );
}

function Router({ authed }) {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login"><LoginPage /></Route>
        <PrivateRoute path="/" authed={authed}>
          <HomePage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, path, authed }) {
  return <Route exact path={path}>{authed ? children : <Redirect to='/login' />}</Route>
}

export default App;
