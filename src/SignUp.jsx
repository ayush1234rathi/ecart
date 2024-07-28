import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import FormikInput from './FormikInput';  // Import the custom component

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
    }),
    onSubmit: values => {
      console.log("Sign Up Values:", values);
    }
  });

  return (
    <div className="flex flex-col items-center justify-center m-auto max-w-screen-sm bg-white p-5">
      <div className="text-base-taupe mb-3 text-9xl">
        <IoMdPerson />
      </div>
      <form onSubmit={formik.handleSubmit} className="p-6 rounded-lg w-full max-w-md">
        <FormikInput label="Name" name="name" formik={formik} />
        <FormikInput label="Email" name="email" type="email" formik={formik} />
        <FormikInput label="Password" name="password" type="password" formik={formik} />
        <FormikInput label="Confirm Password" name="confirmPassword" type="password" formik={formik} />
        <button
          type="submit"
          className="w-full p-3 bg-base-taupe text-white rounded-lg hover:bg-base-drb"
        >
          SIGN UP
        </button>
        <div className="mt-4 text-base-taupe">
          Already have an account? <Link to="/login" className="hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
