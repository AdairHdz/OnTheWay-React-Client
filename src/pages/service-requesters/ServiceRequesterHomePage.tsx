import { Form, Formik } from "formik"
import StandardInput from "../../components/generics/StandardInput"
import * as Yup from "yup"
import { useContext, useState } from "react"
import ServiceRequestsList from "../../components/service-requests/ServiceRequestsList"
import useFetch from "../../hooks/use-fetch"
import { AuthContext } from "../../store/AuthContext"
import ServiceRequestDetails from "../../responses/service-request-details"

const ServiceProviderHomePage = () => {    
    const [selectedDate, setSelectedDate] = useState<string>("")
    const {data} = useContext(AuthContext)
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
                        fetchServiceRequests(`http://127.0.0.1:8000/requesters/${data.id}/requests?date=${selectedDate}`)
                    }}>
                    <Form>
                        <StandardInput type="date" id="date" name="date" label="Fecha" inputHandler={(value) => setSelectedDate(value)} />
                        <button type="submit" className="btn-primary mx-auto">Buscar</button>
                    </Form>
                </Formik>                
            </div>
            <ServiceRequestsList serviceRequests={serviceRequests} className="bg-white shadow m-5 flex-grow p-3" serviceRequestError={serviceRequestsFetchingError} serviceRequestFetchingIsLoading={serviceRequestsFetchingIsLoading} />
        </div>
    )
}

export default ServiceProviderHomePage