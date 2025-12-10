
import { AddressT } from '@/components/types/map';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@utils/redux.ts';

export type ImapSlice = {
  location_list: AddressT[];
};
const initialState: ImapSlice = {
  location_list: []
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    ADD_LOCATION: (state, action: PayloadAction<AddressT>) => {
      const { place_id } = action.payload;
      if (state.location_list.some(location => location.place_id === place_id))
        return state;
      state.location_list.push(action.payload);
    },
    REMOVE_LOCATION: (state, action: PayloadAction<string>) => ({
      ...state,
      location_list: state.location_list.filter(
        place => place.place_id !== action.payload
      )
    })
  }
});

export const { ADD_LOCATION, REMOVE_LOCATION } = mapSlice.actions;

export const GET_LOCATION_LIST = (state: RootState) => state.app.map;