import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import ErrorMessage from "../../components/generics/ErrorMessage"
import Spinner from "../../components/generics/Spinner"
import ServiceRequestStatus from "../../enums/service-request-status"
import useFetch from "../../hooks/use-fetch"
import ServiceRequestWithCity from "../../responses/service-request-with-city"
import { AuthContext } from "../../store/AuthContext"
import getKindOfService from "../../utils/kind-of-service-mapper"
import getServiceRequestStatus from "../../utils/service-request-status-mapper"

const ServiceProviderRequestDetailsPage = () => {
    const { requestId } = useParams<{
        requestId: string
    }>()

    const { data: authData } = useContext(AuthContext)

    const {
        isLoading,
        error,
        data,
        sendRequest
    } = useFetch<ServiceRequestWithCity>()

    const {
        sendRequest: changeStatus,        
    } = useFetch()

    useEffect(() => {
        sendRequest(`http://127.0.0.1:8000/providers/${authData.id}/requests/${requestId}`)
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
                        <p>Xalapa</p>
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
                            <button
                                className="btn-primary-outlined hover:bg-yellow-500 hover:text-white transition-colors ease-linear"
                                onClick={ () => changeRequestStatus(ServiceRequestStatus.REJECTED) }>
                                Rechazar
                            </button>
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