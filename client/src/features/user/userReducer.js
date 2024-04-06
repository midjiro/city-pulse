import { toast } from 'react-toastify';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { signIn, signOut, signUp, updateAccountInformation } from './userAPI';
import { checkActionType } from 'features/utils';
import { toastId } from 'features/constants/toasts';

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
                (action) => checkActionType(action, 'user', 'pending'),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                (action) => checkActionType(action, 'user', 'rejected'),
                (state, action) => {
                    const actionType = action.type.split('/')[1];

                    toast(action.error.message, {
                        toastId: toastId[actionType],
                    });

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
