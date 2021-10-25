// import { useEffect } from "react"
// import useFetch from "../../hooks/use-fetch"
// import ServiceRequest from "../../models/service-request"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../store/AuthContext"
import Paginator from "../generics/Paginator"
import ServiceRequestItem from "./ServiceRequestItem"

const ServiceRequestsList: React.FC<{
    className?: string
}> = (props) => {
    // const {
    //     data,
    //     isLoading,
    //     error,
    //     sendRequest
    // } = useFetch<ServiceRequest[]>()

    // useEffect(() => {
    //     sendRequest("")
    // }, [])

    const {data} = useContext(AuthContext)
    return (
        <div className={`flex flex-col justify-between ${props.className}`}>
            <Link to={`/service-requesters/${data.id}/service-requests/abc-123-false-uuid`} >
                <ServiceRequestItem />
            </Link>            
            <Paginator className="mx-auto gap-3" />
        </div>
    )
}


export default ServiceRequestsList