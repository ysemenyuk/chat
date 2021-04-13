import axios from 'axios';
import React, { useEffect } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    return { Authorization: `Bearer ${userInfo.token}` };
  }
  return {};
};

const ChatPage = () => {
  console.log('Chat Page');

  useEffect(() => {
    const url = routes.usersPath();
    axios.get(url, {
      headers: getAuthHeader(),
    })
      .then((res) => {
        console.log('res.data -', res.data);
      });
  }, []);

  return <p>Chat Page</p>;
  // END
};

export default ChatPage;
