import { useContext } from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"
import { AuthContext } from "../../store/AuthContext"

interface LoginRouteProps extends RouteProps {  }

const LoginRoute: React.FC<LoginRouteProps> = (props) => {
    const { data } = useContext(AuthContext)
    
    if(data?.id) {
        return <Redirect to="/" />
    }
    return (
        <Route {...props}>
            {props.children}
        </Route>
    )
}

export default LoginRoute