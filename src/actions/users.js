"use client"

import { usersDB } from "@/data/usersDB";
import { isEmail, minLength } from "@/helpers/validators";
import { createContext, useContext, useState } from "react";

const loginContext = createContext(null)

export const loginUser = ({email, password, }) => {
    const {logedIn, setLogedIn} = useState(false)
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
    setLogedIn(true)
}


return {userExist, logedIn}
}
const logged = logedIn

export function UserProvider({children}) {
    return (
        <loginContext.Provider value={{ userExist, logged }}>
            {children}
        </loginContext.Provider>
)
}

export function useUser() {
    return useContext(loginContext)
}