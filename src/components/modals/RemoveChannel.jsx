import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import {
  Modal, Form, Button, Spinner,
} from 'react-bootstrap';

import routes from '../../routes.js';

const RemoveChannel = (props) => {
  const { modalData, onCloseModal } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      text: modalData.name,
    },
    onSubmit: (values, { setFieldError }) => {
      const url = routes.channelPath(modalData.id);
      return axios
        .delete(url)
        .then(() => {
          onCloseModal();
        })
        .catch((err) => {
          setFieldError('network', err.message);
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
