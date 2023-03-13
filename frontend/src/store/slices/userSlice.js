import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import API from '../../api/API';

export const signInUser = createAsyncThunk(
    'user/signIn',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.SIGN_IN, {
                method: 'post',
                body: JSON.stringify(user),
            });

            response = await response.json();

            if (response.status !== 200)
                throw new Error(`${response.error}`);

            dispatch(setUser(response.data));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'user/signUp',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(API.SIGN_UP, {
                method: 'post',
                body: JSON.stringify(user)
            });

            response = await response.json();

            if (response.status !== 200)
                throw new Error(`${response.error}`);

            dispatch(signInUser(user));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    id: null,
    login: null,
    password: null,

    status: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.password = action.payload.password;
            localStorage.setItem('userId', action.payload.id);
            localStorage.setItem('login', action.payload.login);
            localStorage.setItem('password', action.payload.password);
        },
        removeUser(state) {
            state.id = null;
            state.login = null;
            state.password = null;
            localStorage.removeItem('userId');
            localStorage.removeItem('login');
            localStorage.removeItem('password');
        },
    },
    extraReducers: {
        [signInUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [signInUser.fulfilled]: (state, action) => {
            state.status = 'resolved';
        },
        [signInUser.rejected]: (state, action) => {
            state.status = 'rejected';
            state.error = action.payload;
            throw new Error(action.payload);
        },
        [signUpUser.pending]: (state, action) => {
        },
        [signUpUser.fulfilled]: (state, action) => {
        },
        [signUpUser.rejected]: (state, action) => {throw new Error(action.payload);},
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
