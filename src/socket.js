import { io } from 'socket.io-client';

import { channelsActions, messagesActions } from './store/slices.js';

export const socket = io({
  timeout: 10000,
});

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

  socket.onAny((event) => {
    console.log(`got Any ${event}`);
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
