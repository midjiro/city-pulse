import { createSlice } from '@reduxjs/toolkit';
import { createPost, getPostList } from './postAPI';
import { checkActionType } from 'features/utils';
import { toastId } from 'features/constants/toasts';
import { toast } from 'react-toastify';

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
                const actionType = action.type.split('/')[1];
                toast('Post successfully published', {
                    toastId: toastId[actionType],
                });
                state.posts.push(action.payload);
                state.pending = false;
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
                    const actionType = action.type.split('/')[1];
                    toast(action.error.message, {
                        toastId: toastId[actionType],
                    });
                    state.error = action.error.message;
                    state.pending = false;
                }
            );
    },
});

export default postReducer.reducer;
export const selectPostList = (state) => [
    state.postReducer.posts,
    state.postReducer.error,
    state.postReducer.pending,
];
export const selectUserPostList = (state, user) => [
    state.postReducer.posts.filter(({ author }) => author._id === user._id),
    state.postReducer.error,
    state.postReducer.pending,
];
