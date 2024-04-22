import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = { filter: 'all' };

const filterSlice = createSlice({
    name: 'filter',
    initialState: INITIAL_STATE,
    reducers: {
        set: (state, action) => {
            state.filter = action.payload;
        },
    },
});

export default filterSlice.reducer;
export const filterActions = filterSlice.actions;
