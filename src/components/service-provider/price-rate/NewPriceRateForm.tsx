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
        error,
        isLoading,
        sendRequest,
        responseStatus
    } = useFetch()

    const {
        data: cities,
        sendRequest: fetchCities,
    } = useFetch<City[]>()


    useEffect(() => {
        if (responseStatus !== undefined) {
            props.submitFormHandler(responseStatus)
            return
        }

    }, [responseStatus])

    useEffect(() => {
        fetchCities(`/states/${userSessionData?.stateId}/cities`)
    }, [])

    return (
        <>
            <p className="text-center text-lg mb-5">Nueva tarifa</p>
            <Formik
                initialValues={{
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false,
                    city: "",
                    kindOfService: 1,
                    price: 0,
                    startingHour: "",
                    endingHour: ""
                }}
                validationSchema={Yup.object({
                    monday: Yup.boolean()
                        .oneOf([true, false], "Valor no válido"),
                    tuesday: Yup.boolean()
                        .oneOf([true, false], "Valor no válido"),
                    wednesday: Yup.boolean()
                        .oneOf([true, false], "Valor no válido"),
                    thursday: Yup.boolean()
                        .oneOf([true, false], "Valor no válido"),
                    friday: Yup.boolean()
                        .oneOf([true, false], "Valor no válido"),
                    saturday: Yup.boolean()
                        .oneOf([true, false], "Valor no válido"),
                    sunday: Yup.boolean()
                        .oneOf([true, false], "Valor no válido"),
                    city: Yup.string()
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
                    const {
                        city: cityId,
                        startingHour,
                        endingHour,
                        kindOfService,
                        price
                    } = values

                    let workingDays: number[] = []
                    if (values.monday) {
                        workingDays.push(1)
                    }
                    if (values.tuesday) {
                        workingDays.push(2)
                    }
                    if (values.wednesday) {
                        workingDays.push(3)
                    }
                    if (values.thursday) {
                        workingDays.push(4)
                    }
                    if (values.friday) {
                        workingDays.push(5)
                    }
                    if (values.saturday) {
                        workingDays.push(6)
                    }
                    if (values.sunday) {
                        workingDays.push(7)
                    }

                    const requestBody = {
                        cityId,
                        startingHour,
                        endingHour,
                        kindOfService,
                        price,
                        workingDays
                    }

                    sendRequest(`/providers/${userSessionData?.id}/priceRates`, {
                        method: "POST",
                        body: JSON.stringify(requestBody)
                    })
                }}>
                <Form>
                    <div className="mb-5 flex justify-around">
                        <CheckboxInputWithLetter
                            id="monday"
                            name="monday"
                            letter="L" />
                        <CheckboxInputWithLetter
                            id="tuesday"
                            name="tuesday"
                            letter="M" />
                        <CheckboxInputWithLetter
                            id="wednesday"
                            name="wednesday"
                            letter="M" />
                        <CheckboxInputWithLetter
                            id="thursday"
                            name="thursday"
                            letter="J" />
                        <CheckboxInputWithLetter
                            id="friday"
                            name="friday"
                            letter="V" />
                        <CheckboxInputWithLetter
                            id="saturday"
                            name="saturday"
                            letter="S" />
                        <CheckboxInputWithLetter
                            id="sunday"
                            name="sunday"
                            letter="D" />
                    </div>
                    <SelectInput
                        id="city"
                        name="city" >
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
                        disabled={isLoading}
                        className="btn-primary mx-auto">
                        Registrar
                    </button>

                    {error !== undefined && !isLoading && (
                        <ErrorMessage />
                    )}
                </Form>
            </Formik>
        </>
    )
}

export default NewPriceRateForm