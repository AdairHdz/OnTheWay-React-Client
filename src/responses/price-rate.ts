import KindOfService from "../enums/kind-of-service"
import WorkingDay from "../enums/working-day"
import City from "./city"

type PriceRate = {
    id: string,
    startingHour: string,
    endingHour: string,
    kindOfService: KindOfService,
    price: number,
    workingDays: WorkingDay[]
    city: City
}

export default PriceRate