import { useContext } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import UserType from "../../enums/user-type"
import { AuthContext } from "../../store/AuthContext"

interface ProtectedRouteProps extends RouteProps {
    userType?: UserType
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    const { data: userSessionData } = useContext(AuthContext)    

    if(userSessionData?.userId === undefined) {
        return <Redirect to="/login" />
    }

    if (!userSessionData.verified) {
        return <Redirect to="/verify-account" />
    }

    if (props.userType === undefined && userSessionData.id) {
        return (
            <Route {...props}>
                {props.children}
            </Route>
        )
    }

    if (props.userType === UserType.SERVICE_PROVIDER) {
        if (userSessionData.userType === UserType.SERVICE_PROVIDER) {
            return <Route {...props} />
        }
        return <Redirect to="/" />
    }

    if (props.userType === UserType.SERVICE_REQUESTER) {
        if (userSessionData.userType === UserType.SERVICE_REQUESTER) {
            return <Route {...props} />
        }
        return <Redirect to="/" />
    }

    return <Redirect to="/login" />
}

export default ProtectedRoute