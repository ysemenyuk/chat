import { useSelector } from 'react-redux';

export default (thunk) => {
  const status = useSelector((state) => state.thunks[thunk.typePrefix]);
  const isFetching = status === 'pending';
  const isSuccess = status === 'fulfilled';

  return { status, isFetching, isSuccess };
};
