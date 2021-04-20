import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col, Badge } from 'react-bootstrap';

import ChannelsList from '../components/channels/ChannelsList.jsx';
import MessagesList from '../components/messages/MessagesList.jsx';
import NewMessageForm from '../components/NewMessageForm.jsx';
import Modal from '../components/modal/index.jsx';

import { messagesSelectors } from '../components/messages/messagesSlice.js';
import { channelsSelectors } from '../components/channels/channelsSlice.js';

import { modalActions } from '../components/modal/modalSlice.js';

import { fetchUserData } from '../store/thunksSlice.js';
import useThunkStatus from '../hooks/useThunkStatus.js';

const ChatPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const messagesContainer = useRef();

  const userData = useThunkStatus(fetchUserData);

  const channels = useSelector(channelsSelectors.selectAll);
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const messages = useSelector(messagesSelectors.selectByCurrentChannel);

  useEffect(() => {
    dispatch(fetchUserData())
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [messages]);

  const handleAddChannel = () => {
    dispatch(modalActions.openModal({ modalType: 'adding' }));
  };

  return (
    <Row className="row flex-grow-1 h-75 pb-3">

      <Col xs={3} className="border-right">

        <div className="border-bottom pb-2 mb-3 d-flex">
          <h5>{t('channels')}</h5>
          <button
            onClick={handleAddChannel}
            type="button"
            className="ml-auto p-0 mb-2 btn btn-link"
          >
            {t('addChannel')}
          </button>
        </div>

        <ul className="nav flex-column nav-pills nav-fill">
          {userData.isSuccess
            ? <ChannelsList channels={channels} currentChannel={currentChannel} />
            : <p>Loading...</p>}
        </ul>

      </Col>

      <Col className="d-flex flex-column h-100">

        <div className="border-bottom pb-2 d-flex">
          <h5>
            {t('chat')}
            {' '}
            <Badge variant="info">{userData.isSuccess && `#${currentChannel?.name}`}</Badge>
          </h5>
        </div>

        <div ref={messagesContainer} className="overflow-auto mt-auto">
          {userData.isSuccess
            ? <MessagesList messages={messages} />
            : <p>Loading...</p>}
        </div>

        <NewMessageForm currentChannel={currentChannel} />

      </Col>

      <Modal />

    </Row>
  );
};

export default ChatPage;
