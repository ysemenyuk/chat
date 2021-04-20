import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {
  Button, Form, Spinner, InputGroup,
} from 'react-bootstrap';

import useSocket from '../hooks/useSocket.js';
import useAuth from '../hooks/useAuth.js';
import useThunkStatus from '../hooks/useThunkStatus.js';
import { fetchUserData } from '../store/thunksSlice.js';

const NewMessageForm = (props) => {
  const { currentChannel } = props;
  const { t } = useTranslation();
  const user = useAuth();
  const socket = useSocket();
  const inputRef = useRef();
  const userData = useThunkStatus(fetchUserData);

  const connectStatus = useSelector((state) => state.connect.status);

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    onSubmit: (values, { setSubmitting, resetForm }) => {
      socket.volatile.emit(
        'newMessage',
        {
          channelId: currentChannel.id,
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
  }, [formik.values.text, currentChannel]);

  return (
    <div id="new-message-form" className="mt-3">

      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <InputGroup className="has-validation">

            <Form.Control
              type="text"
              name="text"
              placeholder={`Message ${userData.isSuccess ? `#${currentChannel?.name}` : ''}`}
              ref={inputRef}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              value={formik.values.text}
              isInvalid={formik.errors.text || connectStatus === 'disconnected'}
            />

            <InputGroup.Append style={{ width: '15%' }}>
              <Button
                disabled={formik.isSubmitting || !formik.values.text.trim() || connectStatus === 'disconnected'}
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
              {connectStatus === 'disconnected' && 'Network error'}
            </Form.Control.Feedback>

          </InputGroup>
        </Form.Group>
      </Form>

    </div>
  );
};

export default NewMessageForm;
