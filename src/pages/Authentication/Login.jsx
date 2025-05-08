import React, { useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginRequestAction } from "../../Redux/Auth/auth.action";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../Redux/UserProfile/user.action";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password is too small")
    .required("Password is required."),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(null);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  const token = auth.jwt;

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile(token));
      navigate("/");
    }

    if (auth.error) {
      setError(auth.error.response.data.message || "User not found");
    }
  }, [auth.error, token, navigate]);

  const handleSubmit = async (values, { resetForm }) => {
    setFormData(values);

    await dispatch(loginRequestAction(values));

    resetForm();

    // console.log(formData);
  };

  return (
    <div className="mx-4">
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-3">
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
          <div className="mb-3">
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

          <button
            className="mt-5 text-white px-10 py-3 text-xl font-medium bg-red-400 w-full"
            type="submit"
            style={{ cursor: "pointer", border: "1px solid red" }}
          >
            Submit
          </button>
        </Form>
      </Formik>

      <div className="my-2">
        {error && (
          <p className="text-[12px] font-bold text-red-500">
            {error.slice(0, error.indexOf(":")).toUpperCase() +
              " " +
              error.slice(error.indexOf(":"))}
          </p>
        )}
      </div>

      <p className="mt-4 text-blue-400 ">
        Are you already registerd ?{" "}
        <span
          className="hover:text-red-500 text-md"
          onClick={() => navigate("/signup")}
          style={{ cursor: "pointer" }}
        >
          Register Here
        </span>
      </p>
    </div>
  );
};

export default Login;
