export default {
  string: {
    min: ({ min }) => ({ key: 'toShort', values: { min } }),
    max: ({ max }) => ({ key: 'toLong', values: { max } }),
  },
  mixed: {
    required: () => ({ key: 'required' }),
    notOneOf: () => ({ key: 'notOneOf' }),
    oneOf: 'notOneOf',
  },
};
