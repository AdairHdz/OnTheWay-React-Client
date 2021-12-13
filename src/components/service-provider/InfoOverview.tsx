import StarRate from "../generics/StarRate"
import ServiceProviderInfoOverview from "../../responses/service-provider-info-overview"
import Spinner from "../generics/Spinner"
import ErrorMessage from "../generics/ErrorMessage"
import HTTPRequestError from "../../models/http-request-error"
import { useContext, useEffect } from "react"
import useFetch from "../../hooks/use-fetch"
import { AuthContext } from "../../store/AuthContext"
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMotorcycle } from "@fortawesome/free-solid-svg-icons"
import UserType from "../../enums/user-type"

const InfoOVerview: React.FC<{
    data: ServiceProviderInfoOverview,
    error: HTTPRequestError | undefined,
    isLoading: boolean,
    responseStatus: number | undefined
    sendRequest: () => void
}> = (props) => {

    const {
        sendRequest: sendLogoutRequest
    } = useFetch()

    const renderError = () => {
        if (props.error && !props.isLoading) {
            switch (props.responseStatus) {
                case 0:
                    return (
                        <ErrorMessage errorTitle="Conexión rechazada"
                            errorMessage="No pudimos establecer una conexión con nuestros servidores. Por favor, intente más tarde" />
                    )
                case 400:
                    return (
                        <ErrorMessage errorTitle="Solicitud no válida"
                            errorMessage="Los datos introducidos no son válidos. Por favor, verifique la información e intente nuevamente" />
                    )
                case 404:
                    return <ErrorMessage errorTitle="Sin resultados"
                        errorMessage="Parece ser que no hay un proveedor con el ID especificado" />
                default:
                    return <ErrorMessage />
            }
        }
        return null
    }

    const {
        logout,
        data: userData
    } = useContext(AuthContext)

    const history = useHistory()

    const logoutHandler = () => {
        sendLogoutRequest(`/users/logout`, {
            method: "POST"
        })
        logout()
        history.push("/login")
    }

    useEffect(() => {
        props.sendRequest()
    }, [])

    return (
        <div className="flex flex-col md:flex-row">
            <img
                src={props.data?.businessPicture.includes(".") ?
                    `${process.env.REACT_APP_BASE_API_URL}:${process.env.REACT_APP_BASE_API_PORT}/images/${props.data.businessPicture}` : "https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=130&w=220"
                }
                alt="Business Logo"
                className="mr-10 w-full md:w-1/2 md:mr-0" />
            <div className="flex justify-between w-full">
                {renderError()}
                {userData?.userType === UserType.SERVICE_PROVIDER && props.error && !props.isLoading && (
                    <div className="p-5 flex flex-col justify-between">
                        <button
                            className={`
                                        block border border-blue-600 text-blue-600
                                        bg-transparent px-5 py-2 rounded-sm cursor-pointer
                                        hover:text-white hover:bg-blue-600 transition-colors`
                            }
                            type="button"
                            onClick={logoutHandler}>
                            Cerrar sesión
                        </button>
                    </div>
                )}
                {props.isLoading && <Spinner />}
                {props.data && (
                    <>
                        <div className="flex flex-col justify-around p-5">
                            <div className="flex flex-grow items-center">
                                <div className="p-5 align text-left">
                                    <p className="font-bold text-xl mb-3">
                                        {props.data?.businessName}
                                    </p>
                                    <p className="text-md mb-5">
                                        {`${props.data?.names} ${props.data?.lastname}`}
                                    </p>
                                    <StarRate rate={props.data?.averageScore || 0} />
                                </div>

                            </div>
                            {userData?.userType !== UserType.SERVICE_PROVIDER && (
                                <div className="p-5">
                                    <button
                                        className="btn-primary"
                                        onClick={() => {
                                            history.push(`/service-providers/${props.data.id}/service-request`)
                                        }}>
                                        <span className="inline-block text-center">
                                            <span className="mr-3">Solicitar servicio</span>
                                            <FontAwesomeIcon icon={faMotorcycle} className="lg:text-lg" />
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                        {userData?.userType === UserType.SERVICE_PROVIDER && (
                            <div className="p-5 flex flex-col justify-between">
                                <button
                                    className={`
                                        block border border-blue-600 text-blue-600
                                        bg-transparent px-5 py-2 rounded-sm cursor-pointer
                                        hover:text-white hover:bg-blue-600 transition-colors`
                                    }
                                    type="button"
                                    onClick={logoutHandler}>
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default InfoOVerview