"use client"

import Input from "../UiElements/Input";
import Button from "../UiElements/Button";
import classes from "./Loginpage.module.css"
import useForm from "@/hooks/useForm";
import { useCallback } from "react";
import { isEmail, isPast, minLength, theSame } from "@/helpers/validators";

const formValidators = {
  name: minLength,
  email: isEmail,
  birthdate: isPast,
  password: minLength,
  passwordConfirm: theSame,
};

const initialState = {
    email: {value: "", isValid: false, touched: false},
    password: {value: "", isValid: false, touched: false},
}



export default function LoginPage() {
    const { formState, handleChange, handleTouch, formIsValid } = useForm({
        initialState,
        formValidators,
    });
    
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log("sent");
    }, []);
    return (
        <form className={classes["form"]}>
                <h1 className={classes["header"]}>Log in</h1>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    label="Your Email"
                    placeholder="write an exist email"
                    errorText="Please provide a valid email"
                    inputState={formState.email}
                    onChange={handleChange}
                    onBlur={handleTouch}
                />

                <Input
                    id="password"
                    type="password"
                    name="password"
                    label="Your password"
                    placeholder="write an exist password"
                    errorText="Please provide a valid password"
                    inputState={formState.password}
                    onChange={handleChange}
                    onBlur={handleTouch}
                />
                <div className={classes["buttons"]}>
                    <Button disabled={!formIsValid} onClick={handleSubmit}>
                        Sign Up
                    </Button>
                    <Button onClick={handleSubmit} href="https://myaccount.google.com">
                         Sign in with google <i className="fa-brands fa-google"></i>
                    </Button>
                </div>
        </form>
    )
}