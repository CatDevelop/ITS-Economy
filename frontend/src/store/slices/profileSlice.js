import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/API";

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async function (userID, { rejectWithValue, dispatch }) {
    try {
      let response = await fetch(
        `${API.GET_USER}?ID=${userID??"1"}`,
        {
          method: 'get'
        }
      );

      response = await response.json();

      if (response.status !== 200)
        throw new Error(`${response.error}`);

      dispatch(setProfile(response.data));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  firstName: null,
  secondName: null,
  card: null,
  balance: null,
  typeUser: null,
  transactions: []
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    setProfile(state, action) {
      state.firstName = action.payload.firstName;
      state.secondName = action.payload.secondName;
      state.card = action.payload.card;
      state.balance = action.payload.balance;
      state.typeUser = action.payload.typeUser;
      state.transactions = action.payload.transactions;
    },
    removeProfile(state) {
      state.firstName = null;
      state.secondName = null;
      state.card = null;
      state.balance = null;
      state.typeUser = null;
      state.transactions = [];
    }
  },
  extraReducers: {
    [getProfile.pending]: (state, action) => {},
    [getProfile.fulfilled]: (state, action) => {},
    [getProfile.rejected]: (state, action) => {throw new Error(action.payload);},
  },
});

export const { setProfile, removeProfile } = profileSlice.actions;

export default profileSlice.reducer;
