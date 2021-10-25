import KindOfService from "../../../enums/kind-of-service"
import PriceRate from "../../../responses/price-rate"
import WorkingDayBadge from "./workingDayBadge"

const PriceRateItem: React.FC<{
    priceRate: PriceRate
}> = (props) => {

    let kindOfService: string

    switch(props.priceRate.kindOfService) {
        case KindOfService.DELIVERY:
            kindOfService = "Entrega"
            break;
        case KindOfService.DRUG_SHOPPING:
            kindOfService = "Compra de fármacos"
            break
        case KindOfService.GROCERY_SHOPPING:
            kindOfService = "Compra de víveres"
            break;
        case KindOfService.OTHER:
            kindOfService = "Otro"
            break
        case KindOfService.SERVICE_PAYMENT:
            kindOfService = "Pago de servicios"
            break
        default:
            kindOfService = "Desconocido"
            break;
    }

    return (
        <div className="shadow-md rounded-lg p-5 text-gray-800 mb-5 text-left">
            <div className="flex gap-2">
                {props.priceRate.workingDays.map(workingDay => <WorkingDayBadge key={workingDay} workingDay={workingDay} />)}
            </div>            
            <p className="text-lg font-bold"> {props.priceRate.city.name} </p>
            <p className="font-bold"> {props.priceRate.startingHour} - {props.priceRate.endingHour} </p>
            <p className="font-thin"> {kindOfService} </p>
        </div>
    )
}

export default PriceRateItem