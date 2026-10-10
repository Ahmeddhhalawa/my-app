"use client"

import { loginUser } from "@/actions/users"
import { useContext } from "react"

const loginContext = createContext()

export function userProvider({email, password}) {
    const {userExist, logIn} = loginUser(email, password)

    return (
    <loginContext.Provider value={{ userExist, logIn }}>
        {children}
    </loginContext.Provider>
)
}

export function useUser() {
    return useContext(loginContext)
}
