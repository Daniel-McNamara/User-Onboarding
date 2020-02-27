import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import "./Form.css";
import axios from "axios";
import styled from "styled-components";

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 3% auto;
  background-color: whitesmoke;
  border: 1px solid black;
  border-radius: 5px;
  width: 35%;
  height: 15vh;
  opacity: 0.9;
`;

function UserForm({ values, errors, touched, status }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("status change", status);
    status && setUsers(() => [...users, status]);
    console.log(users);
  }, [status]);

  return (
    <div>
      <Form className="form-container">
        <h1>Log User!</h1>
        <label htmlFor="name">
          <Field id="name" type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          <Field id="email" type="text" name="email" placeholder="Email" />
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>
        <label htmlFor="password">
          <Field
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>
        <label>
          <Field as="select" name="role">
            <option disabled value="0">
              Chose a Role
            </option>
            <option value="manager">Manager</option>
            <option value="assistant manager">Assistant Manager</option>
            <option value="assistant to the manager">
              Assistant to the Manager
            </option>
          </Field>
        </label>
        <label>
          Terms and Conditions:
          <Field id="terms" type="checkbox" name="terms" />
        </label>
        <button type="submit">Submit</button>
      </Form>
      {users.map(user => {
        return (
          <UserDiv key="user.id">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.role}</p>
          </UserDiv>
        );
      })}
    </div>
  );
}

const FormikUserForm = withFormik({
  mapPropsToValues(props) {
    console.log(props);
    return {
      name: "",
      email: "",
      password: "",
      role: "0",
      terms: false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Must include a name"),
    email: Yup.string().required("Must include an email"),
    password: Yup.string().required("Must set a password")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users", values)
      .then(response => {
        console.log("success", response);
        setStatus(response.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;