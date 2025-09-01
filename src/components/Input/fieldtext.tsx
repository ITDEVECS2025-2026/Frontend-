import React from 'react';
import { Field, useFormikContext, ErrorMessage } from 'formik';
import { InputProps } from '@/types/Input';

const Input = ({
    placeholder,
    name,
    label,
    prefix,
    suffix,
    maxLength,
    type = 'text',
    disabled = false,
    readonly = false,
    helpertext,
    iconPosition = 'none',
    icon,
    onChange,
}: InputProps & { iconPosition?: 'left' | 'right' | 'none'; icon?: React.ReactNode }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { setFieldValue, errors, touched, values } = useFormikContext<{
        [key: string]: any;
    }>();

    const hasError = touched[name] && errors[name] && !disabled && !readonly;
    const isValid = touched[name] && !errors[name] && !disabled && !readonly;

    const baseBorder = hasError
        ? 'border-[#E13B11]'
        : isValid
        ? 'border-[#389C1A]'
        : 'border-[#B9B9B9]';

    const iconContent = icon ? <div className="text-AddsOn-neutral">{icon}</div> : null;

    return (
        <div className="mb-4 w-full">
            {/* Label + Character Count */}
            <div className="w-full flex justify-between items-center gap-3 mb-2">
                <label htmlFor={name}>
                    <span className="font-poppins font-semibold text-xs text-[#E9E9E9]">
                        {label}
                    </span>
                </label>
                {maxLength && (
                    <span className="font-poppins font-semibold text-xs text-[#E9E9E9]">
                        {values[name] ? values[name].length : 0} / {maxLength}
                    </span>
                )}
            </div>

            {/* Input Field */}
            <div
                className={`flex w-full rounded-sm items-center p-2 border gap-3 ${baseBorder} ${
                    disabled ? 'bg-gray-800' : 'bg-transparent'
                }`}
            >
                {iconPosition === 'left' && iconContent}

                <Field
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    type={type}
                    disabled={disabled}
                    readOnly={readonly}
                    onChange={(e: any) => {
                        setFieldValue(name, e.target.value);
                        if (onChange) onChange(e);
                    }}
                    ref={inputRef}
                    className="w-full bg-transparent focus:outline-none placeholder:text-[#83817A] text-[#83817A] font-poppins text-xs"
                />

                {iconPosition === 'right' && iconContent}
            </div>

            {/* Helper Text or Error */}
            <div className="mt-2">
                {hasError ? (
                    <ErrorMessage name={name}>
                        {(msg) => (
                            <span className="flex gap-1.5 items-center text-[#E13B11] font-poppins font-semibold text-xs">
                                {msg}
                            </span>
                        )}
                    </ErrorMessage>
                ) : (
                    helpertext && (
                        <span className="block text-[#83817A] font-poppins font-regular text-xs">
                            {helpertext}
                        </span>
                    )
                )}
            </div>
        </div>
    );
};

export default Input;
