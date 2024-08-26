import React from 'react';
import { withFormik } from 'formik';
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";
import FormikInput from './FormikInput';
import axios from 'axios';
import withUser from './withUser';
import withAlert from './withAlert';

function callLoginApi(values, bag) {
  axios.post("https://myeasykart.codeyogi.io/login", {
    email: values.email,
    password: values.password,
  }).then((response) => {
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    bag.props.setUser(user);
    bag.props.setAlert({ type: "success", message: "Login Successful" });
  }).catch(() => {
    bag.props.setAlert({ type: "error", message: "Invalid email or password" });
  });
}

const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

function LoginPage({ handleSubmit, values, handleBlur, handleChange, formik }) {
  return (
    <div className="flex flex-col items-center justify-center m-auto max-w-screen-sm bg-white p-5 relative">
      <Link className="text-4xl hover:bg-base-taupe hover:rounded-full hover:text-white text-base-taupe p-2 absolute top-5 left-5" to="/"><IoIosArrowRoundBack /></Link>
      <div className="text-base-taupe mb-3 text-9xl">
        <IoMdPerson />
      </div>
      <form onSubmit={handleSubmit} className="max-w-md w-full p-6">
        <FormikInput
          type="text"
          name="email"
          placeholder="EMAIL"
          label="EMAIL"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormikInput
          type="password"
          name="password"
          placeholder="PASSWORD"
          label="PASSWORD"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button
          type="submit"
          className="w-full p-3 bg-base-taupe text-white rounded-lg hover:bg-base-drb"
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

const EnhancedLoginPage = withFormik({
  validationSchema: schema,
  mapPropsToValues: () => initialValues,
  handleSubmit: callLoginApi,
})(LoginPage);

export default withAlert(withUser(EnhancedLoginPage));
