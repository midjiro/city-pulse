import React from 'react';
import { format } from 'date-fns';
import { InfoWindow } from '@vis.gl/react-google-maps';
import { Link } from 'react-router-dom';

export const MapExcerpt = ({ event, onClose }) => {
    return (
        <InfoWindow
            position={{
                lat: event.location.lat,
                lng: event.location.lng,
            }}
            onCloseClick={onClose}
            className='publication map-view__publication'
        >
            <h2 className='publication__title map-view__title'>
                <Link to={`/event/${event._id}`}>{event.title}</Link>
            </h2>
            <p className='date'>
                Scheduled for: {format(event.scheduledFor.toString(), 'PPPPp')}
            </p>
            <p className='publication__text map-view__text'>
                {event.content.length < 100
                    ? event.content.substr(0, 100) + '...'
                    : event.content}
            </p>
        </InfoWindow>
    );
};
