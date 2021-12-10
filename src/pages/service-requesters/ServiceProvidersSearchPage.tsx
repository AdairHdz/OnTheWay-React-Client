import { Form, Formik, FormikProps } from "formik"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import ErrorMessage from "../../components/generics/ErrorMessage"
import Paginator from "../../components/generics/Paginator"
import SelectInput from "../../components/generics/SelectInput"
import SliderInput from "../../components/generics/SliderInput"
import Spinner from "../../components/generics/Spinner"
import ServiceProviderItem from "../../components/service-provider/ServiceProviderItem"
import KindOfService from "../../enums/kind-of-service"
import useFetch from "../../hooks/use-fetch"
import StateResponse from "../../models/state-response"
import City from "../../responses/city"
import PaginatedServiceProvider from "../../responses/paginated-service-provider"

const ServiceProvidersSearchPage = () => {

    const {
        data: states,
        sendRequest: fetchStates
    } = useFetch<StateResponse[]>()

    const {
        data: serviceProviders,
        sendRequest: fetchServiceProviders,
        error: serviceProvidersFetchingError,
        isLoading: serviceProvidersFetchingIsLoading,
        responseStatus: serviceProvidersResponseStatus
    } = useFetch<PaginatedServiceProvider>()

    const {
        data: cities,
        sendRequest: fetchCities
    } = useFetch<City[]>()    

    useEffect(() => {
        fetchStates("/states")
    }, [])

    const [stateId, setStateId] = useState<string>("")

    useEffect(() => {
        if(stateId) {            
            fetchCities(`/states/${stateId}/cities`)
        }
    }, [stateId])

    const [maxValue, setMaxValue] = useState<number>(1)    

    const formRef = useRef<FormikProps<{
        kindOfService: number,
        state: string,
        city: string,
        maxPriceRate: number
      }>>(null)

      const renderSearchError = () => {
          if(serviceProvidersFetchingError && !serviceProvidersFetchingIsLoading) {
            if(serviceProvidersResponseStatus && serviceProvidersResponseStatus === 404) {
                return <ErrorMessage errorTitle="Sin resultados"
                    errorMessage="Parece ser que no hay proveedores de servicios que cumplan con los criterios que especificó" />
            }
            return <ErrorMessage />
          }
          return null
      }

      const getServiceProvidersByURLCriteria = (urlCriteria: string) => {
        fetchServiceProviders(`${urlCriteria}`)
      }

    return (
        <>
            <div className="shadow-md m-5 p-5 bg-white" >
                <Formik
                    enableReinitialize
                    innerRef={formRef}
                    initialValues={
                        {
                            kindOfService: KindOfService.GROCERY_SHOPPING,
                            state: "",
                            city: "",
                            maxPriceRate: 1
                        }
                    }
                    validationSchema={Yup.object({
                        kindOfService: Yup.number()
                            .required("Campo obligatorio")
                            .oneOf([1, 2, 3, 4, 5], ""),
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
                        getServiceProvidersByURLCriteria(`/providers?page=1&pageSize=10&maxPriceRate=${values.maxPriceRate}&cityId=${values.city}&kindOfService=${values.kindOfService}`)
                    }}>
                    <Form className="flex flex-col justify-between lg:justify-around lg:flex-row lg:items-center">
                        <SelectInput id="kindOfService" name="kindOfService" label="Tipo de servicio">
                            <option value={KindOfService.GROCERY_SHOPPING}>Compra de víveres</option>
                            <option value={KindOfService.DRUG_SHOPPING}>Compra de fármacos</option>
                            <option value={KindOfService.DELIVERY}>Entrega</option>
                            <option value={KindOfService.SERVICE_PAYMENT}>Pago de servicios</option>
                            <option value={KindOfService.OTHER}>Otro</option>
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
                { renderSearchError() }
                {serviceProviders && serviceProviders.data && serviceProviders.data.map((serviceProvider) => {
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
                {serviceProviders && serviceProviders.data && <Paginator
                    paginationLinks={{
                        links: serviceProviders.links,
                        page: serviceProviders.page,
                        pages: serviceProviders.pages,
                        perPage: serviceProviders.perPage,
                        total: serviceProviders.total
                    }}
                    goToLastPageHandler={ () => { getServiceProvidersByURLCriteria(serviceProviders.links!.last!) } }
                    goToFirstPageHandler={ () => { getServiceProvidersByURLCriteria(serviceProviders.links!.first!) } }
                    goToNextPageHandler={ () => { getServiceProvidersByURLCriteria(serviceProviders.links!.next!) } }
                    goToPreviousPageHandler={ () => { getServiceProvidersByURLCriteria(serviceProviders.links!.prev!) } } />}
            </div>
        </>
    )
}

export default ServiceProvidersSearchPage