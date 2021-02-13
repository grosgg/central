import { useState } from 'react';
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

  auth.onAuthStateChanged((u) => {
    console.log('Auth state change', u);
    setLoading(false);
  });

  if (loading) { return(<div>Loading</div>); }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login"><LoginPage /></Route>
        <PrivateRoute path="/">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, path }) {
  const auth = useAuth();
  // console.log('private', auth.currentUser);

  return <Route exact path={path}>{auth.currentUser ? children : <Redirect to='/login' />}</Route>
}

export default App;
