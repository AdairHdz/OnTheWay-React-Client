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
import { useHistory } from "react-router-dom"

const ServiceProviderHomePage = () => {
    const { data } = useContext(AuthContext)
    const {
        data: serviceRequests,
        error: serviceRequestsFetchingError,
        isLoading: serviceRequestsFetchingIsLoading,
        sendRequest: fetchServiceRequests,
        responseStatus: serviceRequestResponseStatus
    } = useFetch<ServiceRequestDetails[]>()

    const {
        sendRequest: sendLogoutRequest
    } = useFetch()

    const {
        logout
    } = useContext(AuthContext)

    const history = useHistory()

    const logoutHandler = () => {
        sendLogoutRequest(`/users/logout`, {
            method: "POST"
        })
        logout()
        history.push("/login")
    }

    const { message } = useFlashMessage()

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
                        fetchServiceRequests(`/requesters/${data?.id}/requests?date=${values.date}`)
                    }}>
                    <Form>
                        <StandardInput type="date" id="date" name="date" label="Fecha" />
                        <button type="submit" className="btn-primary mx-auto">Buscar</button>
                    </Form>
                </Formik>
            </div>
            <Alert className="absolute w-72 left-1/2 -ml-36 top-8" show={message !== undefined} title={message?.title || ""} message={message?.message || ""} />
            <div className="bg-white shadow m-5 flex-grow p-3 overflow-y-auto">
                <div className="flex justify-end mb-5">
                    <button
                        className="block border border-blue-600 text-blue-600 bg-transparent px-5 py-2 rounded-sm cursor-pointer hover:text-white hover:bg-blue-600 transition-colors"
                        type="button"
                        onClick={logoutHandler}>
                        Cerrar sesión
                    </button>
                </div>
                <ServiceRequesterRequestsList
                    serviceRequests={serviceRequests}
                    className="bg-white shadow m-5 flex-grow p-3"
                    serviceRequestError={serviceRequestsFetchingError}
                    serviceRequestFetchingIsLoading={serviceRequestsFetchingIsLoading}
                    responseStatus={serviceRequestResponseStatus} />
            </div>
        </div>
    )
}

export default ServiceProviderHomePage