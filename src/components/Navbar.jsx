import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Navbar, NavDropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import UserContext from '../context/UserContext.js';

const AuthButton = ({ user }) => {
  const { t } = useTranslation();
  return (user.isLogin()
    ? <Button onClick={user.logOut}>{t('logout')}</Button>
    : <Button as={Link} to="/login">{t('login')}</Button>
  );
};

const Navbarr = () => {
  const user = useContext(UserContext);
  const { t, i18n } = useTranslation();

  const selectRu = () => {
    i18n.changeLanguage('ru');
  };

  const selectEng = () => {
    i18n.changeLanguage('en');
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">

      <Navbar.Brand as={Link} to="/" className="mr-auto navbar-brand">
        Hexlet Chat
      </Navbar.Brand>

      <NavDropdown title={t('name')} id="basic-nav-dropdown">
        <NavDropdown.Item onClick={selectEng}>Eng</NavDropdown.Item>
        <NavDropdown.Item onClick={selectRu}>Ru</NavDropdown.Item>
      </NavDropdown>

      <AuthButton user={user} />

    </Navbar>
  );
};

export default Navbarr;
