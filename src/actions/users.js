"use client"

import { usersDB } from "@/data/usersDB";
import { isEmail, minLength } from "@/helpers/validators";
import { useState } from "react";


export function loginUser({email, password}) {
    const [logIn, setLogIn] = useState(false)
    console.log(email, password)
    if(!email || !password) {
        throw new Error("Please provide email and password!") 
    }
    
    if(!isEmail({value: email})) {
        throw new Error("Please provide a valid email!") 
    }
    
    if(!minLength({value: password, min: 6})) {
        throw new Error("Password should be at least 6 chars!")
    };
    
const userExist = usersDB.find((user) => user.email === email)

if(!userExist) {
    throw new Error("No user exist with this email!")
}
if(userExist.password !== password) {
    throw new Error("Password and Email don't match")
}

if(userExist.password === password  && userExist.email === email) {
    setLogIn(true)
}

return {userExist, logIn}
}

