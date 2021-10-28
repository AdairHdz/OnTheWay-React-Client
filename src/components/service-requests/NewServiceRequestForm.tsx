import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, Formik } from "formik"
import useFetch from "../../hooks/use-fetch"
import SelectInput from "../generics/SelectInput"
import * as Yup from "yup"
import StandardInput from "../generics/StandardInput"
import NewAddressForm from "../service-requesters/NewAddressForm"
import { useContext, useEffect, useState } from "react"
import Address from "../../responses/address"
import { AuthContext } from "../../store/AuthContext"
import City from "../../responses/city"
import { useParams } from "react-router-dom"
import ErrorMessage from "../generics/ErrorMessage"
import Spinner from "../generics/Spinner"

const NewServiceRequestForm: React.FC<{}> = (props) => {
    const { providerId } = useParams<{
        providerId: string
    }>()
    
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
        error: priceRateFetchingError
    } = useFetch<{
        price: number
    }>()

    const {
        sendRequest: sendServiceRequest,
        isLoading: serviceRequestIsLoading,
        error: serviceRequestError
    } = useFetch<any>()

    const { data } = useContext(AuthContext)
    
    useEffect(() => {
        fetchCities(`http://127.0.0.1:8000/states/${data.stateId}/cities`)
    }, [data.stateId])
        
    const [showModal, setShowModal] = useState(false)
    const [selectedCity, setSelectedCity] = useState<string>("")
    const [selectedKindOfService, setSelectedKindOfService] = useState<string>("")

    const getAddresses = () => {
        fetchAddresses(`http://127.0.0.1:8000/requesters/${data.id}/addresses?cityId=${selectedCity}`)
    }
    
    useEffect(() => {
        fetchAddresses(`http://127.0.0.1:8000/requesters/${data.id}/addresses?cityId=${selectedCity}`)        
    }, [selectedCity, data.id])

    useEffect(() => {
        if(selectedKindOfService && selectedCity) {
            fetchPriceRate(`http://127.0.0.1:8000/providers/${providerId}/priceRates/${selectedCity}?kindOfService=${selectedKindOfService}`)
        }
    }, [selectedCity, selectedKindOfService])

    return (
        <div className="shadow-md bg-white flex-grow-0 mb-5 p-10 lg:w-2/3 lg:mx-auto">
            <p className="text-center text-xl mb-5 font-bold">
                Solicitar servicio
            </p>
            <Formik
                initialValues={{
                    kindOfService: 0,
                    city: "",
                    address: ""
                }}
                validationSchema={Yup.object({

                })}
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
                        serviceRequesterId: data.id!,
                        serviceProviderId: providerId,
                        cost: priceRate.price,
                        description: "a"
                    }

                    console.log(payload)
                    sendServiceRequest(`http://127.0.0.1:8000/requests`, {
                        method: "POST",
                        body: JSON.stringify(payload)
                    })
                }}>
                <Form>
                    <SelectInput id="kindOfService" name="kindOfService" label="Tipo de servicio" changeHandler={(value: string) => { setSelectedKindOfService(value) }}>
                        <option>Seleccione un tipo de servicio</option>
                        <option value={0}>Pago de servicios</option>
                        <option value={1}>Compra de fármacos</option>
                        <option value={2}>Compra de víveres</option>
                        <option value={3}>Entrega</option>
                        <option value={4}>Otro</option>
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
                    {priceRateFetchingIsLoading && <Spinner />}
                    {priceRateFetchingError && !priceRateFetchingIsLoading && (
                        <ErrorMessage />
                    )}
                    {priceRate && <p className="text-xl font-bold text-center mb-5">Total: ${priceRate.price} MXN</p>}
                    <button className="btn-primary mx-auto w-1/2 lg:w-1/3">Enviar</button>
                    {serviceRequestIsLoading && <Spinner />}
                    {serviceRequestError && !serviceRequestIsLoading && (
                        <ErrorMessage errorMessage={serviceRequestError.message + ""} />
                    )}
                    {showModal && (
                        <NewAddressForm
                            submitFormHandler={() => { getAddresses() }}
                            closeModalHandler={() => { setShowModal(false) }} />
                    )}
                </Form>
            </Formik>
        </div>
    )
}

export default NewServiceRequestForm