import KindOfService from "../enums/kind-of-service"
import WorkingDay from "../enums/working-day"
import City from "./city"

class PriceRate {
    id = ""
    startingHour = ""
    endingHour = ""
    kindOfService: KindOfService = 0
    price = 0  
    workingDays: WorkingDay[] = []
    city: City = {
        id: "",
        name: "",
    }
}

export default PriceRate