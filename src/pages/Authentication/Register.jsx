import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerRequestAction } from "../../Redux/Auth/auth.action";
import { Navigate, useNavigate } from "react-router-dom";

// Sign-up Schema
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("Last Name is required."),
  email: Yup.string().email("Invalid Email").required("Email is required."),
  password: Yup.string()
    .min(6, "Password is too small")
    .required("Password is required."),
  gender: Yup.string()
    .oneOf(["male", "female", "other"])
    .required("Gender is required."),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  gender: "",
};

const gender = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];

// const ErrorMsg = () => {
//   return (
//     <div className=" text-red-400"></div>
//   )
// };

const Register = () => {
  const [formData, setFormData] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    setFormData(values);

    dispatch(registerRequestAction(values));

    console.log(values);

    resetForm();
  };

  return (
    <div className="mx-4">
      <Formik
        initialValues={initialValues}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-2">
            <Field
              as={TextField}
              name="firstName"
              type="firstName"
              placeholder="First Name"
              fullWidth
            />
            <ErrorMessage
              name="firstName"
              render={(msg) => <div className="text-red-400">{msg}</div>}
            />
          </div>
          <div className="mb-2">
            <Field
              as={TextField}
              name="lastName"
              type="lastName"
              placeholder="Last Name"
              fullWidth
            />
            <ErrorMessage
              name="lastName"
              render={(msg) => <div className="text-red-400">{msg}</div>}
            />
          </div>
          <div className="mb-2">
            <Field
              as={TextField}
              name="email"
              type="email"
              placeholder="Email"
              fullWidth
            />
            <ErrorMessage
              name="email"
              render={(msg) => <div className="text-red-400">{msg}</div>}
            />
          </div>
          <div className="mb-2">
            <Field
              as={TextField}
              name="password"
              type="password"
              placeholder="Password"
              fullWidth
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div className="text-red-400">{msg}</div>}
            />
          </div>
          <div className=" ">
            <Field
              as={TextField}
              select
              label="Gender"
              name="gender"
              type="gender"
              fullWidth
              variant="outlined"
            >
              {gender.map((option) => {
                return (
                  <MenuItem
                    className="p-2"
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                );
              })}
            </Field>
            <ErrorMessage
              name="gender"
              render={(msg) => <div className="text-red-400">{msg}</div>}
            />
          </div>

          <button
            className="my-3 py-3 px-10 bg-red-400 text-xl font-medium cursor-pointer hover:text-red-400 hover:bg-gray-200 text-white w-full"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>

      <p className="my-3 text-blue-400 text-center">
        Already registered ?{" "}
        <span
          className="text-blue-800 hover:text-red-400 text-sm tracking-wider"
          onClick={() => navigate("/signin")}
          style={{ cursor: "pointer" }}
        >
          {" "}
          LOGIN
        </span>
      </p>

      <button className="w-full my-3 py-3 px-10 bg-red-400 text-xl font-medium cursor-pointer text-white">
        Forgot Password
      </button>
    </div>
  );
};

export default Register;
