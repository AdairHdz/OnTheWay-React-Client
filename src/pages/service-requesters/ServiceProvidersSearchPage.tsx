import { Form, Formik, FormikProps } from "formik"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import SelectInput from "../../components/generics/SelectInput"
import StandardInput from "../../components/generics/StandardInput"
import ServiceProviderItem from "../../components/service-provider/ServiceProviderItem"
import useFetch from "../../hooks/use-fetch"
import StateResponse from "../../models/state-response"

const ServiceProvidersSearchPage = () => {

    const {
        data: states,
        sendRequest: fetchStates
    } = useFetch<StateResponse[]>()

    // const {
    //     data: cities,
    //     sendRequest: fetchCities
    // } = useFetch<City[]>()

    useEffect(() => {
        fetchStates("http://127.0.0.1:8000/states")
    }, [])

    // useEffect(() => {
    //     if(states) {
    //         fetchCities("http://127.0.0.1:8000/states/state-id/cities")
    //     }
    // }, [states])

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
                    innerRef={formRef}
                    validationSchema={Yup.object({
                        kindOfService: Yup.number()
                            .required("Campo obligatorio")
                            .oneOf([], ""),
                        state: Yup.string()
                            .required("Campo obligatorio")
                            .uuid("Por favor seleccione un Estado"),
                        city: Yup.string()
                            .required("Campo obligatorio")
                            .uuid("Por favor seleccione un Estado"),
                        maxPriceRate: Yup.number()
                            .required("Campo obligatorio")
                            .min(1, "No hay tarifas menores a $1.00 MXN")
                            .max(100, "No se permiten tarifas mayores a $100.00 MXN")
                    })}
                    initialValues={{
                        kindOfService: 0,
                        state: "",
                        city: "",
                        maxPriceRate: 1
                    }}
                    onSubmit={(values) => {

                    }}>
                    <Form className="flex flex-col justify-between lg:justify-around lg:flex-row lg:items-center">
                        <SelectInput id="kindOfService" name="kindOfService" label="Tipo de servicio">
                            <option value="">Compra de víveres</option>
                        </SelectInput>
                        <SelectInput id="state" name="state" label="Estado">
                            {states && states.map((state) => <option value={state.id}>{state.name}</option>)}
                        </SelectInput>
                        <SelectInput id="city" name="city" label="Ciudad">
                            <option value="">Xalapa</option>
                        </SelectInput>
                        <div className="flex flex-col mb-5">
                            <StandardInput id="maxPriceRate" name="maxPriceRate" type="range" label="Precio máximo" />
                            <p>$ {formRef.current?.values.maxPriceRate} MXN</p>
                        </div>
                        <button type="submit" className="btn-primary align-middle h-8">
                            Buscar
                        </button>
                    </Form>
                </Formik>
            </div>
            <div className="shadow-md m-5 p-5 bg-white" >
                <Link to="/service-providers/a66d3849-c50f-4ca5-9013-0498b23adbd9">
                    <ServiceProviderItem />
                </Link>                
                <Link to="/service-providers/a66d3849-c50f-4ca5-9013-0498b23adbd9">
                    <ServiceProviderItem />
                </Link>                
                <Link to="/service-providers/a66d3849-c50f-4ca5-9013-0498b23adbd9">
                    <ServiceProviderItem />
                </Link>                
            </div>
        </>
    )
}

export default ServiceProvidersSearchPage