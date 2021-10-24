import StarRate from "../generics/StarRate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useState } from "react"

import ServiceProviderInfoOverview from "../../responses/service-provider-info-overview"
import {AuthContext} from "../../store/AuthContext"

const InfoOVerview = () => {
    const {data} = useContext(AuthContext)

    const [serviceProviderInfoOverview, setServiceProviderInfoOverview] = useState<ServiceProviderInfoOverview>()

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/service-providers/${data.id}`)        
        .then(response => response.json())
        .then((data: ServiceProviderInfoOverview) => setServiceProviderInfoOverview(data))
        .catch(err => console.log(err))
    }, [data.id])
    return (
        <div className="flex flex-col md:flex-row">
            <img
                src="https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=130&w=220"
                alt=""
                className="mr-10 w-full md:w-auto md:mr-0" />
            <div className="flex justify-between w-full">
                <div className="flex flex-grow items-center">
                    <div className="p-5 align text-left">
                        <p className="font-bold text-xl mb-3"> {serviceProviderInfoOverview?.businessName} </p>
                        <p className="text-md mb-5"> {`${serviceProviderInfoOverview?.names} ${serviceProviderInfoOverview?.lastname}`} </p>
                        <StarRate rate={serviceProviderInfoOverview?.averageScore || 0} />
                    </div>
                </div>
                <div className="p-5">
                    <FontAwesomeIcon
                        icon={faEdit}
                        className="text-2xl text-gray-600" />
                </div>
            </div>
        </div>
    )
}

export default InfoOVerview