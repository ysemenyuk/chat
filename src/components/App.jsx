import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';

import LoginPage from '../pages/LoginPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';

import { UserContext } from '../context.jsx';

const PrivateRoute = ({ children, path }) => {
  const user = useContext(UserContext);
  // console.log('PrivateRoute user -', user);
  return (
    <Route
      path={path}
      render={({ location }) => (user.info
        ? (
          children
        )
        : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ))}
    />
  );
};

const AuthButton = () => {
  const user = useContext(UserContext);
  // console.log('AuthButton user -', user);
  return user.info
    ? (
      <Button onClick={user.logOut}>Log out</Button>
    )
    : (
      <Button as={Link} to="/login">
        Log in
      </Button>
    );
};

const App = () => {
  console.log('app');
  return (
    <Router>

      <Navbar bg="light" expand="lg" className="mb-3">
        <Navbar.Brand as={Link} to="/" className="mr-auto navbar-brand">
          Hexlet Chat
        </Navbar.Brand>
        <AuthButton />
      </Navbar>

      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/">
          <ChatPage />
        </PrivateRoute>
      </Switch>

    </Router>
  );
};

export default App;
