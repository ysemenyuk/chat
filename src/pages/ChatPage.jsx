import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import Channels from '../components/channels/Channels.jsx';
import Chat from '../components/chat/Chat.jsx';
import Modal from '../components/modals/Modal.jsx';

import { fetchUserData } from '../store/slices.js';

const ChatPage = () => {
  console.log('Chat Page');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <Row className="row flex-grow-1 h-75 pb-3">
      <Col xs={3} className="border-right">
        <Channels />
      </Col>
      <Col className="h-100">
        <Chat />
      </Col>
      <Modal />
    </Row>
  );
};

export default ChatPage;
