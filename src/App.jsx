import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

import UserContext from './context/UserContext.js';

const PrivateRoute = ({ children, path }) => {
  const user = useContext(UserContext);
  return (
    <Route
      path={path}
      render={({ location }) => (user.isLogin()
        ? (
          children
        )
        : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        ))}
    />
  );
};

const App = () => {
  console.log('app');
  return (
    <div className="d-flex flex-column h-100">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <PrivateRoute path="/">
            <ChatPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
