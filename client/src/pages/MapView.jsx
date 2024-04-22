import React, { useEffect, useState } from 'react';
import {
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from '@vis.gl/react-google-maps';
import { useSelector } from 'react-redux';
import { selectEventList } from 'features/selectors';
import { Link, useParams } from 'react-router-dom';

export const MapView = () => {
    const { eventID } = useParams();
    const [events, pending] = useSelector(selectEventList);
    const [defaultCenter, setDefaultCenter] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const onClickMarker = (event) => {
        setSelectedEvent(event);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({ coords }) =>
                setDefaultCenter({
                    lat: coords.latitude,
                    lng: coords.longitude,
                }),
            (error) => console.error(error)
        );
    }, []);

    if (!defaultCenter || pending) return <h2>Loading...</h2>;

    return (
        <Map
            defaultCenter={defaultCenter}
            defaultZoom={4}
            mapId={process.env.REACT_APP_MAP_ID}
            className='map-view'
        >
            {events.map((event) =>
                event._id === eventID ? (
                    <AdvancedMarker
                        position={{
                            lat: event.location.lat,
                            lng: event.location.lng,
                        }}
                        onClick={() => onClickMarker(event)}
                        key={event._id}
                    >
                        <Pin className='map-view__pin' />
                    </AdvancedMarker>
                ) : (
                    <AdvancedMarker
                        position={{
                            lat: event.location.lat,
                            lng: event.location.lng,
                        }}
                        onClick={() => onClickMarker(event)}
                        key={event._id}
                    >
                        <Pin
                            className='map-view__pin'
                            background='silver'
                            borderColor='gray'
                            glyphColor='gray'
                        />
                    </AdvancedMarker>
                )
            )}

            {selectedEvent && (
                <InfoWindow
                    position={{
                        lat: selectedEvent.location.lat,
                        lng: selectedEvent.location.lng,
                    }}
                    onCloseClick={() => setSelectedEvent(null)}
                >
                    <h2 className='map-view__title'>
                        <Link
                            to={`/event/${selectedEvent._id}`}
                            className='map-view__link'
                        >
                            {selectedEvent.title}
                        </Link>
                    </h2>
                    <p className='map-view__body'>
                        {selectedEvent.content.length < 100
                            ? selectedEvent.content.substr(0, 100) + '...'
                            : selectedEvent.content}
                    </p>
                </InfoWindow>
            )}
        </Map>
    );
};
