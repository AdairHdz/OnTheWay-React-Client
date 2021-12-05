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
        sendRequest(`http://127.0.0.1:8000/providers/${authData?.id}/requests/${requestId}`)
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
                        {data.status === ServiceRequestStatus.PENDING_OF_ACCEPTANCE ? (
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
            {error && !isLoading && <ErrorMessage />}
            {isLoading && <Spinner />}
        </div>
    )
}

export default ServiceProviderRequestDetailsPage