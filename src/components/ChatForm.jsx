import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, Spinner, InputGroup,
} from 'react-bootstrap';

import { UserContext } from '../context.jsx';
import routes from '../routes.js';

const ChatForm = (props) => {
  const { nickname } = useContext(UserContext);
  const { channel } = props;
  const { t } = useTranslation();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values, { setSubmitting, resetForm, setFieldError }) => {
      const url = routes.channelMessagesPath(channel.id);
      axios.post(url, {
        data: {
          attributes: { nickname, text: values.text, time: new Date() },
        },
      })
        .then(() => {
          setSubmitting(false);
          resetForm();
        })
        .catch((err) => {
          setSubmitting(false);
          setFieldError('network', err.message);
        });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.values.text, channel]);

  return (
    <div id="new-message-form" className="mt-3">

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputGroup>

            <Form.Control
              type="text"
              name="text"
              placeholder={`Message #${channel.name}`}
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.text}
              isInvalid={formik.errors.text || formik.errors.network}
            />

            <InputGroup.Append>
              <Button
                disabled={formik.isSubmitting || !formik.values.text.trim()}
                type="submit"
              >
                {t('send')}
                <span> </span>
                <Spinner
                  style={{ display: formik.isSubmitting ? 'inline-block' : 'none' }}
                  as="span"
                  animation="border"
                  size="sm"
                />
              </Button>
            </InputGroup.Append>

            <Form.Control.Feedback type="invalid">
              {formik.errors.text}
              {formik.errors.network}
            </Form.Control.Feedback>

          </InputGroup>
        </Form.Group>
      </Form>

    </div>
  );
};

export default ChatForm;
