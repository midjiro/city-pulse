import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicationList from 'components/PublicationList';
import { selectUserPostList } from 'features/post/postReducer';
import { selectUserEventList } from 'features/event/eventReducer';
import { PostExcerpt } from 'components/PostExcerpt';
import { EventExcerpt } from 'components/EventExcerpt';

export const ProfilePublications = () => {
    const { user } = useOutletContext();
    const [posts, postError, postsPending] = useSelector((state) =>
        selectUserPostList(state, user)
    );
    const [events, eventError, eventsPending] = useSelector((state) =>
        selectUserEventList(state, user)
    );

    if (postsPending || eventsPending) return <h2>Loading...</h2>;

    return (
        <>
            <h2>All Posts</h2>
            {posts.length === 0 || postError ? (
                <p>There are nothing published by you</p>
            ) : (
                <PublicationList publications={posts} wrapper={PostExcerpt} />
            )}
            <h2>All Events</h2>
            {events.length === 0 || eventError ? (
                <p>There are nothing published by you</p>
            ) : (
                <PublicationList publications={events} wrapper={EventExcerpt} />
            )}
        </>
    );
};
