import axios from 'axios';
import React, {
  useEffect, useRef, useContext,
} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserContext from '../context/UserContext.js';
import routes from '../routes.js';

const validationSchema = yup.object().shape({
  username: yup.string().required().min(3).max(20),
  password: yup.string().required().min(6),
  confirmpassword: yup.string().required()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SingupPage = () => {
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
      confirmpassword: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { data } = await axios.post(routes.signupPath(), values);

        localStorage.setItem('userInfo', JSON.stringify(data));
        user.logIn(data);

        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        console.log('err', err);

        if (err.isAxiosError && err.response.status === 409) {
          setFieldError('existUser', 'error');
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  console.log('formik.errors', formik.errors);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <h3>{t('singupPageTitle')}</h3>
          <Form onSubmit={formik.handleSubmit} className="p-3">

            <Form.Group>
              <Form.Label htmlFor="username">{t('username')}</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={formik.errors.username}
                required
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                id="password"
                autoComplete="current-password"
                isInvalid={formik.touched.password && formik.errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">{t('confirmpassword')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpassword}
                name="confirmpassword"
                id="confirmpassword"
                autoComplete="current-password"
                isInvalid={formik.touched.confirmpassword && formik.errors.confirmpassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formik.touched.confirmpassword && formik.errors.confirmpassword
                  ? formik.errors.confirmpassword
                  : null}
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
                : t('singup')}
            </Button>

          </Form>
          <div className="d-flex flex-column align-items-center">
            <span className="small mb-2">{t('haveaccaunt')}</span>
            <Link to="/login">{t('login')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingupPage;
