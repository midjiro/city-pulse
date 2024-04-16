import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

export const EventDetails = () => {
    const { eventID } = useParams();
    const [event, _, pending] = useSelector((state) => [
        state.eventReducer.events.find((event) => event._id === eventID),
        state.eventReducer.error,
        state.eventReducer.pending,
    ]);

    if (pending) return <h2>Loading...</h2>;
    else if (!event)
        return (
            <>
                <h2>Oops! We are unable to find event you are looking for</h2>
                <p>It might be removed or updated.</p>
            </>
        );

    return (
        <>
            <h2>{event.title}</h2>
            <p>Written by:</p>
            <section className='author'>
                <img
                    src={event.author?.picture}
                    alt=''
                    className='author__avatar avatar'
                />
                <a
                    href={`/user/${event.author._id}`}
                    className='author__profile-link'
                >
                    {event.author.displayName}
                </a>
            </section>

            <p>{event.content}</p>
            <p>Scheduled for: {format(event.date.toString(), 'PPPPp')}</p>
            <p>
                Will be held in: <a href={event.location}>{event.location}</a>
            </p>
        </>
    );
};
