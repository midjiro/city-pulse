import { createSlice } from '@reduxjs/toolkit';
import {
    createPost,
    deletePublication,
    getPublicationList,
} from './publicationAPI';
import { checkActionType } from 'utils';
import { removeAccount } from 'features/user/userAPI';

const publicationReducer = createSlice({
    name: 'publication',
    initialState: {
        publications: [],
        error: null,
        pending: false,
    },
    extraReducers: (build) => {
        build
            .addCase(getPublicationList.fulfilled, (state, action) => {
                state.publications = action.payload;
                state.pending = false;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.publications.push(action.payload);
                state.error = null;
                state.pending = false;
            })
            .addCase(deletePublication.fulfilled, (state, action) => {
                const { publicationID } = action.payload;

                state.publications = state.publications.filter(
                    (publication) => publication._id !== publicationID
                );
                state.pending = false;
            })
            .addCase(removeAccount.fulfilled, (state, action) => {
                const { _id: authorID } = action.payload;

                state.publications = state.publications.filter(
                    (publication) => publication.author._id !== authorID
                );
            })
            .addMatcher(
                (action) => checkActionType(action, 'publication', 'pending'),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                (action) => checkActionType(action, 'publication', 'rejected'),
                (state, action) => {
                    state.error = action.error.message;
                    state.pending = false;
                }
            );
    },
});

export default publicationReducer.reducer;
