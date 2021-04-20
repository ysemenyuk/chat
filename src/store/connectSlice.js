/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const connectSlice = createSlice({
  name: 'networkStatus',
  initialState: { status: 'connected' },
  reducers: {
    setDisconnect: (state) => {
      if (state.status === 'çonnected') {
        state.status = 'disconnected';
      }
    },
    setConnect: (state) => {
      state.status = 'çonnected';
    },
  },
});

export const connectActions = connectSlice.actions;

export const connectReducer = connectSlice.reducer;
