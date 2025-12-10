import { combineReducers } from '@reduxjs/toolkit';
import { configSlice } from '@/store/app/config.slice.ts';
import { authSlice } from '@/store/app/auth.slice.ts';
import { mapSlice } from '@/store/app/map.slice.ts';

export const appReducer = combineReducers({
  auth: authSlice.reducer,
  config: configSlice.reducer,
  map: mapSlice.reducer
});