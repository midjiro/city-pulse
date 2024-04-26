import { createSelector } from '@reduxjs/toolkit';

export const selectFilter = (state) => state.filterReducer.filter;

export const selectEventList = (state) => [
    state.eventReducer.events,
    state.eventReducer.pending,
];

export const selectPostList = (state) => [
    state.postReducer.posts,
    state.postReducer.pending,
];

export const selectCurrentUser = (state) => [
    state.userReducer.currentUser,
    state.userReducer.pending,
];

export const selectPostsByFilter = createSelector(
    [selectPostList, selectEventList, selectFilter],
    ([posts, postsPending], [events, eventsPending], filter) => {
        if (filter === 'all')
            return [[...posts, ...events], postsPending || eventsPending];
        else if (filter === 'posts') return [posts, postsPending];

        return [events, eventsPending];
    }
);

export const selectSinglePost = createSelector(
    [selectPostList, (_, postID) => postID],
    ([posts, pending], postID) => [
        posts?.find((post) => post._id === postID),
        pending,
    ]
);

export const selectSingleEvent = createSelector(
    [selectEventList, (_, eventID) => eventID],
    ([events, pending], eventID) => [
        events?.find((event) => event._id === eventID),
        pending,
    ]
);

export const selectPublicationsByUser = createSelector(
    [selectPostList, selectEventList, (state, user) => user],
    ([posts, postsPending], [events, eventsPending], user) => {
        const publications = [...posts, ...events];
        return [
            publications?.filter(({ author }) => author?._id === user?._id),
            postsPending || eventsPending,
        ];
    }
);

export const selectPublicationsByTitle = createSelector(
    [selectPostList, selectEventList, (_, title) => title],
    ([posts, postsPending], [events, eventsPending], title) => {
        const publications = [...posts, ...events];

        return [
            publications?.filter((publication) =>
                publication.title.toLowerCase().includes(title)
            ),
            postsPending || eventsPending,
        ];
    }
);
