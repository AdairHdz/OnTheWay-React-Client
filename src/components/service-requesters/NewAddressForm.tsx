import { Form, Formik } from "formik"
import Modal from "../generics/Modal"
import * as Yup from "yup"
import StandardInput from "../generics/StandardInput"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../store/AuthContext"
import useFetch from "../../hooks/use-fetch"
import City from "../../responses/city"
import SelectInput from "../generics/SelectInput"

const NewAddressForm: React.FC<{
    submitFormHandler: (statusCode: number|undefined) => void,
    closeModalHandler: () => void
}> = (props) => {

    const {data} = useContext(AuthContext)    
    const {
        data: cities,
        sendRequest: fetchCities
    } = useFetch<City[]>()

    useEffect(() => {
        fetchCities(`http://127.0.0.1:8000/states/${data.stateId}/cities`)
    }, [])

    const {
        sendRequest: registerAddress,
        responseStatus,
        error: addressRegistrationError
    } = useFetch()

    useEffect(() => {
        if(responseStatus === undefined && addressRegistrationError === undefined) {
            return
        }        
        props.submitFormHandler(responseStatus)
        return

    }, [responseStatus, addressRegistrationError])

    return (
        <>
            <p className="font-bold text-lg text-center mb-8">Añadir dirección</p>
            <Formik
                initialValues={{
                    indoorNumber: null,
                    outdoorNumber: "",
                    street: "",
                    suburb: "",
                    cityId: ""
                }}
                validationSchema={Yup.object({
                    outdoorNumber: Yup.string()
                        .required("Campo obligatorio"),
                    indoorNumber: Yup.string()
                        .nullable(),
                    street: Yup.string()
                        .required("Campo obligatorio"),
                    suburb: Yup.string()
                        .optional(),
                    cityId: Yup.string()
                        .required("Campo obligatorio")
                        .uuid("Por favor seleccione una ciudad")

                })}
                onSubmit={(values) => {                    
                    registerAddress(`http://127.0.0.1:8000/requesters/${data.id}/addresses`, {
                        method: "POST",
                        body: JSON.stringify(values)
                    })                    
                }}>
                <Form>
                    <StandardInput id="indoorNumber" name="indoorNumber" type="text" label="Número interior" />
                    <StandardInput id="outdoorNumber" name="outdoorNumber" type="text" label="Número exterior" />
                    <StandardInput id="street" name="street" type="text" label="Calle" />
                    <StandardInput id="suburb" name="suburb" type="text" label="Colonia" />
                    <SelectInput id="cityId" name="cityId" label="Ciudad">
                        <option>Seleccione una ciudad</option>
                        {cities && cities.map((city) => (
                            <option value={city.id} key={city.id}> {city.name} </option>
                        ))}
                    </SelectInput>
                    <button className="btn-primary mx-auto" type="submit">Añadir</button>
                </Form>
            </Formik>
        </>
    )
}

export default NewAddressForm