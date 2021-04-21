import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Message from './Message.jsx';

import { messagesSelectors } from './messagesSlice.js';
import { channelsSelectors } from '../channels/channelsSlice.js';

import useThunkStatus from '../../hooks/useThunkStatus.js';
import { fetchUserData } from '../../store/thunksSlice.js';

const Messages = () => {
  const { t } = useTranslation();

  const messages = useSelector(messagesSelectors.selectByCurrentChannel);
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);

  const userData = useThunkStatus(fetchUserData);

  const messagesContainer = useRef();

  useEffect(() => {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <div className="border-bottom pb-2 d-flex">
        <h5>
          {t('chat')}
          {' '}
          <Badge variant="info">{userData.isSuccess && `#${currentChannel?.name}`}</Badge>
        </h5>
      </div>
      <div ref={messagesContainer} className="overflow-auto mt-auto">
        {userData.isSuccess
          ? messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
          : <p>Loading...</p>}
      </div>
    </>
  );
};

export default Messages;
