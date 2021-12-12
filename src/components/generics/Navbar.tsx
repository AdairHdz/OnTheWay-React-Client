import { NavLink } from "react-router-dom"
import LabeledIcon from "./LabeledIcon"
import { faHome } from "@fortawesome/free-solid-svg-icons"
import { faMotorcycle, faDollarSign, faComments, faSearch } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { AuthContext } from "../../store/AuthContext"
import UserType from "../../enums/user-type"

const Navbar = () => {
    const { data: userSessionData } = useContext(AuthContext)

    const renderUserMenuOptions = () => {
        if (userSessionData?.userType === UserType.SERVICE_PROVIDER) {
            return (
                <>
                    <NavLink activeClassName="bg-blue-800 rounded-md" to="/services">
                        <LabeledIcon
                            component={faMotorcycle}
                            text="Servicios" />
                    </NavLink>
                    <NavLink activeClassName="bg-blue-800 rounded-md" to="/statistics">
                        <LabeledIcon
                            component={faDollarSign}
                            text="Estadísticas" />
                    </NavLink>
                </>
            )
        }

        if (userSessionData?.userType === UserType.SERVICE_REQUESTER) {
            return (
                <>
                    <NavLink activeClassName="bg-blue-800 rounded-md" to="/providers">
                        <LabeledIcon
                            component={faSearch}
                            text="Proveedores" />
                    </NavLink>
                </>
            )
        }

        return null
    }
    return (
        <div className={`
            bg-blue-600 order-last
            flex justify-around md:h-screen md:flex-col
            md:order-first md:py-0 md:px-3`}>
            <NavLink activeClassName="bg-blue-800 rounded-md" to="/" exact>
                <LabeledIcon
                    component={faHome}
                    text="Inicio" />
            </NavLink>
            {renderUserMenuOptions()}            
        </div>
    )
}

export default Navbar