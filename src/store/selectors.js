import { createSelector } from '@reduxjs/toolkit';

import chatAdapter from './adapter.js';

const adapterChannelsSelectors = chatAdapter.getSelectors((state) => state.channels);
const adapterMessagesSelectors = chatAdapter.getSelectors((state) => state.messages);

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

const selectByCurrentChannel = createSelector(
  adapterMessagesSelectors.selectAll,
  selectCurrentChannelId,
  (messages, channelId) => messages.filter((m) => m.channelId === channelId),
);

export const channelsSelectors = {
  ...adapterChannelsSelectors, selectAllNames, selectCurrentChannel,
};

export const messagesSelectors = { ...adapterMessagesSelectors, selectByCurrentChannel };

export const selectModal = (state) => state.modal;
