import { createSlice } from '@reduxjs/toolkit';
import { createPost, deletePost, getPostList } from './postAPI';
import { checkActionType } from 'features/utils';

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
export const selectFoundPostList = ({ postReducer }, searchQuery) => {
    if (!searchQuery) return [];

    return postReducer.posts.filter((post) => {
        const lowerCaseTitle = post.title.toLowerCase();

        return lowerCaseTitle.includes(searchQuery);
    });
};
