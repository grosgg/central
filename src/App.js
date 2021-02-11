import { Fragment, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged((u) => {
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
