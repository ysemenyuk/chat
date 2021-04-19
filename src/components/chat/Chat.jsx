import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import ChatForm from './ChatForm.jsx';
import ChatItem from './ChatItem.jsx';

import { channelsSelectors, messagesSelectors } from '../../store/selectors.js';

const Chat = () => {
  const { t } = useTranslation();
  const messages = useSelector(messagesSelectors.selectByCurrentChannel);
  const currentChannel = useSelector(channelsSelectors.selectCurrentChannel);
  const fetchStatus = useSelector((state) => state.channels.fetchStatus);
  const messagesContainer = useRef();

  useEffect(() => {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="border-bottom pb-2 d-flex">
        <h5>
          {t('chat')}
          {' '}
          <Badge variant="info">{fetchStatus === 'idle' && `#${currentChannel?.name}`}</Badge>
        </h5>
      </div>
      <div ref={messagesContainer} className="overflow-auto mt-auto">
        {fetchStatus === 'idle'
          ? messages.map((message) => (
            <ChatItem key={message.id} message={message} />
          ))
          : <p>Loading...</p>}
      </div>
      <ChatForm currentChannel={currentChannel} />
    </div>
  );
};

export default Chat;
