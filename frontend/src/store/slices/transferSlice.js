import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import API from "../../api/API";

export const makeTransaction = createAsyncThunk(
  'transfer/makeTransaction',
  async function (payload, { rejectWithValue, dispatch }) {
    try {

      const pay = {
        login: localStorage.getItem('login'),
        password: localStorage.getItem('password'),
        from: payload.from,
        to: payload.to,
        transaction: payload.transact,
        description: payload.description
      }

      let response = await fetch(
        `${API.MAKE_TRANSACTION}`,
        {
          method: 'post',
          body: JSON.stringify(pay),
        }
      );

      response = await response.json();

      if (response.status !== 200)
        throw new Error(`${response.error}`);

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsers = createAsyncThunk(
    'transfer/getUsers',
    async function (_, {rejectWithValue, dispatch}) {
      try {
        let response = await fetch(API.GET_USERS, {
          method: 'get',
        });

        response = await response.json();

        if (response.status !== 200)
          throw new Error(`${response.error}`);

        dispatch(setUsers(response.data));

        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
);

const initialState = {
  users: []
};

const transferSlice = createSlice({
  name: 'transfer',
  initialState: initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    removeUsers(state) {
      state.users = [];
    }
  },
  extraReducers: {
    [makeTransaction.pending]: (state, action) => {},
    [makeTransaction.fulfilled]: (state, action) => {},
    [makeTransaction.rejected]: (state, action) => {throw new Error(action.payload)},
    [getUsers.pending]: (state, action) => {},
    [getUsers.fulfilled]: (state, action) => {},
    [getUsers.rejected]: (state, action) => {throw new Error(action.payload);},
  },
});

export const { setUsers, removeUsers } = transferSlice.actions;

export default transferSlice.reducer;
