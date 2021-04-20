import React, {
  useEffect, useRef, useMemo, useContext,
} from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import {
  Modal, Button, Form, Spinner,
} from 'react-bootstrap';

import SocketContext from '../../context/SocketContext.js';
import { channelsSelectors } from '../../store/selectors.js';
import channelNameValidationSchema from './channelNameValidationSchema.js';

const AddChannel = (props) => {
  const { onCloseModal } = props;
  const { t } = useTranslation();
  const socket = useContext(SocketContext);
  const connectStatus = useSelector((state) => state.connect.status);
  const channelsNames = useSelector(channelsSelectors.selectAllNames);
  const validationSchema = useMemo(() => channelNameValidationSchema(channelsNames),
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

  // console.log('formik.errors -', formik.errors);

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
              isInvalid={!!formik.errors.text || connectStatus === 'disconnected'}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.text}
              {connectStatus === 'disconnected' && 'Network error'}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={formik.isSubmitting} onClick={onCloseModal}>
              {t('cancle')}
            </Button>
            <Button variant="primary" className="mr-1" disabled={formik.isSubmitting || connectStatus === 'disconnected'} type="submit">
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
