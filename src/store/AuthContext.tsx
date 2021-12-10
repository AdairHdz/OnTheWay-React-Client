import React, { useEffect, useState } from "react"
import UserSession from "../models/user-session"
import Login from "../responses/login"


type AuthContextType = {
    data: UserSession|undefined,
    token: string|undefined,
    login: (loginResponse: Login) => void,
    logout: () => void,
    activateAccount: () => void
}

const defaultValues = {
    data: undefined,
    token: undefined,
    login: (loginResponse: Login) => {},
    logout: () => {},
    activateAccount: () => {}
}

export const AuthContext = React.createContext<AuthContextType>(defaultValues)


const AuthContextProvider: React.FC = (props) => {
    const [data, setData] = useState<UserSession>()
    const [token, setToken] = useState<string|undefined>()

    useEffect(() => {
        const userData = localStorage.getItem("user-data")
        if(userData) {
            const parsedData: UserSession = JSON.parse(userData)
            setData(parsedData)
        }
    }, [])

    const login = (loginResponse: Login) => {
        const userSession = {
            id: loginResponse.id,
            userId: loginResponse.userId,
            names: loginResponse.names,
            lastName: loginResponse.lastName,
            stateId: loginResponse.stateId,
            emailAddress: loginResponse.emailAddress,
            userType: loginResponse.userType,
            verified: loginResponse.verified
        }
        setData(userSession)
        if(loginResponse.token) {
            setToken(loginResponse.token)
        }
        localStorage.setItem("user-data", JSON.stringify(userSession))
    }

    const logout = () => {
        localStorage.removeItem("user-data")
        setData(undefined)
        setToken(undefined)
    }    

    const activateAccount = () => {
        const userDataJSON = localStorage.getItem("user-data")
        const userData: UserSession = JSON.parse(userDataJSON!)        
        userData.verified = true
        localStorage.setItem("user-data", JSON.stringify(userData))
        setData(userData)
    }

    const authContextValues: AuthContextType = {
        data,
        token,
        login,
        logout,
        activateAccount
    }

    useEffect(() => {
        if(token === undefined && data?.userId) {
            fetch(`${process.env.REACT_APP_BASE_API_URL}:${process.env.REACT_APP_BASE_API_PORT}/users/${data.userId}/token/refresh`, {
                method: "POST",
                credentials: "include"
            }).then((response) => response.json())
            .then(data => {                
                setToken(data.token)
            })            
        }        
    })

    return (
        <AuthContext.Provider value={authContextValues}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider



