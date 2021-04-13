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

import { authContext } from '../context.jsx';

// const AuthProvider = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(false);

//   const logIn = () => setLoggedIn(true);
//   const logOut = () => {
//     localStorage.removeItem('userInfo');
//     setLoggedIn(false);
//   };

//   return (
//     <authContext.Provider value={{ loggedIn, logIn, logOut }}>
//       {children}
//     </authContext.Provider>
//   );
// };

const PrivateRoute = ({ children, path }) => {
  const auth = useContext(authContext);
  console.log('PrivateRoute auth -', auth);

  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
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
  const auth = useContext(authContext);
  console.log('AuthButton auth -', auth);
  return auth.loggedIn
    ? (
      <Button onClick={auth.logOut}>Log out</Button>
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
