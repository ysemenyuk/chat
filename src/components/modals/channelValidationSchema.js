import * as Yup from 'yup';

const channelNameValidationSchema = (channelsNames) => Yup.object({
  text: Yup.string()
    .min(3)
    .max(30)
    .required()
    .notOneOf(channelsNames),
});

export default channelNameValidationSchema;
