import { Form, Formik } from "formik"
import SelectInput from "../../generics/SelectInput"
import StandardInput from "../../generics/StandardInput"
import CheckboxInputWithLetter from "../../generics/CheckboxInputWithLetter"
import TimeInput from "../../generics/TimeInput"
import * as Yup from "yup"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../../store/AuthContext"
import useFetch from "../../../hooks/use-fetch"
import ErrorMessage from "../../generics/ErrorMessage"
import City from "../../../responses/city"
import KindOfService from "../../../enums/kind-of-service"

const NewPriceRateForm: React.FC<{
    submitFormHandler: (statusCode: number | undefined) => void,
    closeModalHandler: () => void
}> = (props) => {
    const { data: userSessionData } = useContext(AuthContext)
    const {
        error: priceRateSavingError,
        isLoading: priceRateSavingIsLoading,
        sendRequest: savePriceRate,
        responseStatus: priceRateSavingStatus
    } = useFetch()

    const {
        data: cities,
        sendRequest: fetchCities,
    } = useFetch<City[]>()


    useEffect(() => {
        if (priceRateSavingStatus !== undefined) {
            props.submitFormHandler(priceRateSavingStatus)
            return
        }

    }, [priceRateSavingStatus])

    useEffect(() => {
        fetchCities(`/states/${userSessionData?.stateId}/cities`)
    }, [])

    return (
        <>
            <p className="text-center text-lg mb-5">Nueva tarifa</p>
            <Formik                
                initialValues={{
                    workingDays: [],
                    cityId: "",
                    kindOfService: 1,
                    price: 0,
                    startingHour: "",
                    endingHour: ""
                }}                
                validationSchema={Yup.object({
                    workingDays: Yup.array()
                        .min(1)
                        .max(7)
                        .required(),
                    cityId: Yup.string()
                        .required("Por favor seleccione una ciudad")
                        .uuid("Valor no válido"),
                    kindOfService: Yup.number()
                        .required("Por favor seleccione un tipo de servicio")
                        .oneOf([1, 2, 3, 4, 5], "Valor no válido"),
                    price: Yup.number()
                        .required("Por favor fije una tarifa")
                        .min(1, "Por favor fije una tarifa mayor a $0")
                        .max(100, "Lo sentimos; las tarifas mayores a $100 no están permitidas"),
                    startingHour: Yup.string()
                        .required("Por favor seleccione una hora de inicio"),
                    endingHour: Yup.string()
                        .required("Por favor seleccione una hora de inicio"),
                })}
                onSubmit={(values) => {
                    values.kindOfService = +values.kindOfService
                    values.price = +values.price
                    const workingDaysParsedToNumberType = values.workingDays.map((workingDay) => +workingDay)

                    const requestBody = {
                        cityId: values.cityId,
                        kindOfService: values.kindOfService,
                        price: values.price,
                        startingHour: values.startingHour,
                        endingHour: values.endingHour,
                        workingDays: workingDaysParsedToNumberType
                    }                    
                    
                    savePriceRate(`/providers/${userSessionData?.id}/priceRates`, {
                        method: "POST",
                        body: JSON.stringify(requestBody)
                    })
                }}>
                <Form>
                    <div className="mb-5 flex justify-around">
                        <CheckboxInputWithLetter
                            id="monday"
                            name="workingDays"
                            letter="L"
                            value={1} />
                        <CheckboxInputWithLetter
                            id="tuesday"
                            name="workingDays"
                            letter="M"
                            value={2} />
                        <CheckboxInputWithLetter
                            id="wednesday"
                            name="workingDays"
                            letter="M"
                            value={3} />
                        <CheckboxInputWithLetter
                            id="thursday"
                            name="workingDays"
                            letter="J"
                            value={4} />
                        <CheckboxInputWithLetter
                            id="friday"
                            name="workingDays"
                            letter="V"
                            value={5} />
                        <CheckboxInputWithLetter
                            id="saturday"
                            name="workingDays"
                            letter="S"
                            value={6} />
                        <CheckboxInputWithLetter
                            id="sunday"
                            name="workingDays"
                            letter="D"
                            value={7} />
                    </div>
                    <SelectInput
                        id="cityId"
                        name="cityId" >
                        <option disabled value="">Ciudad</option>
                        {cities && cities.map((city) => (
                            <option value={city.id} key={city.id}> {city.name} </option>
                        ))}

                    </SelectInput>
                    <SelectInput
                        id="kindOfService"
                        name="kindOfService" >
                        <option disabled value="">Tipo de servicio</option>
                        <option value={KindOfService.SERVICE_PAYMENT}>Pago de servicios</option>
                        <option value={KindOfService.DRUG_SHOPPING}>Compra de fármacos</option>
                        <option value={KindOfService.GROCERY_SHOPPING}>Compra de víveres</option>
                        <option value={KindOfService.DELIVERY}>Entrega</option>
                        <option value={KindOfService.OTHER}>Otro</option>
                    </SelectInput>
                    <StandardInput
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Tarifa" />
                    <div className="flex justify-between p-5 mb-5">
                        <div className="w-1/2">
                            <TimeInput
                                id="startingHour"
                                name="startingHour"
                                label="Desde"
                                className="block w-3/4 mx-auto" />
                        </div>
                        <div className="w-1/2">
                            <TimeInput
                                id="endingHour"
                                name="endingHour"
                                label="Hasta"
                                className="block w-3/4 mx-auto" />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={priceRateSavingIsLoading}
                        className="btn-primary mx-auto">
                        Registrar
                    </button>

                    {priceRateSavingError !== undefined && !priceRateSavingIsLoading && (
                        <ErrorMessage />
                    )}
                </Form>
            </Formik>
        </>
    )
}

export default NewPriceRateForm