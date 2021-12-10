import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, Formik } from "formik"
import useFetch from "../../hooks/use-fetch"
import SelectInput from "../generics/SelectInput"
import * as Yup from "yup"
import NewAddressForm from "../service-requesters/NewAddressForm"
import { useContext, useEffect, useState } from "react"
import Address from "../../responses/address"
import { AuthContext } from "../../store/AuthContext"
import City from "../../responses/city"
import { useHistory, useParams } from "react-router-dom"
import ErrorMessage from "../generics/ErrorMessage"
import Spinner from "../generics/Spinner"
import useFlashMessage from "../../hooks/use-flash-message"
import Alert from "../generics/Alert"
import KindOfService from "../../enums/kind-of-service"
import Modal from "../generics/Modal"
import TextArea from "../generics/TextArea"

const NewServiceRequestForm: React.FC<{}> = (props) => {
    const { providerId } = useParams<{
        providerId: string
    }>()
    const history = useHistory()
    const { message, setFlashMessage } = useFlashMessage()

    const submitFormHandler = (statusCode: number | undefined) => {
        if (statusCode === 200) {
            getAddresses()
            setFlashMessage("Dirección registrada", "La nueva dirección se ha registrado correctamente")
        } else {
            setFlashMessage("Error", "No hemos podido registrar su nueva dirección. Por favor, intente más tarde")
        }
        setShowModal(false)
    }

    const {
        data: addresses,
        sendRequest: fetchAddresses
    } = useFetch<Address[]>()

    const {
        data: cities,
        sendRequest: fetchCities
    } = useFetch<City[]>()

    const {
        data: priceRate,
        sendRequest: fetchPriceRate,
        isLoading: priceRateFetchingIsLoading,
        error: priceRateFetchingError,
        responseStatus: priceRateFetchingStatus
    } = useFetch<{
        price: number
    }>()

    const {
        sendRequest: sendServiceRequest,
        isLoading: serviceRequestIsLoading,
        error: serviceRequestError,
        responseStatus: serviceRequestResponseStatus
    } = useFetch<any>()

    const { data } = useContext(AuthContext)

    useEffect(() => {
        fetchCities(`/states/${data?.stateId}/cities`)
    }, [data?.stateId])

    const [showModal, setShowModal] = useState(false)
    const [selectedCity, setSelectedCity] = useState<string>("")
    const [selectedKindOfService, setSelectedKindOfService] = useState<string>("")

    const renderServiceRequestError = () => {
        if(priceRateFetchingError && !priceRateFetchingIsLoading) {            
            if(priceRateFetchingStatus === 404) {                  
                return <ErrorMessage errorTitle="Sin resultados"
                    errorMessage={"Este proveedor de servicios no cuenta con una tarifa activa para " +
                        "los criterios proporcionados."} className="mb-5" />
            }
            return <ErrorMessage errorMessage={serviceRequestError?.message} className="mb-5" />
        }
        return null
    }

    const getAddresses = () => {
        fetchAddresses(`/requesters/${data?.id}/addresses?cityId=${selectedCity}`)
    }


    useEffect(() => {
        if (serviceRequestResponseStatus === undefined) {
            return
        }

        if (serviceRequestResponseStatus === 200) {
            setFlashMessage("Solicitud de servicio enviada", "Su solicitud de servicio ha sido enviada de forma exitosa")
            history.push("/")
            return
        }
        setFlashMessage("Error", "No hemos podido enviar su solicitud de servicio. Por favor, intente más tarde")
        history.push("/")
    }, [serviceRequestResponseStatus, history])

    useEffect(() => {
        fetchAddresses(`/requesters/${data?.id}/addresses?cityId=${selectedCity}`)
    }, [selectedCity, data?.id])

    useEffect(() => {
        if (selectedKindOfService && selectedCity) {
            fetchPriceRate(`/providers/${providerId}/priceRates/${selectedCity}?kindOfService=${selectedKindOfService}`)
        }
    }, [selectedCity, selectedKindOfService])

    return (
        <>
            <Alert show={message !== undefined} title={message?.title || ""} message={message?.message || ""} />
            <div className="shadow-md bg-white flex-grow-0 mb-5 p-10 lg:w-2/3 lg:mx-auto">
                <p className="text-center text-xl mb-5 font-bold">
                    Solicitar servicio
                </p>
                <Formik
                    initialValues={{
                        kindOfService: 1,
                        city: "",
                        address: "",
                        description: ""
                    }}
                    validationSchema={Yup.object(
                        {
                            kindOfService: Yup.number()
                                .required("Este campo es obligatorio")
                                .oneOf([1, 2, 3, 4, 5], "Por favor, seleccione un tipo de servicio válido"),
                            city: Yup.string()
                                .required("Este campo es obligatorio")
                                .uuid("Por favor, seleccione una ciudad con un identificador válido"),
                            address: Yup.string()
                                .required("Este campo es obligatorio")
                                .uuid("Por favor, seleccione una dirección con un identificador válido"),
                            description: Yup.string()
                                .trim()
                                .max(254, "Por favor inserte un texto de longitud menor a 254 caracteres")
                        },                        
                    )}
                    onSubmit={(values) => {
                        const payload: {
                            kindOfService: number
                            deliveryAddressId: string
                            serviceRequesterId: string
                            serviceProviderId: string
                            cost: number
                            description: string
                        } = {
                            kindOfService: +values.kindOfService,
                            deliveryAddressId: values.address,
                            serviceRequesterId: data?.id!,
                            serviceProviderId: providerId,
                            cost: priceRate.price,
                            description: values.description
                        }                        
                        sendServiceRequest(`/requests`, {
                            method: "POST",
                            body: JSON.stringify(payload)
                        })
                    }}>
                    <Form>
                        <SelectInput id="kindOfService" name="kindOfService" label="Tipo de servicio" changeHandler={(value: string) => { setSelectedKindOfService(value) }}>
                            <option>Seleccione un tipo de servicio</option>
                            <option value={KindOfService.SERVICE_PAYMENT}>Pago de servicios</option>
                            <option value={KindOfService.DRUG_SHOPPING}>Compra de fármacos</option>
                            <option value={KindOfService.GROCERY_SHOPPING}>Compra de víveres</option>
                            <option value={KindOfService.DELIVERY}>Entrega</option>
                            <option value={KindOfService.OTHER}>Otro</option>
                        </SelectInput>
                        <SelectInput id="city" name="city" label="Ciudad" changeHandler={(value: string) => { setSelectedCity(value) }}>
                            <option>Seleccione una ciudad</option>
                            {cities && cities.map((city) => <option value={city.id} key={city.id}> {city.name} </option>)}
                        </SelectInput>
                        <div className="flex items-center gap-3 lg:gap-10">
                            <div className="flex-grow">
                                <SelectInput id="address" name="address" label="Dirección de entrega">
                                    <option>Seleccione una dirección</option>
                                    {addresses && addresses.map((address) => (
                                        <option value={address.id} key={address.id}> {address.street} {address.suburb} {address.outdoorNumber} </option>
                                    ))}
                                </SelectInput>
                            </div>
                            <div
                                className="bg-yellow-500 text-white rounded-full h-10 w-10 flex justify-center items-center cursor-pointer"
                                onClick={() => { setShowModal(true) }}>
                                <span className="inline-block text-center">
                                    <FontAwesomeIcon icon={faPlus} />
                                </span>
                            </div>
                        </div>
                        <TextArea id="description" name="description" label="Detalles adicionales" />
                        {priceRateFetchingIsLoading && <Spinner />}
                        {renderServiceRequestError()}
                        {priceRate && <p className="text-xl font-bold text-center mb-5">Total: ${priceRate.price} MXN</p>}
                        {priceRateFetchingStatus === 200 && (
                            <button className="mx-auto w-1/2 lg:w-1/3 btn-primary" type="submit">Enviar</button>
                        )}
                        {serviceRequestIsLoading && <Spinner />}     
                        {serviceRequestError && !serviceRequestIsLoading && (
                            <ErrorMessage errorMessage={serviceRequestError.message} />
                        )}                   
                        <Modal show={showModal} closeModalHandler={() => { setShowModal(false) }}>
                            <NewAddressForm
                                submitFormHandler={submitFormHandler}
                                closeModalHandler={() => { setShowModal(false) }} />
                        </Modal>
                    </Form>
                </Formik>
            </div></>
    )
}

export default NewServiceRequestForm