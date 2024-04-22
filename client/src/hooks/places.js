import { useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';

export const usePlacesService = () => {
    const placesLib = useMapsLibrary('places');
    const [placesService, setPlacesService] = useState(null);

    useEffect(() => {
        if (placesLib) {
            setPlacesService(new placesLib.AutocompleteService());
        }
    }, [placesLib]);

    return placesService;
};

export const usePlacePredictions = (placesService) => {
    const [suggestions, setSuggestions] = useState([]);

    const getPlacePredictions = async (value) => {
        if (!placesService) return;
        try {
            const newSuggestions = await new Promise((resolve, reject) => {
                placesService.getPlacePredictions(
                    {
                        input: value,
                        language: 'en',
                    },
                    (predictions, status) => {
                        if (status === 'OK') {
                            resolve(predictions);
                        } else {
                            reject(
                                new Error(
                                    `Place prediction request failed with status: ${status}`
                                )
                            );
                        }
                    }
                );
            });
            setSuggestions(newSuggestions);
        } catch (error) {
            console.error('Error fetching place predictions:', error);
        }
    };

    return [suggestions, getPlacePredictions];
};
