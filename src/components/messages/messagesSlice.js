/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';

import adapter from '../../store/adapter.js';
import channelsSlice, { channelsSelectors } from '../channels/channelsSlice.js';
import { fetchUserData } from '../../store/thunksSlice.js';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: adapter.getInitialState(),
  reducers: {
    setAll: adapter.setAll,
    addMessage: adapter.addOne,
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      const { messages } = action.payload;
      adapter.setAll(state, messages);
    },
    [channelsSlice.actions.removeChannel]: (state, action) => {
      const channelMessagesIds = state.ids
        .filter((id) => state.entities[id].channelId === action.payload.id);
      adapter.removeMany(state, channelMessagesIds);
    },
  },
});

const adapterMessagesSelectors = adapter.getSelectors((state) => state.messages);

const selectByCurrentChannel = createSelector(
  adapterMessagesSelectors.selectAll,
  channelsSelectors.selectCurrentChannelId,
  (messages, channelId) => messages.filter((m) => m.channelId === channelId),
);

export const messagesSelectors = { ...adapterMessagesSelectors, selectByCurrentChannel };

export const messagesActions = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
