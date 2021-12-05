import React, { useEffect, useState } from "react"
import Login from "../responses/login"


type AuthContextType = {
    data: Login,
    token: string|undefined,
    login: (loginResponse: Login) => void,
    logout: () => void,
    activateAccount: () => void
}

const defaultValues = {
    data: new Login(),
    token: undefined,
    login: (loginResponse: Login) => {},
    logout: () => {},
    activateAccount: () => {}
}

export const AuthContext = React.createContext<AuthContextType>(defaultValues)


const AuthContextProvider: React.FC = (props) => {
    const [data, setData] = useState<Login>(new Login())
    const [token, setToken] = useState<string|undefined>()

    useEffect(() => {
        const userData = localStorage.getItem("user-data")
        if(userData) {
            const parsedData: Login = JSON.parse(userData)
            setData(parsedData)
        }
    }, [])

    const login = (loginResponse: Login) => {
        setData(loginResponse)
        if(loginResponse.token) {
            setToken(loginResponse.token)
        }
        localStorage.setItem("user-data", JSON.stringify(loginResponse))
    }

    const logout = () => {
        localStorage.removeItem("user-data")
        setData(new Login())
        setToken(undefined)
    }    

    const activateAccount = () => {
        const userDataJSON = localStorage.getItem("user-data")
        const userData: Login = JSON.parse(userDataJSON!)        
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
        if(token === undefined) {            
            fetch(`http://127.0.0.1:8000/users/${data.userId}/token/refresh`, {
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



