import React from 'react';
import { useTranslation } from 'react-i18next';

const Channel = (props) => {
  const { t } = useTranslation();

  const {
    channel, currentChannel,
    onSelectChannel, onRemoveChannel, onRenameChannel,
  } = props;

  const currentClass = currentChannel.id === channel.id ? 'btn-primary' : 'btn-light';

  if (channel.removable === false) {
    return (
      <button
        onClick={onSelectChannel(channel.id)}
        type="button"
        className={`btn ${currentClass} nav-link btn-block mb-2 text-left`}
      >
        #
        {' '}
        {channel.name}
      </button>
    );
  }

  return (
    <div className="btn-group d-flex mb-2 dropdown">
      <button
        onClick={onSelectChannel(channel.id)}
        type="button"
        className={`btn ${currentClass} text-left flex-grow-1 nav-link`}
      >
        #
        {' '}
        {channel.name}
      </button>
      <button
        type="button"
        className={`btn ${currentClass} flex-grow-0 dropdown-toggle dropdown-toggle-split`}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="sr-only">Toggle Dropdown</span>
      </button>
      <div className="dropdown-menu">
        <button onClick={onRemoveChannel(channel)} className="dropdown-item" type="button">{t('remove')}</button>
        <button onClick={onRenameChannel(channel)} className="dropdown-item" type="button">{t('rename')}</button>
      </div>
    </div>
  );
};

export default Channel;
