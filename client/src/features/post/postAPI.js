import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from 'requests/post';

export const getPostList = createAsyncThunk(
    'post/get',
    async (_, { rejectWithValue }) => {
        try {
            return await Post.getPostList();
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);

export const createPost = createAsyncThunk(
    'post/create',
    async (post, { rejectWithValue }) => {
        try {
            return await Post.createPost(post);
        } catch (error) {
            return rejectWithValue(await error);
        }
    }
);
