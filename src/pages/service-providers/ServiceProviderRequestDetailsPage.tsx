import { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import ErrorMessage from "../../components/generics/ErrorMessage"
import Spinner from "../../components/generics/Spinner"
import ServiceRequestStatus from "../../enums/service-request-status"
import useFetch from "../../hooks/use-fetch"
import ServiceRequestWithCity from "../../responses/service-request-with-city"
import { AuthContext } from "../../store/AuthContext"
import { FlashContext } from "../../store/FlashContext"
import getKindOfService from "../../utils/kind-of-service-mapper"
import getServiceRequestStatus from "../../utils/service-request-status-mapper"

const ServiceProviderRequestDetailsPage = () => {
    const { requestId } = useParams<{
        requestId: string
    }>()

    const { data: userSessionData } = useContext(AuthContext)
    const { setFlashMessage } = useContext(FlashContext)
    const history = useHistory()
    const [newStatus, setNewStatus] = useState<number | undefined>()
    const {
        isLoading: serviceRequestIsLoading,
        error: serviceRequestError,
        data: serviceRequestResponse,
        sendRequest: fetchServiceRequestWithCity
    } = useFetch<ServiceRequestWithCity>()

    const {
        isLoading: statusChangeIsLoading,
        error: statusChangeError,
        sendRequest: changeStatus,
    } = useFetch()

    useEffect(() => {
        if (!statusChangeIsLoading && statusChangeError) {
            const title = "Error"
            const message = "Ha ocurrido un error al procesar su solicitud. Por favor intente más tarde"
            setFlashMessage(title, message)
            history.push("/services")
        }

        if (!statusChangeIsLoading && !statusChangeError) {
            if (newStatus === ServiceRequestStatus.REJECTED) {
                const title = "Solicitud de servicio rechazada"
                const message = "La solicitud de servicio se ha marcado como rechazada"
                setFlashMessage(title, message)
                history.push("/services")
            }
            if (newStatus === ServiceRequestStatus.ACTIVE) {
                const title = "Solicitud de servicio aceptada"
                const message = "Ha aceptado realizar esta solicitud de servicio"
                setFlashMessage(title, message)
                history.push("/services")
            }
        }


    }, [statusChangeIsLoading, statusChangeError, history, newStatus, setFlashMessage])

    useEffect(() => {
        fetchServiceRequestWithCity(`/providers/${userSessionData?.id}/requests/${requestId}`)
    }, [])

    const changeRequestStatus = (newStatus: number) => {
        const payload: {
            serviceStatus: number
        } = {
            serviceStatus: newStatus
        }
        changeStatus(`/requests/${requestId}`, {
            method: "PATCH",
            body: JSON.stringify(payload)
        })
    }

    return (
        <div className="shadow-md bg-white m-5 p-5 lg:w-2/3 lg:mx-auto">
            {serviceRequestResponse && (
                <>
                    <p className="font-bold text-lg mb-5">Datos del servicio</p>
                    <div className="text-justify mb-5">
                        <p className="font-bold"> Tipo de servicio </p>
                        <p> {getKindOfService(serviceRequestResponse.kindOfService!)} </p>
                        <p className="font-bold">Ciudad</p>
                        <p> {serviceRequestResponse.deliveryAddress!.city!.name} </p>
                        <p className="font-bold">Detalles adicionales</p>
                        <p>
                            {serviceRequestResponse.description}
                        </p>
                        <p className="font-bold">Costo</p>
                        <p>$ {serviceRequestResponse.cost} MXN</p>
                        <p className="font-bold">Fecha</p>
                        <p> {serviceRequestResponse.date} </p>
                        <p className="font-bold">Estado</p>
                        <p> {getServiceRequestStatus(serviceRequestResponse.status!)} </p>
                    </div>
                    <div className="flex justify-around">
                        {serviceRequestResponse.status === ServiceRequestStatus.PENDING_OF_ACCEPTANCE ? (
                            <>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        changeRequestStatus(ServiceRequestStatus.ACTIVE)
                                        setNewStatus(ServiceRequestStatus.ACTIVE)
                                    }}>
                                    Aceptar
                                </button>
                                <button
                                    className="btn-primary-outlined hover:bg-yellow-500 hover:text-white transition-colors ease-linear"
                                    onClick={() => {
                                        changeRequestStatus(ServiceRequestStatus.REJECTED)
                                        setNewStatus(ServiceRequestStatus.REJECTED)
                                    }}>
                                    Rechazar
                                </button>
                            </>
                        ) : null}
                    </div>
                </>
            )}
            {serviceRequestError && !serviceRequestIsLoading && <ErrorMessage />}
            {serviceRequestIsLoading && <Spinner />}
        </div>
    )
}

export default ServiceProviderRequestDetailsPage