import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import UserType from "../enums/user-type"
import Login from "../responses/login"


type AuthContextType = {
    data: Login
    login: (loginResponse: Login) => void,
    logout: () => void,
    redirectToHomePage: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
    data: new Login(),
    login: (loginResponse: Login) => {},
    logout: () => {},
    redirectToHomePage: () => {}
})


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
        // redirectToHomePage()
    }

    const logout = () => {
        
    }

    const redirectToHomePage = () => {
        if(data?.userType === UserType.SERVICE_PROVIDER) {
            history.push(`/service-providers/${data.id}`)
            return
        }
    }

    const authContextValues: AuthContextType = {
        data,
        login,
        logout,
        redirectToHomePage
    }

    return (
        <AuthContext.Provider value={authContextValues}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider



