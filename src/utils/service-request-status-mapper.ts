import ServiceRequestStatus from "../enums/service-request-status"

const getServiceRequestStatus = (serviceRequestNumber: number): string => {
    let serviceRequestName
    switch(serviceRequestNumber){
        case ServiceRequestStatus.ACTIVE:
            serviceRequestName = "Activo"
            break
            case ServiceRequestStatus.CANCELED:
                serviceRequestName = "Cancelado"
                break
            case ServiceRequestStatus.CONCLUDED:
                serviceRequestName = "Concluido"
                break
            case ServiceRequestStatus.PENDING_OF_ACCEPTANCE:
                serviceRequestName = "Pendiente de aceptación"
                break
            case ServiceRequestStatus.REJECTED:
                serviceRequestName = "Rechazado"
                break
            default:
                serviceRequestName = "Desconocido"
    }    

    return serviceRequestName
}

export default getServiceRequestStatus