import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { selectCurrentUser, selectSinglePublication } from 'features/selectors';
import { deletePublication } from 'features/publication/publicationAPI';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

export const EventDetails = () => {
    const { publicationID } = useParams();
    const [event, eventPending] = useSelector((state) =>
        selectSinglePublication(state, publicationID)
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
            <p>
                Scheduled for: {format(event.scheduledFor.toString(), 'PPPPp')}
            </p>
            <p>
                Will be held in:{' '}
                <Link to={`/event/map-view/${event._id}`}>
                    {event.location.name}
                </Link>
            </p>

            {user?._id === event.author._id && (
                <button
                    className='btn btn--danger'
                    onClick={() => {
                        dispatch(deletePublication(event._id))
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
