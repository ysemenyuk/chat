import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';

import ChatForm from './ChatForm.jsx';
import ChatItem from './ChatItem.jsx';

import { channelsSelectors, messagesSelectors } from '../store/selectors.js';

const Chat = () => {
  const messages = useSelector(messagesSelectors.selectByCurrentChannel);
  const channel = useSelector(channelsSelectors.selectCurrentChannel);
  const messagesContainer = useRef();

  useEffect(() => {
    messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
  }, [messages]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="border-bottom pb-2 d-flex">
        <h5>
          Chat
          <span>  </span>
          <Badge variant="info">{`#${channel.name}`}</Badge>
        </h5>
      </div>
      <div ref={messagesContainer} className="overflow-auto mt-auto">
        {messages.map((message) => (
          <ChatItem key={message.id} message={message} />
        ))}
      </div>
      <ChatForm channel={channel} />
    </div>
  );
};

export default Chat;
