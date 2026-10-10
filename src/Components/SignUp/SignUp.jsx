"use client";

import { isEmail, isPast, minLength, theSame } from "@/helpers/validators";
import Input from "../UiElements/Input";
import Button from "../UiElements/Button";
import useForm from "@/hooks/useForm";
import { loginUser } from "@/actions/users";
import { useState } from "react";

const SignUp = ({ login }) => {
  const [error, setError] = useState('')
  const formValidators = {
    name: minLength,
    email: isEmail,
    birthdate: isPast,
    password: minLength,
    passwordConfirm: theSame,
  };

  const initialState = {
    name: { value: "", isValid: false, touched: false },
    email: { value: "", isValid: false, touched: false },
    birthdate: { value: "", isValid: false, touched: false },
    password: { value: "", isValid: false, touched: false },
    passwordConfirm: { value: "", isValid: false, touched: false },
  };

  if (login) {
    delete formValidators["name"];
    delete formValidators["birthdate"];
    delete formValidators["passwordConfirm"];

    delete initialState["name"];
    delete initialState["birthdate"];
    delete initialState["passwordConfirm"];
  }

  // name email birthdate password passwordConfirm
  const { formState, handleChange, handleTouch, formIsValid } = useForm({
    initialState,
    formValidators,
  });

const handleSubmit = async (e) => {
  e.preventDefault()

  if (login) {
    try {
      const res = loginUser({
        email: formState.email.value,
        password: formState.password.value,
      });

      console.log("Login result:", res);
    } catch (error) {
      setError(error.message || "Something went wrong!");
    }
  }
}

  return (
    <form>
      <h3>{login ? "Log into your account" : "Create New Account"}</h3>

      {!login && (
        <Input
          id="name"
          type="text"
          name="name"
          label="Full Name"
          placeholder="Write your full name"
          errorText="Name should be at least 3 chars"
          inputState={formState.name}
          onChange={handleChange}
          onBlur={handleTouch}
          minLength={3}
        />
      )}

      <Input
        id="email"
        type="email"
        name="email"
        label="Your email"
        placeholder="Write an exist email"
        errorText="Please provide a valid email"
        inputState={formState.email}
        onChange={handleChange}
        onBlur={handleTouch}
      />

      {!login && (
        <Input
          id="birthdate"
          type="date"
          name="birthdate"
          label="Birthdate"
          errorText="Please provide a valid birthdate"
          inputState={formState.birthdate}
          onChange={handleChange}
          onBlur={handleTouch}
        />
      )}

      <Input
              id="password"
              type="password"
              name="password"
              label="Password"
              errorText="Password should be at least 6 chars"
              placeholder="***********"
              inputState={formState.password}
              onChange={handleChange}
              onBlur={handleTouch}
              minLength={6}
            />

      {!login && (
        <Input
          id="passwordConfirm"
          type="password"
          name="passwordConfirm"
          label="Password Confirm"
          errorText="Passwords are not the same"
          placeholder="***********"
          inputState={formState.passwordConfirm}
          onChange={handleChange}
          onBlur={handleTouch}
        />
      )}

      <Button onClick={handleSubmit}>
        {login ? "Login" : "Sign Up"}
      </Button>

      {error && <p>{error}</p>}
    </form>
  );
};

export default SignUp;