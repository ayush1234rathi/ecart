import React from 'react';

const FormikInput = ({ label, name, type = 'text', formik }) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="sr-only">{label}</label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={label}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className="w-full p-3 border border-base-taupe rounded-lg text-base-taupe placeholder-base-taupe "
      />
      {formik.touched[name] && formik.errors[name] && <div className='text-red-500'>{formik.errors[name]}</div>}
    </div>
  );
};

export default FormikInput;