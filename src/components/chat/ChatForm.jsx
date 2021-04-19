import React, { useEffect, useRef, useContext } from 'react';
import { useFormik } from 'formik';
// import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, Spinner, InputGroup,
} from 'react-bootstrap';

import { socket } from '../../socket.js';
import UserContext from '../../context/UserContext.js';

const ChatForm = (props) => {
  const user = useContext(UserContext);
  const { channel } = props;
  const { t } = useTranslation();
  const inputRef = useRef();

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      socket.emit(
        'newMessage',
        {
          channelId: channel.id,
          nickname: user.info.username,
          text: values.text,
          time: new Date(),
        },
        (response) => {
          console.log('newMessage response -', response);
          setSubmitting(false);
          resetForm();
        },
      );
    },
  });

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.values.text, channel]);

  return (
    <div id="new-message-form" className="mt-3">

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputGroup className="has-validation">

            <Form.Control
              type="text"
              name="text"
              placeholder={channel && `Message #${channel?.name}`}
              ref={inputRef}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              value={formik.values.text}
              isInvalid={formik.errors.text}
            />

            <InputGroup.Append style={{ width: '15%' }}>
              <Button
                disabled={formik.isSubmitting || !formik.values.text.trim()}
                type="submit"
                className="w-100"
              >
                {formik.isSubmitting
                  ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                    />
                  )
                  : t('send')}
              </Button>
            </InputGroup.Append>

            <Form.Control.Feedback type="invalid">
              {formik.errors.text}
            </Form.Control.Feedback>

          </InputGroup>
        </Form.Group>
      </Form>

    </div>
  );
};

export default ChatForm;
