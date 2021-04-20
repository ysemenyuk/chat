import React from 'react';
import { useDispatch } from 'react-redux';

import { channelsActions } from './channelsSlice.js';
import { modalActions } from '../modal/modalSlice.js';

import Channel from './Channel.jsx';

const ChannelsList = (props) => {
  const dispatch = useDispatch();
  const { channels, currentChannel } = props;

  const handleSelectChannel = (id) => () => {
    dispatch(channelsActions.selectChannel(id));
  };

  const handleRemoveChannel = (modalData) => () => {
    dispatch(modalActions.openModal({ modalType: 'removing', modalData }));
  };

  const handleRenameChannel = (modalData) => () => {
    dispatch(modalActions.openModal({ modalType: 'renaming', modalData }));
  };

  return (
    channels.map((channel) => (
      <li key={channel.id} className="nav-item">
        <Channel
          channel={channel}
          currentChannel={currentChannel}
          onSelectChannel={handleSelectChannel}
          onRemoveChannel={handleRemoveChannel}
          onRenameChannel={handleRenameChannel}
        />
      </li>
    ))
  );
};

export default ChannelsList;
