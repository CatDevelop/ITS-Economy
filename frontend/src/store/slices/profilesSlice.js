import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/API";

export const getProfiles = createAsyncThunk(
  'profiles/getProfiles',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      let response = await fetch(
        `${API.GET_USERS_WITH_BALANCE}`,
        {
          method: 'get'
        }
      );

      response = await response.json();

      if (response.status !== 200)
        throw new Error(`${response.error}`);
      console.log(response);
      dispatch(setProfiles(response.data));

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
  }
);

const initialState = {
  profiles: []
};

const profilesSlice = createSlice({
  name: 'profiles',
  initialState: initialState,
  reducers: {
    setProfiles(state, action) {
      console.log(action);
      state.profiles = action.payload;
    },
    removeProfiles(state) {
      state.profiles = [];
    }
  },
  extraReducers: {
    [getProfiles.pending]: (state, action) => {},
    [getProfiles.fulfilled]: (state, action) => {},
    [getProfiles.rejected]: (state, action) => {throw new Error(action.payload);},
  },
});

export const { setProfiles, removeProfiles } = profilesSlice.actions;

export default profilesSlice.reducer;
