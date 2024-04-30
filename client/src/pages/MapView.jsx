import React, { useEffect, useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useSelector } from 'react-redux';
import { selectEventList } from 'features/selectors';
import { useParams } from 'react-router-dom';
import { MapExcerpt } from 'components/excerpts/MapExcerpt';

export const MapView = () => {
    const { publicationID } = useParams();
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
                event._id === publicationID ? (
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
                <MapExcerpt
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </Map>
    );
};
