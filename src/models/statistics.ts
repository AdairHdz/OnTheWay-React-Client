import RequestedServicesPerKindOfService from "./requested-services-per-kind-of-service";
import RequestedServicesPerWeekday from "./requested-services-per-weekday";

type Statistics = {
    requestedServicesPerKindOfService: RequestedServicesPerKindOfService[]
    requestedServicesPerWeekday: RequestedServicesPerWeekday[]
}

export default Statistics