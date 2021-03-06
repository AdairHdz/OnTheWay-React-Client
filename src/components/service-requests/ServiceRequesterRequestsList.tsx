import { useContext } from "react"
import { Link } from "react-router-dom"
import HTTPRequestError from "../../models/http-request-error"
import ServiceRequestDetails from "../../responses/service-request-details"
import { AuthContext } from "../../store/AuthContext"
import ErrorMessage from "../generics/ErrorMessage"
import Spinner from "../generics/Spinner"
import ServiceRequestItem from "./ServiceRequestItem"

const ServiceRequesterRequestsList: React.FC<{
    className?: string,
    serviceRequests: ServiceRequestDetails[],
    serviceRequestError: HTTPRequestError | undefined,
    serviceRequestFetchingIsLoading: boolean,
    responseStatus: number | undefined
}> = (props) => {

    const { data: userSessionData } = useContext(AuthContext)

    const renderServiceRequestError = () => {
        if (props.serviceRequestError && !props.serviceRequestFetchingIsLoading) {
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
                    return (
                        <ErrorMessage errorTitle="Sin resultados"
                            errorMessage="Parece ser que no tiene solicitudes de servicio en la fecha especificada" />
                    )
                default:
                    return <ErrorMessage />
            }
        }
        return null
    }

    return (
        <div className={`flex flex-col gap-3`}>
            {props.serviceRequests && props.serviceRequests.map((serviceRequest) => (
                <Link
                    key={serviceRequest.id}
                    to={`/service-requesters/${userSessionData?.id}/service-requests/${serviceRequest.id}`} >
                    <ServiceRequestItem
                        kindOfService={serviceRequest.kindOfService!}
                        date={serviceRequest.date}
                        status={serviceRequest.status!} />
                </Link>
            ))}
            {props.serviceRequestFetchingIsLoading && <Spinner />}
            {renderServiceRequestError()}
        </div>
    )
}


export default ServiceRequesterRequestsList