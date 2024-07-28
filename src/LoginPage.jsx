import { useFormik } from 'formik';
import React from 'react';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import FormikInput from './FormikInput';  // Import the custom component

function LoginPage() {
  function callLoginApi(values) {
    console.log("username and password is", values.email, values.password);
  }

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required()
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: callLoginApi,
    validationSchema: schema
  });

  return (
    <div className="flex flex-col items-center justify-center m-auto max-w-screen-sm bg-white p-5 relative">
      <Link className="text-4xl hover:bg-base-taupe hover:rounded-full hover:text-white text-base-taupe p-2 absolute top-5 left-5" to="/"><IoIosArrowRoundBack /></Link>
      <div className="text-base-taupe mb-3 text-9xl">
        <IoMdPerson />
      </div>
      <form onSubmit={formik.handleSubmit} className="max-w-md w-full p-6">
        <FormikInput label="Email" name="email" formik={formik} />
        <FormikInput label="Password" name="password" type="password" formik={formik} />
        <button
          type="submit"
          className="w-full p-3 bg-base-taupe text-white rounded-lg hover:bg-base-drb"
          disabled={!formik.isValid}
        >
          LOGIN
        </button>
        <div className="mt-4">
          <Link to="/forgotPassword" className="text-base-taupe hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="mt-4 text-base-taupe">
          Don't have an account? <Link to="/SignUp" className="hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
