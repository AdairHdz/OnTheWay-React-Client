import { Field, Form, Formik } from "formik"
import SelectInput from "../../generics/SelectInput"
import * as Yup from "yup"
import KindOfService from "../../../enums/kind-of-service"
import { useContext, useEffect } from "react"
import { AuthContext } from "../../../store/AuthContext"
import useFetch from "../../../hooks/use-fetch"
import City from "../../../responses/city"
import QueryParam from "../../../models/query-param"

const PriceRateFiltersForm: React.FC<{
    changeHandler: (params: QueryParam[]) => void
}> = (props) => {
    const {data: userAuthData} = useContext(AuthContext)
    const {
        sendRequest: fetchCities,
        data: cities,        
    } = useFetch<City[]>()

    useEffect(() => {
        fetchCities(`/states/${userAuthData?.stateId}/cities`)
    }, [])
    return (
        <Formik
            enableReinitialize={true}
            initialValues={{
                kindOfService: '',
                city: ""
            }}
            validationSchema={Yup.object().shape(
                {
                    city: Yup.string()                    
                        .optional()
                        .when('city', {
                            is: (value: string) => value !== "",
                            then: (rule) => rule.uuid("Por favor seleccione una ciudad válida"),
                        })
                },
                [
                    ['city', 'city']
                ]
            )}
            onSubmit={(values) => {
                let queryParams: QueryParam[] = []

                if(values.kindOfService !== "") {
                    queryParams.push({
                        key: 'kindOfService',
                        value: values.kindOfService
                    },)
                }

                if(values.city !== "") {
                    queryParams.push({
                        key: 'cityId',
                        value: values.city
                    })
                }                
                
                props.changeHandler(queryParams)
            }} >
            <Form>
                <p className="text-lg text-center font-bold mb-5">Tipo de servicio</p>
                <div className="w-full mx-auto text-center md:flex md:justify-between">
                    <div role="group" aria-labelledby="checkbox-group" className="md:flex-grow flex flex-col items-start">
                        <label>
                            <Field type="radio" name="kindOfService" value={KindOfService.DELIVERY.toString()} />
                            Entrega
                        </label>
                        <label>
                            <Field type="radio" name="kindOfService" value={KindOfService.SERVICE_PAYMENT.toString()} />
                            Pago de servicios
                        </label>
                        <label>
                            <Field type="radio" name="kindOfService" value={KindOfService.GROCERY_SHOPPING.toString()} />
                            Compra de víveres
                        </label>
                        <label>
                            <Field type="radio" name="kindOfService" value={KindOfService.DRUG_SHOPPING.toString()} />
                            Compra de fármacos
                        </label>
                        <label>
                            <Field type="radio" name="kindOfService" value={KindOfService.OTHER.toString()} />
                            Otro
                        </label>
                        <label>
                            <Field type="radio" name="kindOfService" value="" />
                            Todos
                        </label>
                    </div>
                    <div className="md:flex-grow md:flex md:flex-col md:justify-center">
                        <SelectInput
                            id="city"
                            name="city"
                            label="Ciudad">
                            <option value="">Todas</option>
                            {cities && cities.map((city) => <option value={city.id}> {city.name} </option>)}
                        </SelectInput>
                    </div>
                </div>
                <button type="submit" className="btn-primary mx-auto">Enviar</button>
            </Form>
        </Formik>
    )
}

export default PriceRateFiltersForm