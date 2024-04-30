import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Controller } from 'react-hook-form';

export const FileFormField = ({ control, label, name, rules, accept }) => {
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
                    field: { onChange, onBlur },
                    fieldState: { invalid, error },
                }) => (
                    <>
                        <input
                            type='file'
                            onChange={({ target }) => {
                                onChange(target.files.item(0));
                            }}
                            accept={accept}
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
