import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Channels from '../components/channels/Channels.jsx';
import Messages from '../components/messages/Messages.jsx';
import NewMessageForm from '../components/messages/NewMessageForm.jsx';
import Modal from '../components/modals/index.jsx';

import { fetchUserData } from '../store/thunksSlice.js';

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData())
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <Row className="row flex-grow-1 h-75 pb-3">
      <Col xs={3} className="border-right">
        <Channels />
      </Col>
      <Col className="d-flex flex-column h-100">
        <Messages />
        <NewMessageForm />
      </Col>
      <Modal />
    </Row>
  );
};

export default ChatPage;
