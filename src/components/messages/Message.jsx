/* eslint-disable object-curly-newline */
import React from 'react';
import { Badge } from 'react-bootstrap';

const Message = (props) => {
  const { message: { nickname, text, time } } = props;
  const timeForPrint = new Date(time).toLocaleTimeString();
  return (
    <div>
      <div>
        <b>{nickname}</b>
        {' '}
        <Badge variant="light">{timeForPrint}</Badge>
      </div>
      <div>
        {text}
      </div>
    </div>
  );
};

export default Message;
