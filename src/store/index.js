import { configureStore } from '@reduxjs/toolkit';

import reducers from './slices.js';

import thunksReducer from './thunks.js';

export default () => configureStore({
  reducer: {
    channels: reducers.channelsReducer,
    messages: reducers.messagesReducer,
    modal: reducers.modalReducer,
    connect: reducers.connectReducer,
    thunks: thunksReducer,
  },
});
