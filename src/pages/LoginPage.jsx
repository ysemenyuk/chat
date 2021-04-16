import axios from 'axios';
import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserContext from '../context/UserContext.js';
import routes from '../routes.js';

const LoginPage = () => {
  const { t } = useTranslation();
  const user = useContext(UserContext);
  const inputRef = useRef();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { data } = await axios.post(routes.loginPath(), values);

        localStorage.setItem('userInfo', JSON.stringify(data));
        user.logIn(data);

        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setFieldError('auth', 'error');
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <h3>{t('loginPageTitle')}</h3>
          <Form onSubmit={formik.handleSubmit} className="p-3">

            <Form.Group>
              <Form.Label htmlFor="username">{t('username')}</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={formik.errors.auth}
                required
                ref={inputRef}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={formik.errors.auth}
                required
              />

              <Form.Control.Feedback type="invalid">
                {t('loginPageError')}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3"
            >
              {formik.isSubmitting
                ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                  />
                )
                : t('login')}
            </Button>

          </Form>
          <div className="d-flex flex-column align-items-center">
            <span className="small mb-2">{t('newuser')}</span>
            <Link to="/signup">{t('singup')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
