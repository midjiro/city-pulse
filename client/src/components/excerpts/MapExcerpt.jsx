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
            className="excerpt map-view__excerpt"
        >
            <h2 className="excerpt__title map-view__title">
                <Link to={`/event/${event._id}`} className="excerpt__link">
                    {event.title}
                </Link>
            </h2>
            <p className="date">
                Scheduled for: {format(event.scheduledFor.toString(), 'PPPPp')}
            </p>
        </InfoWindow>
    );
};
