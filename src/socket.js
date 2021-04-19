import { io } from 'socket.io-client';

import { channelsActions, messagesActions, connectStatusActions } from './store/slices.js';

export default (store) => {
  const socket = io({
    timeout: 10000,
  });

  socket.on('newMessage', (response) => {
    // console.log(response);
    store.dispatch(messagesActions.addMessage(response));
  });

  socket.on('newChannel', (response) => {
    // console.log(response);
    store.dispatch(channelsActions.addChannel(response));
  });

  socket.on('removeChannel', (response) => {
    // console.log(response);
    store.dispatch(channelsActions.removeChannel(response));
  });

  socket.on('renameChannel', (response) => {
    // console.log(response);
    store.dispatch(channelsActions.renameChannel(response));
  });

  socket.on('connect', () => {
    console.log('socket connect');
    store.dispatch(connectStatusActions.setConnect());
  });

  socket.on('connect_error', (err) => {
    console.log('socket connect_error -', err);
    store.dispatch(connectStatusActions.setDisconnect());
  });

  return socket;
};
