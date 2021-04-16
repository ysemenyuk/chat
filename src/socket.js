import { io } from 'socket.io-client';

import { channelsActions, messagesActions } from './store/slices.js';

export default (store) => {
  const socket = io();

  socket.on('newMessage', (response) => {
    // console.log(response);
    // const message = response.data.attributes;
    store.dispatch(messagesActions.addMessage(response));
  });

  socket.on('newChannel', (response) => {
    // console.log(response);
    // const channel = response.data.attributes;
    store.dispatch(channelsActions.addChannel(response));
  });

  socket.on('removeChannel', (response) => {
    // console.log(response);
    // const channelId = response.data.id;
    store.dispatch(channelsActions.removeChannel(response));
  });

  socket.on('renameChannel', (response) => {
    // console.log(response);
    // const channel = response.data.attributes;
    store.dispatch(channelsActions.renameChannel(response));
  });
};
