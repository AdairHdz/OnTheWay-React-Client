import ServiceRequestStatus from "../../enums/service-request-status"
import getKindOfService from "../../utils/kind-of-service-mapper"
import getServiceRequestStatus from "../../utils/service-request-status-mapper"
import ActiveStatus from "../../assets/images/speed.png"
import CanceledStatus from "../../assets/images/canceled.png"
import ConcludedStatus from "../../assets/images/verified.png"
import PendingOfAceptanceStatus from "../../assets/images/pending.png"

const ServiceRequestItem: React.FC<{    
    kindOfService: number,
    date: string,    
    status: number,    
}> = (props) => {

    const renderImage = (serviceRequestStatus: number): string => {
        switch(serviceRequestStatus) {
            case ServiceRequestStatus.ACTIVE:
                return ActiveStatus
            case ServiceRequestStatus.CANCELED:
                return CanceledStatus
            case ServiceRequestStatus.CONCLUDED:
                return ConcludedStatus
            case ServiceRequestStatus.PENDING_OF_ACCEPTANCE:
                return PendingOfAceptanceStatus
            default:
                return ActiveStatus
        }    
    }

    return (
        <div className="rounded-xl bg-blue-500 flex text-white justify-between p-2 text-left gap-3 items-center">
            <figure className="w-12 h-12">
                <img
                    className="rounded-full w-full h-full"
                    src={renderImage(props.status)} alt="" />
            </figure>
            <div className="flex-grow">
                <p className="font-bold text-sm lg:text-lg"> {getKindOfService(props.kindOfService)} </p>
                <div className="flex gap-5">
                    <p className="font-light text-xs lg:text-lg"> {props.date} </p>                    
                </div>
            </div>
            <p className="font-light text-xs lg:text-lg italic self-start"> { getServiceRequestStatus(props.status) } </p>
        </div>
    )
}

export default ServiceRequestItem