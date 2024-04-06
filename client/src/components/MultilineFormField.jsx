import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';

export const MultilineFormField = ({
    control,
    label,
    name,
    rules,
    rows,
    cols,
    maxLength,
}) => {
    const id = nanoid();
    return (
        <div className='form-control'>
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { invalid, error },
                }) => (
                    <>
                        <div className='form-control__container'>
                            <label
                                htmlFor={id}
                                className='form-control__caption'
                            >
                                {label}
                            </label>
                            <p className='form-control__length-counter'>
                                {value?.length ? value.length : 0} / {maxLength}
                            </p>
                        </div>
                        <textarea
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            aria-invalid={invalid}
                            className='form-control__field'
                            id={id}
                            rows={rows}
                            cols={cols}
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
