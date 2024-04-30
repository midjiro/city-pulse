import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { Controller } from 'react-hook-form';

export const FormField = ({
    control,
    type,
    label,
    autocomplete,
    name,
    rules,
}) => {
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
                            value={value ? value : ''}
                            onChange={onChange}
                            onBlur={onBlur}
                            aria-invalid={invalid}
                            className='form-control__field'
                            id={id}
                        />
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
