import { Form, Formik, FormikProps } from "formik"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import ErrorMessage from "../../components/generics/ErrorMessage"
import SelectInput from "../../components/generics/SelectInput"
import SliderInput from "../../components/generics/SliderInput"
import Spinner from "../../components/generics/Spinner"
import ServiceProviderItem from "../../components/service-provider/ServiceProviderItem"
import useFetch from "../../hooks/use-fetch"
import StateResponse from "../../models/state-response"
import City from "../../responses/city"
import ServiceProviderSearchResult from "../../responses/service-provider-search-result"

const ServiceProvidersSearchPage = () => {

    const {
        data: states,
        sendRequest: fetchStates
    } = useFetch<StateResponse[]>()

    const {
        data: serviceProviders,
        sendRequest: fetchServiceProviders,
        error: serviceProvidersFetchingError,
        isLoading: serviceProvidersFetchingIsLoading
    } = useFetch<ServiceProviderSearchResult[]>()

    const {
        data: cities,
        sendRequest: fetchCities
    } = useFetch<City[]>()    

    useEffect(() => {
        fetchStates("http://127.0.0.1:8000/states")
    }, [])

    const [stateId, setStateId] = useState<string>("")

    useEffect(() => {
        if(stateId) {            
            fetchCities(`http://127.0.0.1:8000/states/${stateId}/cities`)
        }
    }, [stateId])

    const [maxValue, setMaxValue] = useState<number>(1)    

    const formRef = useRef<FormikProps<{
        kindOfService: number,
        state: string,
        city: string,
        maxPriceRate: number
      }>>(null)

    return (
        <>
            <div className="shadow-md m-5 p-5 bg-white" >
                <Formik
                    enableReinitialize
                    innerRef={formRef}
                    initialValues={
                        {
                            kindOfService: 0,
                            state: "",
                            city: "",
                            maxPriceRate: 1
                        }
                    }
                    validationSchema={Yup.object({
                        kindOfService: Yup.number()
                            .required("Campo obligatorio")
                            .oneOf([0, 1, 2, 3, 4], ""),
                        state: Yup.string()
                            .required("Campo obligatorio")
                            .uuid("Por favor seleccione un Estado"),
                        city: Yup.string()
                            .required("Campo obligatorio")
                            .uuid("Por favor seleccione una ciudad"),
                        maxPriceRate: Yup.number()
                            .required("Campo obligatorio")
                            .min(1, "No hay tarifas menores a $1.00 MXN")
                            .max(100, "No se permiten tarifas mayores a $100.00 MXN")
                    })}
                    onSubmit={(values) => {
                        fetchServiceProviders(`http://127.0.0.1:8000/providers?page=1&pageSize=5&maxPriceRate=${values.maxPriceRate}&cityId=${values.city}&kindOfService=${values.kindOfService}`)
                    }}>
                    <Form className="flex flex-col justify-between lg:justify-around lg:flex-row lg:items-center">
                        <SelectInput id="kindOfService" name="kindOfService" label="Tipo de servicio">
                            <option value="0">Compra de víveres</option>
                            <option value="1">Compra de fármacos</option>
                            <option value="2">Entrega</option>
                            <option value="3">Pago de servicios</option>
                            <option value="3">Otro</option>
                        </SelectInput>
                        <SelectInput id="state" name="state" label="Estado" changeHandler={(value: string) => {setStateId(value)}}>
                            <option>Seleccione un Estado</option>
                            {states && states.map((state) => <option value={state.id} key={state.id}>{state.name}</option>)}
                        </SelectInput>
                        <SelectInput id="city" name="city" label="Ciudad">
                            <option>Seleccione una ciudad</option>
                            {cities && cities.map((city) => <option value={city.id} key={city.id}>{city.name}</option>)}
                        </SelectInput>
                        <div className="flex flex-col mb-5">
                            <SliderInput id="maxPriceRate" name="maxPriceRate" min={1} max={100} label="Precio máximo" changeHandler={(value: string) => {
                                setMaxValue(parseInt(value))
                            }} />
                            <p>$ {maxValue} MXN</p>
                        </div>
                        <button type="submit" className="btn-primary align-middle h-8">
                            Buscar
                        </button>
                    </Form>
                </Formik>
            </div>
            <div className="shadow-md m-5 p-5 bg-white" >
                {serviceProvidersFetchingIsLoading && <Spinner />}
                {serviceProvidersFetchingError && !serviceProvidersFetchingIsLoading && <ErrorMessage />}
                {serviceProviders && serviceProviders.map((serviceProvider) => {
                    return (
                        <Link key={serviceProvider.id} to={`/service-providers/${serviceProvider.id}`}>
                            <ServiceProviderItem
                                businessName={serviceProvider.businessName}
                                serviceProviderName={`${serviceProvider.names} ${serviceProvider.lastNames}`}
                                serviceProviderAverageScore={serviceProvider.averageScore}
                                priceRate={serviceProvider.priceRate} />
                                
                        </Link>
                    )
                })}                
            </div>
        </>
    )
}

export default ServiceProvidersSearchPage