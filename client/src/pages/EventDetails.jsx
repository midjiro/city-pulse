import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { selectCurrentUser } from 'features/selectors';
import { deleteEvent } from 'features/event/eventAPI';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import { selectSingleEvent } from 'features/selectors';

export const EventDetails = () => {
    const { eventID } = useParams();
    const [event, eventPending] = useSelector((state) =>
        selectSingleEvent(state, eventID)
    );
    const [user, userPending] = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (eventPending || userPending) return <h2>Loading...</h2>;
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

            {user?._id === event.author._id && (
                <button
                    className='btn btn--danger'
                    onClick={() => {
                        dispatch(deleteEvent(event._id))
                            .then(unwrapResult)
                            .then(() => {
                                navigate('/');
                            })
                            .catch((error) => {
                                toast(error.message);
                            });
                    }}
                >
                    Delete
                </button>
            )}
        </>
    );
};
