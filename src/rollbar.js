import Rollbar from 'rollbar';

const accessToken = process.env.POST_CLIENT_ITEM_ACCESS_TOKEN;
const environment = process.env.NODE_ENV || 'development';

export default () => {
  const rollbar = new Rollbar({
    enabled: (process.env.NODE_ENV === 'production'),
    accessToken,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment,
    },
  });
  return rollbar;
};
