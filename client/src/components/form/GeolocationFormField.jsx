import { nanoid } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';
import { usePlacesService, usePlacePredictions } from 'hooks/places';

export const GeolocationFormField = ({
    control,
    type,
    label,
    autocomplete,
    name,
    rules,
}) => {
    const placesService = usePlacesService();
    const [suggestions, getPlacePredictions] =
        usePlacePredictions(placesService);
    const id = nanoid();

    return (
        <div className='form-control'>
            <label htmlFor={id} className='form-control__caption'>
                {label}
            </label>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { invalid, error },
                }) => (
                    <>
                        <input
                            type={type}
                            autoComplete={autocomplete}
                            list='geolocation-autocomplete'
                            value={value || ''}
                            onChange={(e) => {
                                onChange(e);
                                getPlacePredictions(e.target.value);
                            }}
                            onBlur={onBlur}
                            aria-invalid={invalid}
                            className='form-control__field'
                            id={id}
                        />
                        <datalist id='geolocation-autocomplete'>
                            {suggestions.map((suggestion, index) => (
                                <option
                                    key={index}
                                    value={suggestion.description}
                                >
                                    {suggestion.description}
                                </option>
                            ))}
                        </datalist>
                        {error && (
                            <p className='form-control__error'>
                                {error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
};
