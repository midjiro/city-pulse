import React from 'react';
import PublicationList from 'components/PublicationList';
import { selectPostList } from 'features/post/postReducer';
import { selectEventList } from 'features/event/eventReducer';
import { useSelector } from 'react-redux';
import { PostExcerpt } from 'components/PostExcerpt';
import { EventExcerpt } from 'components/EventExcerpt';

export const Home = () => {
    const [posts, postError, postPending] = useSelector(selectPostList);
    const [events, eventError, eventPending] = useSelector(selectEventList);

    if (postPending || eventPending) return <h2>Loading...</h2>;

    return (
        <section>
            <h2>All posts</h2>
            {posts.length === 0 ? (
                <p>There are nothing posted yet.</p>
            ) : (
                <PublicationList publications={posts} wrapper={PostExcerpt} />
            )}

            <h2>All events</h2>
            {events.length === 0 ? (
                <p>There are nothing posted yet.</p>
            ) : (
                <PublicationList publications={events} wrapper={EventExcerpt} />
            )}
        </section>
    );
};
