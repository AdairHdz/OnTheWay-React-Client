import AddressWithCity from "./address-with-city"
import ServiceProviderInRequest from "./service-provider-in-request"
import ServiceRequesterInRequest from "./service-requester-in-request"

class ServiceRequestWithCity {
    id = ""
    date = Date()
    cost = 0
    description = ""
    hasBeenReviewed = false
    kindOfService:number|undefined = undefined
    status:number|undefined = undefined
    serviceRequester:ServiceRequesterInRequest|undefined = undefined
    serviceProvider:ServiceProviderInRequest|undefined = undefined
    deliveryAddress:AddressWithCity|undefined = undefined
}

export default ServiceRequestWithCity