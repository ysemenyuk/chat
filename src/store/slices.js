/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import chatAdapter from './adapter.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: chatAdapter.getInitialState({
    currentChannelId: null,
  }),
  reducers: {
    selectChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      chatAdapter.addOne(state, action);
      state.currentChannelId = action.payload.id;
    },
    removeChannel: (state, action) => {
      if (action.payload === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      chatAdapter.removeOne(state, action);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      chatAdapter.updateOne(state, { id, changes: { name } });
    },
  },
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState: chatAdapter.getInitialState(),
  reducers: {
    addMessage: (state, action) => {
      chatAdapter.addOne(state, action);
    },
  },
  extraReducers: {
    [channelsSlice.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = state.ids
        .filter((id) => state.entities[id].channelId === action.payload);
      chatAdapter.removeMany(state, channelMessagesIds);
    },
  },
});

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,
    modalType: null,
    modalData: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.modalShow = true;
      state.modalType = action.payload.modalType;
      state.modalData = action.payload.modalData;
    },
    closeModal: (state) => {
      state.modalShow = false;
      state.modalType = null;
      state.modalData = null;
    },
  },
});

export const channelsActions = channelsSlice.actions;
export const messagesActions = messagesSlice.actions;
export const modalActions = modalSlice.actions;

export default {
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
  modal: modalSlice.reducer,
};
