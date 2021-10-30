import { Form, Formik } from "formik"
import StandardInput from "../../components/generics/StandardInput"
import ServiceProviderRequestsList from "../../components/service-requests/ServiceProviderRequestsList"
import * as Yup from "yup"
import { useContext } from "react"
import { AuthContext } from "../../store/AuthContext"
import useFetch from "../../hooks/use-fetch"
import ServiceRequestDetails from "../../responses/service-request-details"

const ServicesPage = () => {    
    const { data } = useContext(AuthContext)
    const {
        data: serviceRequests,
        error: serviceRequestsFetchingError,
        isLoading: serviceRequestsFetchingIsLoading,
        sendRequest: fetchServiceRequests
    } = useFetch<ServiceRequestDetails[]>()
    return (
        <div className="flex flex-col h-screen lg:flex-row">
            <div className="shadow-md bg-white m-5 p-5 ">
                <Formik
                    initialValues={{
                        date: ""
                    }}
                    validationSchema={Yup.object({
                        date: Yup.date()
                            .required("Este campo es obligatorio")
                    })}
                    onSubmit={(values) => {
                        fetchServiceRequests(`http://127.0.0.1:8000/providers/${data.id}/requests?date=${values.date}`)
                    }}>
                    <Form>
                        <StandardInput type="date" id="date" name="date" label="Fecha" />
                        <button type="submit" className="btn-primary mx-auto">Buscar</button>
                    </Form>
                </Formik>
            </div>
            <ServiceProviderRequestsList serviceRequests={serviceRequests} className="bg-white shadow m-5 flex-grow p-3" serviceRequestError={serviceRequestsFetchingError} serviceRequestFetchingIsLoading={serviceRequestsFetchingIsLoading} />
        </div>
    )
}

export default ServicesPage