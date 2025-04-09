import React from 'react';

function InputForm({ fields }) {
  return (
    <>
      {fields.map((field, index) => (
        <div key={index}>
          <label htmlFor={field.name}>{field.label}</label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            required={field.required}
            step={field.step}
          />
        </div>
      ))}
    </>
  );
}

export default InputForm;
