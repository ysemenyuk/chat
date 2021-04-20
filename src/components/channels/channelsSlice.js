/* eslint-disable no-param-reassign */
import { createSlice, createSelector } from '@reduxjs/toolkit';

import chatAdapter from '../../store/adapter.js';
import { fetchUserData } from '../../store/thunksSlice.js';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: chatAdapter.getInitialState({
    currentChannelId: null,
  }),
  reducers: {
    setAll: chatAdapter.setAll,
    selectChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      chatAdapter.addOne(state, action);
      state.currentChannelId = action.payload.id;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      if (id === state.currentChannelId) {
        state.currentChannelId = 1;
      }
      chatAdapter.removeOne(state, id);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      chatAdapter.updateOne(state, { id, changes: { name } });
    },
  },
  extraReducers: {
    [fetchUserData.fulfilled]: (state, action) => {
      const { channels, currentChannelId } = action.payload;
      state.currentChannelId = currentChannelId;
      chatAdapter.setAll(state, channels);
    },
  },
});

const adapterChannelsSelectors = chatAdapter.getSelectors((state) => state.channels);

const selectCurrentChannelId = (state) => state.channels.currentChannelId;

const selectAllNames = createSelector(
  adapterChannelsSelectors.selectAll,
  (channels) => channels.map(({ name }) => name),
);

const selectCurrentChannel = createSelector(
  adapterChannelsSelectors.selectAll,
  selectCurrentChannelId,
  (channels, channelId) => channels.find((ch) => ch.id === channelId),
);

export const channelsSelectors = {
  ...adapterChannelsSelectors, selectAllNames, selectCurrentChannel, selectCurrentChannelId,
};

export const channelsActions = channelsSlice.actions;

export const channelsReducer = channelsSlice.reducer;

export default channelsSlice;
