import KindOfService from "../../../enums/kind-of-service"
import PriceRate from "../../../responses/price-rate"
import WorkingDayBadge from "./workingDayBadge"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import useFetch from "../../../hooks/use-fetch"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../../store/AuthContext"
import Spinner from "../../generics/Spinner"
import useFlashMessage from "../../../hooks/use-flash-message"

const PriceRateItem: React.FC<{
    priceRate: PriceRate,
    deletePriceRateHandler?: () => void
}> = (props) => {

    const {
        sendRequest,
        error,
        isLoading,
        responseStatus
    } = useFetch()
    let kindOfService: string

    const { data } = useContext(AuthContext)
    const {setFlashMessage, message} = useFlashMessage()

    switch (props.priceRate.kindOfService) {
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

    const deletePriceRate = () => {        
        sendRequest(`http://127.0.0.1:8000/providers/${data.id}/priceRates/${props.priceRate.id}`, {
            method: "DELETE"
        })        
    }

    useEffect(() => {
        if(responseStatus === 204) {
            if(props.deletePriceRateHandler) {
                props.deletePriceRateHandler()
            }            
            return
        }

        if(error) {
            setFlashMessage("Error", "No hemos podido eliminar su tarifa. Por favor, intente más tarde")
        }
    }, [responseStatus, error])

    return (
        <div className="shadow-md rounded-lg p-5 text-gray-800 mb-5 text-left">            
            <div className="flex justify-between">
                <div className="flex gap-2">
                    {props.priceRate.workingDays.map(workingDay => <WorkingDayBadge key={workingDay} workingDay={workingDay} />)}
                </div>
                {isLoading && <Spinner /> }
                {!isLoading  && <FontAwesomeIcon icon={faTimes} className="cursor-pointer" onClick={deletePriceRate} /> }
            </div>
            <p className="text-lg font-bold"> {props.priceRate.city.name} </p>
            <p className="font-bold"> {props.priceRate.startingHour} - {props.priceRate.endingHour} </p>
            <div className="flex gap-5">
                <p className="font-thin"> {kindOfService} </p>
                <p className="underline"> ${props.priceRate.price} MXN </p>
            </div>
        </div>
    )
}

export default PriceRateItem