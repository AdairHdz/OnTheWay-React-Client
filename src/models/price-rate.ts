import KindOfService from "../enums/kind-of-service"
import WorkingDay from "../enums/working-day"

class PriceRate {
    workingDays: WorkingDay[]
    city: string
    schedule: string
    kindOfService: KindOfService


    constructor(
        workingDays: WorkingDay[],
        city: string,
        schedule: string,
        kindOfService: KindOfService) {
        this.workingDays = workingDays
        this.city = city
        this.schedule = schedule
        this.kindOfService = kindOfService
    }
}

export default PriceRate