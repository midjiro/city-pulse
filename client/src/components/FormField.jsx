import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { Controller } from 'react-hook-form';

export const FormField = ({
    control,
    type,
    label,
    accept,
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
                        {type === 'file' ? (
                            <input
                                type={type}
                                onChange={({ target }) => {
                                    onChange(target.files.item(0));
                                }}
                                accept={accept}
                                onBlur={onBlur}
                                aria-invalid={invalid}
                                className='form-control__field'
                                id={id}
                            />
                        ) : (
                            <input
                                type={type}
                                autoComplete={autocomplete}
                                value={value}
                                onChange={onChange}
                                onBlur={onBlur}
                                aria-invalid={invalid}
                                className='form-control__field'
                                id={id}
                            />
                        )}
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
