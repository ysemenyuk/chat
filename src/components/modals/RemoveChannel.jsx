import React from 'react';
import { useFormik } from 'formik';
import { io } from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap';

const socket = io();

const RemoveChannel = (props) => {
  const { modalData, onCloseModal } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      text: modalData.name,
    },
    onSubmit: (values, { setFieldError }) => {
      socket.emit(
        'removeChannel',
        modalData,
        (response) => {
          console.log('remove response -', response);
          onCloseModal();
        },
      );

      socket.on('connect_error', (err) => {
        console.log('connect_error', err);
        setFieldError('network', 'network error');
        // setSubmitting(false);
      });
    },
  });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>

          <div className="mb-1">
            {t('sureRemove')}
          </div>

          <div className="mb-3">
            <b>{`"${modalData.name}"`}</b>
          </div>

          <div className="text-danger">
            <small>{formik.errors.network}</small>
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="mr-1" disabled={formik.isSubmitting} onClick={onCloseModal}>
              {t('cancle')}
            </Button>
            <Button variant="danger" className="mr-1" disabled={formik.isSubmitting} type="submit">
              {t('confirm')}
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

export default RemoveChannel;