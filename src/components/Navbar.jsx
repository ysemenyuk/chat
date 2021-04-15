/* eslint-disable object-curly-newline */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

import UserContext from '../context/UserContext.js';

const AuthButton = ({ user }) => (user.isLogin()
  ? <Button onClick={user.logOut}>Log out</Button>
  : <Button as={Link} to="/login">Log in</Button>
);

const Navbarr = () => {
  const user = useContext(UserContext);

  return (
    <Navbar bg="light" expand="lg" className="mb-3">

      <Navbar.Brand as={Link} to="/" className="mr-auto navbar-brand">
        Hexlet Chat
      </Navbar.Brand>

      <Nav defaultActiveKey="#Eng" className="mr-3">
        <Nav.Link href="#Eng">Eng</Nav.Link>
        <Nav.Link href="#Ru">Ru</Nav.Link>
      </Nav>

      <AuthButton user={user} />

    </Navbar>
  );
};

export default Navbarr;
