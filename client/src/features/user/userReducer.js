import { createSlice, isAnyOf, nanoid } from '@reduxjs/toolkit';
import { signIn, signOut, signUp, updateAccountInformation } from './userAPI';
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
            .addCase(signOut.fulfilled, (state) => {
                state.currentUser = null;
                state.pending = false;
            })
            .addMatcher(
                isAnyOf(
                    signIn.fulfilled,
                    signUp.fulfilled,
                    updateAccountInformation.fulfilled
                ),
                (state, action) => {
                    state.currentUser = action.payload;
                    state.pending = false;
                }
            )

            .addMatcher(
                (action) => checkActionType(action, 'pending'),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                (action) => checkActionType(action, 'rejected'),
                (state, action) => {
                    toast(action.error.message, { toastId: nanoid() });
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
