import Paginator from "../../generics/Paginator"
import PriceRateItem from "./PriceRateItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import DropdownButton from "../../generics/DropdownButton"
import { useEffect, useState } from "react"
import PriceRateFiltersForm from "./PriceRateFiltersForm"
import PriceRate from "../../../responses/price-rate"
import ErrorMessage from "../../generics/ErrorMessage"
import Spinner from "../../generics/Spinner"
import HTTPRequestError from "../../../models/http-request-error"

const PriceRatesList: React.FC<{
    data: PriceRate[],
    isLoading: boolean,
    error: HTTPRequestError|undefined,
    sendRequest: () => void,
    openModalHandler: () => void
}> = (props) => {
    
    useEffect(() => {
        props.sendRequest()
    }, [])

    const [dropdownIsActive, setDropdownIsActive] = useState(false)
    
    const toggleHandler = () => {
        setDropdownIsActive((prevState => !prevState))
    }

    return (
        <>
            <div className="w-full md:mt-5 md:w-11/12 md:mx-auto px-5 py-5 max-h-screen overflow-y-scroll">
                {!props.error && !props.isLoading && (
                    <DropdownButton
                        isActive={dropdownIsActive}
                        textWhenActive="Ocultar filtros"
                        textWhenInactive="Más filtros"
                        toggleHandler={toggleHandler} />
                )}
                {dropdownIsActive && <PriceRateFiltersForm />}
                {props.error && !props.isLoading && <ErrorMessage />}

                {props.isLoading && <Spinner />}
                {props.data && props.data.map(priceRate => (
                    <PriceRateItem key={priceRate.id}
                        priceRate={priceRate} />
                ))
                }
                {props.data && <Paginator />}
                <div
                    className="bg-yellow-500 text-white rounded-full h-10 w-10 absolute bottom-20 right-10 flex justify-center items-center cursor-pointer"
                    onClick={props.openModalHandler}>
                    <span className="inline-block text-center">
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </div>
            </div>

        </>
    )
}

export default PriceRatesList