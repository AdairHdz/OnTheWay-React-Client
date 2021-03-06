import { useContext, useEffect, useState } from "react"
import NewPriceRateForm from "../../components/service-provider/price-rate/NewPriceRateForm"
import PriceRatesList from "../../components/service-provider/price-rate/PriceRatesList"
import ReviewsList from "../../components/reviews/ReviewsList"
import InfoOVerview from "../../components/service-provider/InfoOverview"
import { AuthContext } from "../../store/AuthContext"
import useFetch from "../../hooks/use-fetch"
import PriceRate from "../../responses/price-rate"
import ServiceProviderInfoOverview from "../../responses/service-provider-info-overview"
import useFlashMessage from "../../hooks/use-flash-message"
import Modal from "../../components/generics/Modal"
import PaginatedReview from "../../responses/paginated-review"
import QueryParam from "../../models/query-param"

const ServiceProviderHomePage = () => {
    const [showNewPriceRateForm, setShowNewPriceRateForm] = useState(false)
    const openPriceRateFormModal = () => setShowNewPriceRateForm(true)
    const closePriceRateModal = () => setShowNewPriceRateForm(false)
    const { setFlashMessage } = useFlashMessage()
    const { data: userSessionData, token } = useContext(AuthContext)

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
            fetchPriceRates(`/providers/${userSessionData?.id}/priceRates${finalQueryString}`)
            return
        }
        fetchPriceRates(`/providers/${userSessionData?.id}/priceRates`)
    }

    useEffect(() => {
        fetchPriceRates(`/providers/${userSessionData?.id}/priceRates`)
    }, [token])

    const submitFormHandler = (statusCode: number | undefined) => {
        if(statusCode) {
            switch(statusCode) {
                case 0:
                    setFlashMessage("Conexi??n rechazada", "No pudimos establecer una conexi??n con nuestros servidores. Por favor, intente m??s tarde")
                    break
                case 201:
                    setFlashMessage("Tarifa registrada", "Su nueva tarifa ha sido registrada con ??xito")
                    break
                case 453:
                    setFlashMessage("Tarifa repetida", "Ya cuenta con una tarifa registrada que tenga los datos introducidos")
                    break
                default:
                    setFlashMessage("Error", "Ha ocurrido un error al intentar registrar su nueva tarifa. Por favor, intente m??s tarde")
            }
        }        
        fetchPriceRates(`/providers/${userSessionData?.id}/priceRates`)
        setShowNewPriceRateForm(false)
    }

    const {
        data: userInfo,
        error: userInfoError,
        isLoading: userInfoIsLoading,
        sendRequest: fetchUserInfo,
        responseStatus: userInfoResponseStatus
    } = useFetch<ServiceProviderInfoOverview>()

    const getUserInfo = () => {
        fetchUserInfo(`/providers/${userSessionData?.id}`)
    }

    useEffect(() => {
        getUserInfo()
    }, [token])

    const {
        data: reviews,
        error: reviewsError,
        isLoading: reviewsIsLoading,
        sendRequest: fetchReviews,
        responseStatus: reviewsResponseStatus
    } = useFetch<PaginatedReview>()    

    const getReviews = (url: string) => {
        fetchReviews(`/${url}`)
    }    

    return (
        <>            
            <section className="shadow-md bg-white flex-grow-0 mb-5">
                <InfoOVerview
                    data={userInfo}
                    error={userInfoError}
                    isLoading={userInfoIsLoading}
                    sendRequest={getUserInfo}
                    responseStatus={userInfoResponseStatus} />
            </section>
            <section className="flex flex-col lg:flex-row gap-5 relative py-5 px-6">
                <div className="shadow-md bg-white flex-grow relative lg:w-1/2 xl:w-5/12 mb-5">
                    <p className="text-2xl font-bold p-5 text-center mt-5">Tarifas</p>
                    <PriceRatesList
                        openModalHandler={openPriceRateFormModal}
                        data={priceRates}
                        isLoading={priceRatesRequestIsLoading}
                        error={priceRatesFetchingError}
                        responseStatus={priceRatesResponseStatus}
                        fetchPriceRates={getPriceRates}
                        deletePriceRateHandler={() => {
                            fetchPriceRates(`/providers/${userSessionData?.id}/priceRates`)
                            setFlashMessage("Tarifa eliminada", "Su tarifa ha sido eliminada con ??xito")
                        }} />
                </div>
                <div className="shadow-md bg-white flex-grow mb-5 lg:w-1/2 xl:w-7/12 md:p-5">
                    <p className="text-2xl mb-5 font-bold p-5 text-center">Rese??as</p>
                    <ReviewsList
                        reviews={reviews}
                        error={reviewsError}
                        isLoading={reviewsIsLoading}
                        responseStatus={reviewsResponseStatus}
                        fetchReviews={getReviews} />
                </div>
            </section>
            <Modal closeModalHandler={closePriceRateModal} show={showNewPriceRateForm}>
                <NewPriceRateForm
                    submitFormHandler={submitFormHandler}
                    closeModalHandler={closePriceRateModal} />
            </Modal>
        </>

    )
}

export default ServiceProviderHomePage