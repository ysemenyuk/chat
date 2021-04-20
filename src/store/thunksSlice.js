/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { trimStart } from 'lodash';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (userInfo && userInfo.token) {
    return { Authorization: `Bearer ${userInfo.token}` };
  }

  return {};
};

export const fetchUserData = createAsyncThunk('fetchUserData', async () => {
  const url = routes.usersPath();
  return axios
    .get(url, {
      headers: getAuthHeader(),
    })
    .then((resp) => resp.data)
    .catch((err) => console.log(err));
});

const loadingTypesRegExp = /\/pending|\/fulfilled|\/rejected/;

const thunksSlice = createSlice({
  name: 'thunksStatuses',
  initialState: {},
  reducers: {},
  extraReducers: (builder) =>
    builder.addMatcher(
      (action) => loadingTypesRegExp.test(action.type),
      (state, action) => {
        const [match] = action.type.match(loadingTypesRegExp);
        const fetchingStatus = trimStart(match, '/');
        const actionTypePrefix = action.type.replace(loadingTypesRegExp, '');
        state[actionTypePrefix] = fetchingStatus;
      },
    ),
});

export const thunksReducer = thunksSlice.reducer;
