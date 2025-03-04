import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        loader: false,
        usersList: [],
    },
    reducers: {
        setLoader(state, action) {
            state.loader = action.payload;
        },
        setUsers(state, action) {
            state.usersList = action.payload;
        },
    },
});

// Actions
export const { setLoader, setUsers } = appSlice.actions;

// Reducer
export default appSlice.reducer;
