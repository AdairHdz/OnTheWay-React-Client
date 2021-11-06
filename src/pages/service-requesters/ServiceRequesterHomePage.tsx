import { Form, Formik } from "formik"
import StandardInput from "../../components/generics/StandardInput"
import * as Yup from "yup"
import { useContext } from "react"

import useFetch from "../../hooks/use-fetch"
import { AuthContext } from "../../store/AuthContext"
import ServiceRequestDetails from "../../responses/service-request-details"
import ServiceRequesterRequestsList from "../../components/service-requests/ServiceRequesterRequestsList"
import Alert from "../../components/generics/Alert"
import useFlashMessage from "../../hooks/use-flash-message"

const ServiceProviderHomePage = () => {        
    const {data} = useContext(AuthContext)
    const {
        data: serviceRequests,
        error: serviceRequestsFetchingError,
        isLoading: serviceRequestsFetchingIsLoading,
        sendRequest: fetchServiceRequests,
        responseStatus: serviceRequestResponseStatus
    } = useFetch<ServiceRequestDetails[]>()

    const {message} = useFlashMessage()    
    
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
                        fetchServiceRequests(`http://127.0.0.1:8000/requesters/${data.id}/requests?date=${values.date}`)
                    }}>
                    <Form>
                        <StandardInput type="date" id="date" name="date" label="Fecha" />
                        <button type="submit" className="btn-primary mx-auto">Buscar</button>
                    </Form>
                </Formik>                
            </div>
            <Alert className="absolute w-72 left-1/2 -ml-36 top-8" show={message !== undefined} title={message?.title || ""} message={message?.message || ""} />
            <ServiceRequesterRequestsList
                serviceRequests={serviceRequests}
                className="bg-white shadow m-5 flex-grow p-3"
                serviceRequestError={serviceRequestsFetchingError}
                serviceRequestFetchingIsLoading={serviceRequestsFetchingIsLoading}
                responseStatus={serviceRequestResponseStatus} />
        </div>
    )
}

export default ServiceProviderHomePage