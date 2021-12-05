import { faMotorcycle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import ReviewsList from "../../components/reviews/ReviewsList"
import InfoOVerview from "../../components/service-provider/InfoOverview"
import PriceRatesList from "../../components/service-provider/price-rate/PriceRatesList"
import useFetch from "../../hooks/use-fetch"
import PriceRate from "../../responses/price-rate"
import PaginatedReview from "../../responses/paginated-review"
import ServiceProviderInfoOverview from "../../responses/service-provider-info-overview"
import QueryParam from "../../models/query-param"

const ServiceProviderDetailsPage = () => {
    const history = useHistory()
    const { providerId } = useParams<{
        providerId: string
    }>()

    const {
        data: userInfo,
        error: userInfoError,
        isLoading: userInfoIsLoading,
        sendRequest: fetchUserInfo
    } = useFetch<ServiceProviderInfoOverview>()

    const getUserInfo = () => {
        fetchUserInfo(`http://127.0.0.1:8000/providers/${providerId}`)
    }

    useEffect(() => {
        getUserInfo()
    }, [])


    const {
        data: priceRates,
        isLoading: priceRatesRequestIsLoading,
        error: priceRatesFetchingError,
        sendRequest: fetchPriceRates,
        responseStatus: priceRatesResponseStatus
    } = useFetch<PriceRate[]>()

    const getPriceRates = (params: QueryParam[]) => {
        if(params.length !== 0) {
            let finalQueryString = '?'            
            
            params.forEach((param, index) => {
                finalQueryString += `${param.key}=${param.value}`
                if(params.length - index  > 1) {
                    finalQueryString += '&'
                }
            })            
            fetchPriceRates(`http://127.0.0.1:8000/providers/${providerId}/priceRates${finalQueryString}`)
            return
        }
        fetchPriceRates(`http://127.0.0.1:8000/providers/${providerId}/priceRates`)
    }

    useEffect(() => {
        fetchPriceRates(`http://127.0.0.1:8000/providers/${providerId}/priceRates`)
    }, [])

    const {
        data: reviews,
        error: reviewsError,
        isLoading: reviewsIsLoading,
        sendRequest: fetchReviews,
        responseStatus: reviewsStatus
    } = useFetch<PaginatedReview>()

    const getReviews = () => {
        fetchReviews(`http://127.0.0.1:8000/providers/${providerId}/reviews?page=1&pageSize=10`)
    }

    useEffect(() => {
        getReviews()
    }, [])
    

    return (
        <>
            <div className="shadow-md bg-white flex-grow-0 mb-5">
                <InfoOVerview
                    data={userInfo}
                    error={userInfoError}
                    isLoading={userInfoIsLoading}
                    sendRequest={getUserInfo} />
            </div>
            <div className="flex flex-col lg:flex-row gap-5 py-5 px-6">
                <div className="shadow-md bg-white flex-grow relative lg:w-1/2 xl:w-5/12 mb-5">
                    <p className="text-2xl font-bold p-5 text-center mt-5">Tarifas</p>
                    <PriceRatesList
                        data={priceRates}
                        isLoading={priceRatesRequestIsLoading}
                        error={priceRatesFetchingError}
                        responseStatus={priceRatesResponseStatus}
                        fetchPriceRates={getPriceRates} />
                </div>
                <div className="shadow-md bg-white flex-grow mb-5 lg:w-1/2 xl:w-7/12 md:p-5">
                    <p className="text-2xl mb-5 font-bold p-5 text-center">Reseñas</p>
                    <ReviewsList
                        reviews={reviews}
                        error={reviewsError}
                        isLoading={reviewsIsLoading}
                        responseStatus={reviewsStatus}
                        fetchReviews={getReviews} />
                </div>                
            </div>
        </>

    )
}

export default ServiceProviderDetailsPage