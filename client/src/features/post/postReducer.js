import { createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, getPostList } from './postAPI';
import { checkActionType } from 'features/utils';
import { removeAccount } from 'features/user/userAPI';

const postReducer = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        error: null,
        pending: false,
    },
    extraReducers: (build) => {
        build
            .addCase(getPostList.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.pending = false;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
                state.error = null;
                state.pending = false;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                const { postID } = action.payload;

                state.posts = state.posts.filter((post) => post._id !== postID);
                state.pending = false;
            })
            .addCase(removeAccount.fulfilled, (state, action) => {
                const { author } = action.payload;

                state.posts = state.posts.filter(
                    (post) => post.author._id !== author._id
                );
            })
            .addMatcher(
                (action) => checkActionType(action, 'post', 'pending'),
                (state) => {
                    state.pending = true;
                }
            )
            .addMatcher(
                (action) => checkActionType(action, 'post', 'rejected'),
                (state, action) => {
                    state.error = action.error.message;
                    state.pending = false;
                }
            );
    },
});

export default postReducer.reducer;
