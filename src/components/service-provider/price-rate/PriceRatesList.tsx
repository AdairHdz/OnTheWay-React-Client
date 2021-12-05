import Paginator from "../../generics/Paginator"
import PriceRateItem from "./PriceRateItem"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faMotorcycle } from "@fortawesome/free-solid-svg-icons"
import DropdownButton from "../../generics/DropdownButton"
import { useContext, useEffect, useState } from "react"
import PriceRateFiltersForm from "./PriceRateFiltersForm"
import PriceRate from "../../../responses/price-rate"
import ErrorMessage from "../../generics/ErrorMessage"
import Spinner from "../../generics/Spinner"
import HTTPRequestError from "../../../models/http-request-error"
import { AuthContext } from "../../../store/AuthContext"
import UserType from "../../../enums/user-type"
import Alert from "../../generics/Alert"
import useFlashMessage from "../../../hooks/use-flash-message"
import QueryParam from "../../../models/query-param"

const PriceRatesList: React.FC<{
    data: PriceRate[],
    isLoading: boolean,
    error: HTTPRequestError | undefined,
    fetchPriceRates: (params: QueryParam[]) => void,
    responseStatus: number | undefined
    openModalHandler?: () => void,
    deletePriceRateHandler?: () => void
}> = (props) => {

    const { data } = useContext(AuthContext)

    const [dropdownIsActive, setDropdownIsActive] = useState(false)
    const {message} = useFlashMessage()
    
    const toggleHandler = () => {
        setDropdownIsActive((prevState => !prevState))
    }

    const renderPriceRatesError = () => {
        if (props.error && !props.isLoading) {
            if (props.responseStatus && props.responseStatus === 404) {
                return (
                    <ErrorMessage errorTitle="Sin resultados"
                        errorMessage="Parece ser que aún no hay tarifas registradas" />
                )
            }
            return <ErrorMessage />
        }

        return null
    }

    return (
        <>
            <Alert show={message !== undefined} title={message?.title || ""} message={message?.message || ""} />
            <div className="w-full md:mt-5 md:w-11/12 md:mx-auto px-5 py-5 max-h-screen overflow-y-auto">
                {!props.error && !props.isLoading && (
                    <DropdownButton
                        isActive={dropdownIsActive}
                        textWhenActive="Ocultar filtros"
                        textWhenInactive="Más filtros"
                        toggleHandler={toggleHandler} />
                )}
                {dropdownIsActive && <PriceRateFiltersForm
                    changeHandler={ props.fetchPriceRates } />}
                {renderPriceRatesError()}

                {props.isLoading && <Spinner />}
                {props.data && props.data.map(priceRate => (
                    <PriceRateItem key={priceRate.id}
                        deletePriceRateHandler={props.deletePriceRateHandler}
                        priceRate={priceRate} />
                ))
                }
                {/* {props.data && <Paginator />} */}
                {data?.userType === UserType.SERVICE_PROVIDER ? (
                    <div
                        className="bg-yellow-500 text-white rounded-full h-10 w-10 absolute bottom-20 right-10 flex justify-center items-center cursor-pointer"
                        onClick={props.openModalHandler}>
                        <span className="inline-block text-center">
                            <FontAwesomeIcon icon={faPlus} />
                        </span>
                    </div>
                ) : null}
                {(data?.userType === UserType.SERVICE_REQUESTER) && props.openModalHandler ? (
                    <div
                        className="bg-yellow-500 text-white rounded-full h-10 w-10 absolute bottom-20 right-10 flex justify-center items-center cursor-pointer"
                        onClick={() => { }}>
                        <span className="inline-block text-center">
                            <FontAwesomeIcon icon={faMotorcycle} />
                        </span>
                    </div>
                ) : null}
            </div>

        </>
    )
}

export default PriceRatesList