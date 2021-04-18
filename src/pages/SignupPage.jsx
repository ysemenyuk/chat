import axios from 'axios';
import React, {
  useEffect, useRef, useContext,
} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import UserContext from '../context/UserContext.js';
import routes from '../routes.js';

// const validationSchema = Yup.object({
//   username: Yup.string().required().min(3).max(20),
//   password: Yup.string().required().min(6),
//   confirmPassword: Yup.string().required()
//     .oneOf([Yup.ref('password')], 'Passwords must match'),
// });

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
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required().min(3).max(20),
      password: Yup.string().required().min(6, t('toShort', { min: 6 })),
      confirmPassword: Yup.string().required()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
    validateOnChange: false,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const { data } = await axios.post(routes.signupPath(), values);

        localStorage.setItem('userInfo', JSON.stringify(data));
        user.logIn(data);

        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
      } catch (err) {
        // console.log('catch err -', err);

        if (err.isAxiosError && err.response.status === 409) {
          setFieldError('username', 'User already exists');
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  console.log('formik.errors -', formik.errors);

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
                value={formik.values.username}
                name="username"
                id="username"
                autoComplete="username"
                isInvalid={formik.errors.username}
                required
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid">
                {t(formik.errors.username?.key, {
                  min: formik.errors.username?.values?.min,
                  max: formik.errors.username?.values?.max,
                })}
                {formik.errors.username}
              </Form.Control.Feedback>
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
                isInvalid={formik.errors.password}
                required
              />
              <Form.Control.Feedback type="invalid">
                {t(formik.errors.password)}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="password">{t('confirmPassword')}</Form.Label>
              <Form.Control
                type="password"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="current-password"
                isInvalid={formik.errors.confirmPassword}
                required
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
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
