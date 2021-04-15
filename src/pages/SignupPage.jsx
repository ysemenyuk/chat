import axios from 'axios';
// eslint-disable-next-line object-curly-newline
import React, { useEffect, useRef, useState, useContext } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';

import UserContext from '../context/UserContext.js';
import routes from '../routes.js';

const LoginPage = () => {
  const user = useContext(UserContext);
  const [authFailed, setAuthFailed] = useState(false);
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
      confirmpassword: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const { data } = await axios.post(routes.signupPath(), values);

        localStorage.setItem('userInfo', JSON.stringify(data));
        user.logIn(data);

        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
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
          <h3>Signup</h3>
          <Form onSubmit={formik.handleSubmit} className="p-3">

            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="username"
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={authFailed}
                required
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid">
                the username or password is incorrect
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="password"
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={authFailed}
                required
              />
              <Form.Control.Feedback type="invalid">
                the username or password is incorrect
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">Confirm password</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmpassword}
                placeholder="confirm password"
                name="confirmpassword"
                id="confirmpassword"
                autoComplete="current-password"
                isInvalid={authFailed}
                required
              />
              <Form.Control.Feedback type="invalid">
                the username or password is incorrect
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              type="submit"
              variant="outline-primary"
              className="w-100 mb-3"
            >
              Submit
            </Button>

          </Form>
          <div className="d-flex flex-column align-items-center">
            <span className="small mb-2">Уже есть аккаунт?</span>
            <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
