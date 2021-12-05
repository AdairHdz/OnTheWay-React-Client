import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import ErrorMessage from "../../components/generics/ErrorMessage"
import Modal from "../../components/generics/Modal"
import Spinner from "../../components/generics/Spinner"
import NewReviewForm from "../../components/reviews/NewReviewForm"
import ServiceRequestStatus from "../../enums/service-request-status"
import useFetch from "../../hooks/use-fetch"
import ServiceRequestWithCity from "../../responses/service-request-with-city"
import { AuthContext } from "../../store/AuthContext"
import { FlashContext } from "../../store/FlashContext"
import getKindOfService from "../../utils/kind-of-service-mapper"
import getServiceRequestStatus from "../../utils/service-request-status-mapper"

const ServiceRequesterRequestDetailsPage = () => {
    const { requestId } = useParams<{
        requestId: string
    }>()

    const { data: authData } = useContext(AuthContext)
    const { setFlashMessage } = useContext(FlashContext)
    const history = useHistory()
    const [newStatus, setNewStatus] = useState<number | undefined>()
    const {
        isLoading,
        error,
        data,
        sendRequest
    } = useFetch<ServiceRequestWithCity>()

    const {
        isLoading: statusChangeIsLoading,
        error: statusChangeError,
        sendRequest: changeStatus,
    } = useFetch()

    const [showReviewForm, setShowReviewForm] = useState(false)

    useEffect(() => {
        if (!statusChangeIsLoading && statusChangeError) {
            const title = "Error"
            const message = "Ha ocurrido un error al procesar su solicitud. Por favor intente más tarde"
            setFlashMessage(title, message)
            history.push("/")
        }

        if (!statusChangeIsLoading && !statusChangeError) {

            if (newStatus === ServiceRequestStatus.CONCLUDED) {
                const title = "Solicitud de servicio concluida"
                const message = "La solicitud de servicio se ha marcado como concluida"
                setFlashMessage(title, message)
                history.push("/")
            }

            if (newStatus === ServiceRequestStatus.CANCELED) {
                const title = "Solicitud de servicio cancelada"
                const message = "La solicitud de servicio se ha marcado como cancelada"
                setFlashMessage(title, message)
                history.push("/")
            }
        }


    }, [statusChangeIsLoading, statusChangeError, history, newStatus])

    useEffect(() => {
        sendRequest(`http://127.0.0.1:8000/requesters/${authData?.id}/requests/${requestId}`)
    }, [])

    const changeRequestStatus = (newStatus: number) => {
        const payload: {
            serviceStatus: number
        } = {
            serviceStatus: newStatus
        }
        changeStatus(`http://127.0.0.1:8000/requests/${requestId}`, {
            method: "PATCH",
            body: JSON.stringify(payload)
        })
    }

    const renderButton = () => {
        switch (data.status) {
            case ServiceRequestStatus.ACTIVE:
                return <button className="btn-primary" onClick={() => {
                    changeRequestStatus(ServiceRequestStatus.CONCLUDED)
                    setNewStatus(ServiceRequestStatus.CONCLUDED)
                }}>Marcar como completado</button>
            case ServiceRequestStatus.CONCLUDED:
                if(data.hasBeenReviewed) {
                    return null    
                }
                return <button className="btn-primary" onClick={() => setShowReviewForm(true)}>Calificar servicio</button>
            case ServiceRequestStatus.PENDING_OF_ACCEPTANCE:
                return <button className="btn-primary-outlined hover:bg-yellow-500 hover:text-white transition-colors ease-linear" onClick={() => {
                    changeRequestStatus(ServiceRequestStatus.CANCELED)
                    setNewStatus(ServiceRequestStatus.CANCELED)
                }}>Cancelar</button>
        }
    }
    return (
        <div className="shadow-md bg-white m-5 p-5 lg:w-2/3 lg:mx-auto">
            {data && (
                <>
                    <p className="font-bold text-lg mb-5">Datos del servicio</p>
                    <div className="text-justify mb-5">
                        <p className="font-bold"> Tipo de servicio </p>
                        <p> {getKindOfService(data.kindOfService!)} </p>
                        <p className="font-bold">Ciudad</p>
                        <p> {data.deliveryAddress!.city!.name} </p>
                        <p className="font-bold">Detalles adicionales</p>
                        <p>
                            {data.description}
                        </p>
                        <p className="font-bold">Costo</p>
                        <p>$ {data.cost} MXN</p>
                        <p className="font-bold">Fecha</p>
                        <p> {data.date} </p>
                        <p className="font-bold">Estado</p>
                        <p> {getServiceRequestStatus(data.status!)} </p>
                    </div>
                    <div className="flex justify-around">
                        {renderButton()}
                    </div>
                </>
            )}
            {error && !isLoading && <ErrorMessage />}
            {isLoading && <Spinner />}
            <Modal show={showReviewForm} closeModalHandler={() => { setShowReviewForm(false) }}>
                <NewReviewForm serviceProviderId={data?.serviceProvider?.id || ""} />
            </Modal>
        </div>
    )
}

export default ServiceRequesterRequestDetailsPage