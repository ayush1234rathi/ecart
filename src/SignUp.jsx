import React from "react";
import { withFormik, Form } from 'formik'
import * as Yup from 'yup';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdPerson } from "react-icons/io";
import FormikInput from './FormikInput';  // Import the custom component
import withAlert from "./withAlert";
import withUser from "./withUser";
import axios from 'axios';

function callSignUpApi(values, bag) {
  axios.post("https://myeasykart.codeyogi.io/signup", {
    email: values.email,
    password: values.password,
    fullName: values.name,
  }).then((response) => {
    const { user, token } = response.data;
    localStorage.setItem("token", token);
    bag.props.setUser(user);
    bag.props.setAlert({ type: "success", message: "Sign Up Successful" });
  }).catch(() => {
    bag.props.setAlert({ type: "error", message: "Error during sign up" });
  });
}

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function SignUpPage({ handleSubmit, values, handleBlur, handleChange }) {
  return (
    <div className="flex flex-col items-center justify-center m-auto max-w-screen-sm bg-white p-5">
      <div className="text-base-taupe mb-3 text-9xl">
        <IoMdPerson />
      </div>
      <Form onSubmit={handleSubmit} className="p-6 rounded-lg w-full max-w-md">
        <FormikInput
          type="text"
          name="name"
          placeholder="NAME"
          label="NAME"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
        <FormikInput
          type="password"
          name="confirmPassword"
          placeholder="CONFIRM PASSWORD"
          label="CONFIRM PASSWORD"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
      </Form>
    </div>
  );
}
const EnhancedSignUpPage = withFormik({
  validationSchema: schema,
  mapPropsToValues: () => initialValues,
  handleSubmit: callSignUpApi,
})(SignUpPage);

export default withAlert(withUser(EnhancedSignUpPage));


