import { createSlice } from '@reduxjs/toolkit';
import { signIn, signOut, signUp } from './userAPI';
import { toast } from 'react-toastify';

const checkActionType = (action, type) => action.type.endsWith('/' + type);

const userReducer = createSlice({
    name: 'user',
    initialState: {
        pending: false,
        currentUser: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.pending = false;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.currentUser = null;
                state.pending = false;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.pending = false;
            })
            .addMatcher(
                (action) => checkActionType(action, 'pending'),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                (action) => checkActionType(action, 'rejected'),
                (state, action) => {
                    toast(action.error.message);
                    state.pending = false;
                }
            );
    },
});

export default userReducer.reducer;
export const selectCurrentUser = (state) => [
    state.userReducer.currentUser,
    state.userReducer.pending,
];
