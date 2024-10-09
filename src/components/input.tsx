import React, { forwardRef } from "react";

interface InputProps {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const Input = forwardRef(
  (
    {
      label,
      type = "text",
      id,
      name,
      placeholder,
      defaultValue,
      onChange,
    }: InputProps,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex gap-2 items-center">
        {label && (
          <label className="w-1/6" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          className={`rounded border border-gray-500 p-2 ${
            label ? "w-5/6" : "w-auto"
          }`}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  }
);
