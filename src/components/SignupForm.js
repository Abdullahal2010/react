import React from "react";

import { Formik, Form, useField } from "formik";

import * as Yup from "yup";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        className={meta.touched && meta.error ? "invalid" : null}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MyCheckBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label htmlFor="acceptedTerms">
        <input
          type="checkbox"
          className={meta.touched && meta.error ? "invalid" : null}
          {...field}
          {...props}
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const SignupForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        acceptedTerms: "",
      }}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(20, "This must be less than 20")
          .min(3, "This must be at least 3")
          .required("required"),
        lastName: Yup.string()
          .max(20, "This must be less than 20")
          .min(3, "This must be at least 3")
          .required("required"),

        email: Yup.string().email("Invalid email").required("required"),
        phone: Yup.string()
          .matches(
            /^(?:\+?88)?01[3-9]\d{8}$/,
            "Invalid phone(must start with 88)"
          )
          .required("required"),
        password: Yup.string()
          .required("required")
          .max(36, "This must be less than 36 character")
          .min(6, "This must be at least 6 character long"),
        acceptedTerms: Yup.boolean()
          .required("Required")
          .oneOf([true], "You must accept the terms and conditions."),
        jobType: Yup.string()
          .oneOf(
            ["designer", "developer", "driver", "teacher"],
            "Invalid job type"
          )
          .required("Required"),
      })}
      onSubmit={(values, { resetForm }) => {
        console.log(values);
        resetForm();
      }}
    >
      {(formik) => (
        <div>
          <Form>
            <MyTextInput
              type="text"
              name="firstName"
              label="First Name: "
              placeholder="Anisul"
            />

            <MyTextInput
              type="text"
              name="lastName"
              label="Last Name: "
              placeholder="Islam"
            />

            <MyTextInput
              type="email"
              name="email"
              label="Email: "
              placeholder="anisulislam.uk@yahoo.co"
            />

            <MyTextInput
              type="number"
              name="phone"
              label="Phone Number: "
              placeholder="880155845678"
            />

            <MyTextInput
              type="password"
              name="password"
              label="Password: "
              placeholder="abc123ABC.."
            />

            <MyCheckBox name="acceptedTerms">
              I accept terms and Condition
            </MyCheckBox>

            <MySelect label="Job type: " name="jobType">
              <option value="">Select a job</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="driver">Driver</option>
              <option value="teacher">Teacher</option>
            </MySelect>

            <div>
              <button
                disabled={
                  !formik.dirty ||
                  Object.keys(formik.errors).length > 0 ||
                  formik.isSubmitting
                }
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default SignupForm;
