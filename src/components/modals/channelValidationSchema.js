import * as Yup from 'yup';

const channelNameValidationSchema = (channelsNames) => Yup.object({
  text: Yup.string()
    .required()
    .min(3)
    .max(30)
    .notOneOf(channelsNames),
});

export default channelNameValidationSchema;
