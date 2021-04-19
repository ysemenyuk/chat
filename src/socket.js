import { io } from 'socket.io-client';

import { channelsActions, messagesActions } from './store/slices.js';

const socket = io();

export default (store) => {
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

  socket.on('connect_error', (err) => {
    console.log('socket connect_error -', err);
    // setSubmitting(false);
  });
};

const newChannel = (values, cb) => {
  socket.emit(
    'newChannel',
    { name: values.text },
    (response) => {
      console.log('newChannel response -', response);
      cb(response);
    },
  );
};

export const api = { newChannel };
