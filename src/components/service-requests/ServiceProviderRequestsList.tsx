import { useContext } from "react"
import { Link } from "react-router-dom"
import HTTPRequestError from "../../models/http-request-error"
import ServiceRequestDetails from "../../responses/service-request-details"
import { AuthContext } from "../../store/AuthContext"
import ErrorMessage from "../generics/ErrorMessage"
import Paginator from "../generics/Paginator"
import Spinner from "../generics/Spinner"
import ServiceRequestItem from "./ServiceRequestItem"

const ServiceProviderRequestsList: React.FC<{
    className?: string,
    serviceRequests: ServiceRequestDetails[],
    serviceRequestError: HTTPRequestError | undefined,
    serviceRequestFetchingIsLoading: boolean,
    responseStatus: number|undefined
}> = (props) => {
    const { data } = useContext(AuthContext)

    const renderServiceRequestError = () => {
        if(props.serviceRequestError && !props.serviceRequestFetchingIsLoading) {
            if(props.responseStatus && props.responseStatus === 404) {
                return (
                    <ErrorMessage errorTitle="Sin resultados"
                        errorMessage="Parece ser que no tiene solicitudes de servicio en la fecha especificada" />
                )
            }
            return <ErrorMessage />
        }
        return null
    }

    return (
        <div className={`flex flex-col gap-3 ${props.className}`}>
            {props.serviceRequests && props.serviceRequests.map((serviceRequest) => (
                <Link key={serviceRequest.id} to={`/service-providers/${data.id}/service-requests/${serviceRequest.id}`} >
                    <ServiceRequestItem kindOfService={serviceRequest.kindOfService!} date={serviceRequest.date} status={serviceRequest.status!} />
                </Link>
            ))}
            {/* {props.serviceRequests && <Paginator className="mx-auto gap-3" />} */}
            {props.serviceRequestFetchingIsLoading && <Spinner />}
            { renderServiceRequestError() }
        </div>
    )
}

export default ServiceProviderRequestsList