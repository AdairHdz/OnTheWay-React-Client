import AddressWithCity from "./address-with-city"
import ServiceProviderInRequest from "./service-provider-in-request"
import ServiceRequesterInRequest from "./service-requester-in-request"

type ServiceRequestWithCity = {
    id: string,
    date: Date,
    cost: number,
    description: string,
    hasBeenReviewed: boolean,
    kindOfService:number|undefined,
    status:number|undefined,
    serviceRequester:ServiceRequesterInRequest|undefined,
    serviceProvider:ServiceProviderInRequest|undefined,
    deliveryAddress:AddressWithCity|undefined,
}

export default ServiceRequestWithCity