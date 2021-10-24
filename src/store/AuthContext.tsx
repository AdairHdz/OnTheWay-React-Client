import React, { useEffect, useState } from "react"
import Login from "../responses/login"


type AuthContextType = {
    data: Login
    login: (loginResponse: Login) => void,
    logout: () => void,    
}

const defaultValues = {
    data: new Login(),
    login: (loginResponse: Login) => {},
    logout: () => {},    
}

export const AuthContext = React.createContext<AuthContextType>(defaultValues)


const AuthContextProvider: React.FC = (props) => {
    const [data, setData] = useState<Login>(new Login())


    useEffect(() => {
        const userData = localStorage.getItem("user-data")
        if(userData) {
            const parsedData: Login = JSON.parse(userData)
            setData(parsedData)
        }
    }, [])

    const login = (loginResponse: Login) => {
        setData(loginResponse)
        localStorage.setItem("user-data", JSON.stringify(loginResponse))
    }

    const logout = () => {
        localStorage.removeItem("user-data")
    }    

    const authContextValues: AuthContextType = {
        data,
        login,
        logout,        
    }

    return (
        <AuthContext.Provider value={authContextValues}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider



