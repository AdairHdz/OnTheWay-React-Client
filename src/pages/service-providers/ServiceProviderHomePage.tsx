import { useContext, useEffect, useState } from "react"
import NewPriceRateForm from "../../components/service-provider/price-rate/NewPriceRateForm"
import PriceRatesList from "../../components/service-provider/price-rate/PriceRatesList"
import ReviewsList from "../../components/reviews/ReviewsList"
import InfoOVerview from "../../components/service-provider/InfoOverview"
import { AuthContext } from "../../store/AuthContext"
import useFetch from "../../hooks/use-fetch"
import PriceRate from "../../responses/price-rate"
import ServiceProviderInfoOverview from "../../responses/service-provider-info-overview"
import Review from "../../responses/review"
import useFlashMessage from "../../hooks/use-flash-message"
import Alert from "../../components/generics/Alert"

const ServiceProviderHomePage = () => {
    const [showNewPriceRateForm, setShowNewPriceRateForm] = useState(false)    
    const openPriceRateFormModal = () => setShowNewPriceRateForm(true)
    const closePriceRateModal = () => setShowNewPriceRateForm(false)
    const { message, setFlashMessage } = useFlashMessage()
    const { data } = useContext(AuthContext)

    const {
        data: priceRates,
        isLoading: priceRatesRequestIsLoading,
        error: priceRatesFetchingError,
        sendRequest: fetchPriceRates
    } = useFetch<PriceRate[]>()

    const getPriceRates = () => {
        fetchPriceRates(`http://127.0.0.1:8000/providers/${data.id}/priceRates`)
    }

    useEffect(() => {
        fetchPriceRates(`http://127.0.0.1:8000/providers/${data.id}/priceRates`)
    }, [])
    
    const submitFormHandler = (statusCode: number|undefined)  => {
        if(statusCode === 200) {
            setFlashMessage("Tarifa registrada", "Su nueva tarifa ha sido registrada con éxito")
        } else {
            setFlashMessage("Error", "Ha ocurrido un error al intentar registrar su nueva tarifa. Por favor, intente más tarde")
        }
        fetchPriceRates(`http://127.0.0.1:8000/providers/${data.id}/priceRates`)
    }

    const {
        data: userInfo,
        error: userInfoError,
        isLoading: userInfoIsLoading,
        sendRequest: fetchUserInfo
    } = useFetch<ServiceProviderInfoOverview>()

    const getUserInfo = () => {
        fetchUserInfo(`http://127.0.0.1:8000/providers/${data.id}`)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    const {
        data: reviews,
        error: reviewsError,
        isLoading: reviewsIsLoading,
        sendRequest: fetchReviews
    } = useFetch<Review[]>()

    const getReviews = () => {
        fetchReviews(`http://127.0.0.1:8000/providers/${data.id}/reviews?page=1&pageSize=5`)
    }

    useEffect(() => {
        getReviews()
    }, [])
    
    return (
        <>
            <Alert show={message !== undefined} title={message?.title || ""} message={message?.message || ""} />
            <div className="shadow-md bg-white flex-grow-0 mb-5">
                <InfoOVerview 
                    data={userInfo}
                    error={userInfoError}
                    isLoading={userInfoIsLoading}
                    sendRequest={getUserInfo} />
            </div>
            <div className="flex flex-col lg:flex-row gap-5 relative py-5 px-6">
                <div className="shadow-md bg-white flex-grow relative lg:w-1/2 xl:w-5/12 mb-5">
                    <p className="text-2xl font-bold p-5 text-center mt-5">Tarifas</p>
                    <PriceRatesList
                        openModalHandler={openPriceRateFormModal}
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
            </div>
            { showNewPriceRateForm && (
                <NewPriceRateForm                
                submitFormHandler={submitFormHandler}
                closeModalHandler={closePriceRateModal} />
            ) }
        </>

    )
}

export default ServiceProviderHomePage