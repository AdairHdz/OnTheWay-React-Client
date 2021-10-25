import { Form, Formik } from "formik"
import SelectInput from "../../generics/SelectInput"
import StandardInput from "../../generics/StandardInput"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import CheckboxInputWithLetter from "../../generics/CheckboxInputWithLetter"
import TimeInput from "../../generics/TimeInput"
import * as Yup from "yup"
import Modal from "../../generics/Modal"
import { useContext } from "react"
import { AuthContext } from "../../../store/AuthContext"
import useFetch from "../../../hooks/use-fetch"
import ErrorMessage from "../../generics/ErrorMessage"
import Spinner from "../../generics/Spinner"

// const parseTime = (time: string): string => {
//     const parsedTime = new Date('1970-01-01T' + time + 'Z')
//         .toLocaleTimeString('en-US',
//             {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
//         );

//         return parsedTime.replaceAll(" ", "")
// }

const NewPriceRateForm: React.FC<{
    submitFormHandler: () => void,
    closeModalHandler: () => void
}> = (props) => {
    const { data } = useContext(AuthContext)
    const {
        error,
        isLoading,
        sendRequest
    } = useFetch()
    return (
        <Modal>
            <div className="flex justify-end items-start mb-5">
                <FontAwesomeIcon icon={faTimes} onClick={props.closeModalHandler} className="cursor-pointer" />
            </div>
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
                    kindOfService: 0,
                    priceRate: "",
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
                        .oneOf([0, 1, 2, 3, 4], "Valor no válido"),
                    priceRate: Yup.number()
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
                    const {
                        city: cityId,
                        startingHour,
                        endingHour,
                        kindOfService,
                        priceRate
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
                        priceRate,
                        workingDays
                    }

                    sendRequest(`http://127.0.0.1:8000/price-rates/${data.id}`, {
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
                        <option value="4e22c768-6e2c-4626-94a9-099b3732f9ac">Xalapa</option>
                    </SelectInput>
                    <SelectInput
                        id="kindOfService"
                        name="kindOfService" >
                        <option disabled value="">Tipo de servicio</option>
                        <option value="0">Pago de servicios</option>
                        <option value="1">Compra de fármacos</option>
                        <option value="2">Compra de víveres</option>
                        <option value="3">Entrega</option>
                        <option value="4">Otro</option>
                    </SelectInput>
                    <StandardInput
                        id="priceRate"
                        name="priceRate"
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
                    {isLoading && <Spinner />}
                    {!isLoading && (
                        <button                            
                            type="submit"
                            className="btn-primary">
                            Registrar
                        </button>
                    )}

                    {error !== undefined && !isLoading && (
                        <ErrorMessage className="text-center" />
                    )}
                </Form>
            </Formik>
        </Modal>
    )
}

export default NewPriceRateForm