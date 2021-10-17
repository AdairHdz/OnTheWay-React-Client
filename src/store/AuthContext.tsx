import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import UserType from "../models/userType"

type AuthContextType = {
    authenticationToken: string,
    userType?: UserType
    login: (authenticationToken: string) => void,
    logout: () => void,
    redirectToHomePage: () => void
}

export const AuthContext = React.createContext<AuthContextType>({
    authenticationToken: "",    
    login: (authenticationToken: string) => {},
    logout: () => {},
    redirectToHomePage: () => {}
})


const AuthContextProvider: React.FC = (props) => {
    const [authenticationToken, setAuthenticationToken] = useState("")
    const [userType, setUserType] = useState<UserType>()
    const history = useHistory()

    useEffect(() => {        
        if(userType === undefined) {
            return
        }

        if(userType === UserType.SERVICE_PROVIDER) {
            history.push("/home")
            return
        }
    }, [userType, history])

    

    const login = (authenticationToken: string) => {
        setAuthenticationToken(authenticationToken)
        setUserType(UserType.SERVICE_PROVIDER)
        // redirectToHomePage()
    }

    const logout = () => {
        setAuthenticationToken("")
        setUserType(undefined)
    }

    const redirectToHomePage = () => {
        if(userType === UserType.SERVICE_PROVIDER) {
            history.push("/home")
        } else {
            //Go to homepage for service_requester
        }
    }

    const authContextValues = {
        authenticationToken,
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



