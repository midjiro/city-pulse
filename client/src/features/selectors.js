import { createSelector } from '@reduxjs/toolkit';

export const selectFilter = (state) => state.filterReducer.filter;

export const selectNotifications = (state) =>
    state.notificationReducer.notifications;

export const selectUnreadedNotifications = createSelector(
    selectNotifications,
    (notifications) =>
        notifications.filter((notification) => !!notification.unreaded)
);

export const selectCurrentUser = createSelector(
    (state) => state.userReducer,
    (userReducer) => [userReducer.currentUser, userReducer.pending]
);

export const selectPublicationList = (state) => [
    state.publicationReducer.publications,
    state.publicationReducer.pending,
];

export const selectEventList = (state) => [
    state.publicationReducer.publications.filter(
        (publication) => publication.hasOwnProperty('location'),
        state.publicationReducer.pending
    ),
];

export const selectPublicationsByFilter = createSelector(
    [selectPublicationList, selectFilter],
    ([publications, pending], filter) => {
        if (filter === 'all') return [publications, pending];
        else if (filter === 'posts')
            return [
                publications.filter(
                    (publication) => !publication.hasOwnProperty('location')
                ),
                pending,
            ];

        return [
            publications.filter((publication) =>
                publication.hasOwnProperty('location')
            ),
            pending,
        ];
    }
);

export const selectSinglePublication = createSelector(
    [selectPublicationList, (_, publicationID) => publicationID],
    ([publications, pending], publicationID) => [
        publications?.find((publication) => publication._id === publicationID),
        pending,
    ]
);

export const selectPublicationsByUser = createSelector(
    [selectPublicationList, (state, user) => user],
    ([publications, pending], user) => {
        return [
            publications?.filter(({ author }) => author?._id === user?._id),
            pending,
        ];
    }
);

export const selectPublicationsByTitle = createSelector(
    [selectPublicationList, (_, title) => title],
    ([publications, pending], title) => {
        return [
            publications?.filter((publication) =>
                publication.title.toLowerCase().includes(title)
            ),
            pending,
        ];
    }
);
