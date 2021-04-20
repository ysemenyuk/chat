import { configureStore } from '@reduxjs/toolkit';

import { channelsReducer } from '../components/channels/channelsSlice.js';
import { messagesReducer } from '../components/chat/chatSlice.js';
import { modalReducer } from '../components/modals/modalSlice.js';
import { connectReducer } from './connectSlice.js';
import { thunksReducer } from './thunksSlice.js';

export default () => configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
    connect: connectReducer,
    thunks: thunksReducer,
  },
});
