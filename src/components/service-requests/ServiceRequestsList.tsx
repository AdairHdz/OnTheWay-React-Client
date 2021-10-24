// import { useEffect } from "react"
// import useFetch from "../../hooks/use-fetch"
// import ServiceRequest from "../../models/service-request"

import { Link } from "react-router-dom"
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

    return (
        <div className={`flex flex-col justify-between ${props.className}`}>
            <Link to="/a" >
                <ServiceRequestItem />
            </Link>            
            <Paginator className="mx-auto gap-3" />
        </div>
    )
}


export default ServiceRequestsList