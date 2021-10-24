import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import UserType from "../enums/user-type"
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
    const [data, setdata] = useState<Login>(new Login())
    const history = useHistory()

    useEffect(() => {        
        if(!data?.userType) {
            return
        }

        if(data.userType === UserType.SERVICE_PROVIDER) {
            history.push(`/service-providers/${data.id}`)
            return
        }
    }, [data.id, history, data.userType])

    

    const login = (loginResponse: Login) => {
        setdata(loginResponse)        
    }

    const logout = () => {
        
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



