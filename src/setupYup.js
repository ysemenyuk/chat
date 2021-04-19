import { setLocale } from 'yup';

const setupYup = (i18n) => {
  setLocale({
    mixed: {
      required: () => i18n.t('required'),
      notOneOf: () => i18n.t('notOneOf'),
      oneOf: ({ path }) => i18n.t(`oneOf${path}`),
    },
    string: {
      min: ({ min }) => i18n.t('stringMin', { min }),
      max: ({ max }) => i18n.t('stringMax', { max }),
    },
  });
};

export default setupYup;
