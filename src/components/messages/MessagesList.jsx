import React from 'react';

import Message from './Message.jsx';

const MessagesList = (props) => {
  const { messages } = props;

  return (
    messages.map((message) => (
      <Message key={message.id} message={message} />
    ))
  );
};

export default MessagesList;
