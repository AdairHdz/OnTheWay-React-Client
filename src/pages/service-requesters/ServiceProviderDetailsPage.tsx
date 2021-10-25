import { faMotorcycle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import ReviewsList from "../../components/reviews/ReviewsList"
import InfoOVerview from "../../components/service-provider/InfoOverview"
import PriceRatesList from "../../components/service-provider/price-rate/PriceRatesList"
import useFetch from "../../hooks/use-fetch"
import PriceRate from "../../responses/price-rate"
import Review from "../../responses/review"
import ServiceProviderInfoOverview from "../../responses/service-provider-info-overview"

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
        fetchUserInfo(`http://127.0.0.1:8000/service-providers/${providerId}`)
    }

    useEffect(() => {
        getUserInfo()
    }, [])


    const {
        data: priceRates,
        isLoading: priceRatesRequestIsLoading,
        error: priceRatesFetchingError,
        sendRequest: fetchPriceRates
    } = useFetch<PriceRate[]>()

    const getPriceRates = () => {
        fetchPriceRates(`http://127.0.0.1:8000/price-rates/${providerId}`)
    }

    useEffect(() => {
        getPriceRates()
    }, [])

    const {
        data: reviews,
        error: reviewsError,
        isLoading: reviewsIsLoading,
        sendRequest: fetchReviews
    } = useFetch<Review[]>()

    const getReviews = () => {
        fetchReviews(`http://127.0.0.1:8000/reviews/${providerId}?page=1&pageElements=5`)
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
                        sendRequest={getPriceRates} />
                </div>
                <div className="shadow-md bg-white flex-grow mb-5 lg:w-1/2 xl:w-7/12 md:p-5">
                    <p className="text-2xl mb-5 font-bold p-5 text-center">Reseñas</p>
                    <ReviewsList
                        data={reviews}
                        error={reviewsError}
                        isLoading={reviewsIsLoading}
                        sendRequest={getReviews} />
                </div>
                <button
                    className="bg-yellow-500 text-white rounded-full h-10 w-10 lg:w-16 lg:h-16 absolute bottom-20 right-10 lg:right-20 flex justify-center items-center cursor-pointer"
                    onClick={() => {
                        history.push(`/service-providers/${providerId}/service-request`)
                    }}>
                    <span className="inline-block text-center">
                        <FontAwesomeIcon icon={faMotorcycle} className="lg:text-lg"/>
                    </span>
                </button>
            </div>
        </>

    )
}

export default ServiceProviderDetailsPage