import StarRate from "../generics/StarRate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect } from "react"

import ServiceProviderInfoOverview from "../../responses/service-provider-info-overview"
import { AuthContext } from "../../store/AuthContext"
import useFetch from "../../hooks/use-fetch"
import Spinner from "../generics/Spinner"
import ErrorMessage from "../generics/ErrorMessage"

const InfoOVerview = () => {
    const { data } = useContext(AuthContext)
    const {
        data: userInfo,
        error: userInfoError,
        isLoading: userInfoIsLoading,
        sendRequest: fetchUserInfo
    } = useFetch<ServiceProviderInfoOverview>()
    

    useEffect(() => {                
        fetchUserInfo(`http://127.0.0.1:8000/service-providers/${data.id}`)
    }, [])
    return (
        <div className="flex flex-col md:flex-row">            
            <img
                src={userInfo?.businessPicture.includes(".") ? `http://127.0.0.1:8000/images/${userInfo.businessPicture}` : "https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=130&w=220"}
                alt=""
                className="mr-10 w-full md:w-1/2 md:mr-0" />
            <div className="flex justify-between w-full">
                {userInfoError && !userInfoIsLoading && (
                    <ErrorMessage />
                )}
                {userInfoIsLoading && <Spinner />}
                {userInfo && (
                    <>                    
                        <div className="flex flex-grow items-center">
                            <div className="p-5 align text-left">
                                <p className="font-bold text-xl mb-3"> {userInfo?.businessName} </p>
                                <p className="text-md mb-5"> {`${userInfo?.names} ${userInfo?.lastname}`} </p>
                                <StarRate rate={userInfo?.averageScore || 0} />
                            </div>
                        </div>
                        <div className="p-5">
                            <FontAwesomeIcon
                                icon={faEdit}
                                className="text-2xl text-gray-600" />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default InfoOVerview