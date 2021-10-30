import { useContext } from "react"
import { Link } from "react-router-dom"
import HTTPRequestError from "../../models/http-request-error"
import ServiceRequestDetails from "../../responses/service-request-details"
import { AuthContext } from "../../store/AuthContext"
import ErrorMessage from "../generics/ErrorMessage"
import Paginator from "../generics/Paginator"
import Spinner from "../generics/Spinner"
import ServiceRequestItem from "./ServiceRequestItem"

const ServiceRequesterRequestsList: React.FC<{
    className?: string,
    serviceRequests: ServiceRequestDetails[],
    serviceRequestError: HTTPRequestError|undefined,
    serviceRequestFetchingIsLoading: boolean
}> = (props) => {

    const { data } = useContext(AuthContext)
    return (
        <div className={`flex flex-col gap-3 ${props.className}`}>
            {props.serviceRequests && props.serviceRequests.map((serviceRequest) => (
                <Link key={serviceRequest.id} to={`/service-requesters/${data.id}/service-requests/${serviceRequest.id}`} >
                    <ServiceRequestItem kindOfService={serviceRequest.kindOfService!} date={serviceRequest.date} status={serviceRequest.status!} />
                </Link>
            ))}
            {props.serviceRequests && <Paginator className="mx-auto gap-3" />}
            {props.serviceRequestFetchingIsLoading && <Spinner />}
            {props.serviceRequestError && !props.serviceRequestFetchingIsLoading && <ErrorMessage />}
        </div>
    )
}


export default ServiceRequesterRequestsList