import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import FormikInput from './FormikInput';  // Import the custom component

function ForgotPassword() {
  const onSubmit = (values) => {
    console.log("Reset Password Values:", values);
  };

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
  });

  return (
    <div className="flex flex-col items-center justify-center m-auto max-w-screen-sm bg-white p-5">
      <div className="text-base-taupe mb-3 text-9xl">
        <IoMdPerson />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
      <Form className="p-6 rounded-lg w-full max-w-md">
        <FormikInput type="text" name="email" placeholder="EMAIL" label="EMAIL" id="email" />
        <button
          type="submit"
          className="w-full p-3 bg-base-taupe text-white rounded-lg hover:bg-base-drb"
          disabled={isSubmitting}
        >
          Reset Password
        </button>
        <div className="mt-4 text-base-taupe">
          <Link to="/login" className="hover:underline">
            Back to Login
          </Link>
        </div>
        </Form>
          )}
        </Formik>
    </div>
  );
}

export default ForgotPassword;
