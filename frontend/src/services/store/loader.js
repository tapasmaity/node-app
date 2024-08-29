import {createSlice} from '@reduxjs/toolkit';

const loaderSlice = createSlice({
    name:'loader',
    initialState:{loader:false},
    reducers:{
        loader(state, action){
            state.loader = action.payload;
        }
    }

});

export const loaderAction = loaderSlice.actions;
export default loaderSlice;