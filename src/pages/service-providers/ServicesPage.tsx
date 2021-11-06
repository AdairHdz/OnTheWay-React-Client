import { Form, Formik } from "formik"
import StandardInput from "../../components/generics/StandardInput"
import * as Yup from "yup"
import { useContext } from "react"
import { AuthContext } from "../../store/AuthContext"
import useFetch from "../../hooks/use-fetch"
import ServiceRequestDetails from "../../responses/service-request-details"
import ServiceProviderRequestsList from "../../components/service-requests/ServiceProviderRequestsList"
import useFlashMessage from "../../hooks/use-flash-message"
import Alert from "../../components/generics/Alert"

const ServicesPage = () => {    
    const { data } = useContext(AuthContext)
    const {message} = useFlashMessage()
    const {
        data: serviceRequests,
        error: serviceRequestsFetchingError,
        isLoading: serviceRequestsFetchingIsLoading,
        responseStatus: serviceRequestResponseStatus,
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
            <Alert className="absolute w-72 left-1/2 -ml-36 top-8" show={message !== undefined} title={message?.title || ""} message={message?.message || ""} />
            <ServiceProviderRequestsList
            serviceRequests={serviceRequests}
            className="bg-white shadow m-5 flex-grow p-3"
            serviceRequestError={serviceRequestsFetchingError}
            responseStatus={serviceRequestResponseStatus}
            serviceRequestFetchingIsLoading={serviceRequestsFetchingIsLoading} />
        </div>
    )
}

export default ServicesPage