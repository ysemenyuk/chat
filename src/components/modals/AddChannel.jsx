import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
// import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';

import { socket } from '../../socket.js';
import { channelsSelectors } from '../../store/selectors.js';
import channelValidationSchema from './channelValidationSchema.js';

// const socket = io();

const AddChannel = (props) => {
  const { onCloseModal } = props;
  const { t } = useTranslation();
  const connectStatus = useSelector((state) => state.connect.status);
  const channelsNames = useSelector(channelsSelectors.selectAllNames);
  const validationSchema = useMemo(() => channelValidationSchema(channelsNames),
    [channelsNames]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef?.current.focus();
  });

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      socket.volatile.emit(
        'newChannel',
        { name: values.text },
        (response) => {
          console.log('newChannel response -', response);
          onCloseModal();
        },
      );
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('addChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>

          <Form.Group>
            <Form.Label>{t('channelName')}</Form.Label>
            <Form.Control
              name="text"
              type="text"
              ref={inputRef}
              onChange={formik.handleChange}
              disabled={formik.isSubmitting}
              value={formik.values.text}
              isInvalid={!!formik.errors.text || connectStatus === 'disconnect'}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.text && t(formik.errors.text.key)}
              {connectStatus === 'disconnect' && 'Network error'}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={formik.isSubmitting || connectStatus === 'disconnect'} onClick={onCloseModal}>
              {t('cancle')}
            </Button>
            <Button variant="primary" className="mr-1" disabled={formik.isSubmitting} type="submit">
              {t('submit')}
              {' '}
              <Spinner
                style={{ display: formik.isSubmitting ? 'inline-block' : 'none' }}
                as="span"
                animation="border"
                size="sm"
              />
            </Button>
          </div>

        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;
