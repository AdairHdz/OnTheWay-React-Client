import { Form, Formik } from "formik"
import { useContext, useEffect, useState } from "react"
import PieChart from "../../components/service-provider/statistics/PieChart"
import StackChart from "../../components/service-provider/statistics/StackChart"
import useFetch from "../../hooks/use-fetch"
import RequestedServicesPerKindOfService from "../../models/requested-services-per-kind-of-service"
import RequestedServicesPerWeekday from "../../models/requested-services-per-weekday"
import Statistics from "../../models/statistics"
import { AuthContext } from "../../store/AuthContext"
import * as Yup from "yup"
import StandardInput from "../../components/generics/StandardInput"
import ErrorMessage from "../../components/generics/ErrorMessage"

const StatisticsPage = () => {

    const { data: userSessionData } = useContext(AuthContext)
    const {
        data: statistics,
        sendRequest: fetchStatistics,
        error: statisticsFetchingError,
        isLoading: statisticsFetchingIsLoading,
        responseStatus: statisticsFetchingStatus
    } = useFetch<Statistics>()
    const [requestedServicesPerKindOfService, setRequestedServicesPerKindOfService] = useState<RequestedServicesPerKindOfService[]>([])
    const [requestedServicesPerWeekday, setRequestedServicesPerWeekday] = useState<RequestedServicesPerWeekday[]>([])

    const renderError = () => {
        if (statisticsFetchingError && !statisticsFetchingIsLoading) {
            switch (statisticsFetchingStatus) {
                case 0:
                    return (
                        <ErrorMessage errorTitle="Conexión rechazada"
                            errorMessage="No pudimos establecer una conexión con nuestros servidores. Por favor, intente más tarde" />
                    )
                case 400:
                    return (
                        <ErrorMessage errorTitle="Solicitud no válida"
                            errorMessage="Los datos introducidos no son válidos. Por favor, verifique la información e intente nuevamente" />
                    )
                case 404:
                    return (
                        <ErrorMessage errorTitle="Error"
                            errorMessage="No existen datos para las fechas introducidas." />)
                default:
                    return <ErrorMessage />
            }
        }
    }

    useEffect(() => {
        if (statistics === undefined) {
            return
        }
        setRequestedServicesPerKindOfService(statistics.requestedServicesPerKindOfService)
        setRequestedServicesPerWeekday(statistics.requestedServicesPerWeekday)
    }, [statistics])

    return (
        <>
            <section className="shadow-md bg-white flex-grow-0 mb-5 p-5">
                <Formik
                    initialValues={{
                        startingDate: "",
                        endingDate: ""
                    }}
                    validationSchema={Yup.object({
                        startingDate: Yup.date()
                            .required("Este campo es obligatorio"),
                        endingDate: Yup.date()
                            .required("Este campo es obligatorio")
                    })}
                    onSubmit={(values) => {
                        fetchStatistics(`/providers/${userSessionData?.id}/statistics?startingDate=${values.startingDate}&endingDate=${values.endingDate}`)
                    }} >
                    <Form>
                        <StandardInput
                            id="startingDate"
                            name="startingDate"
                            type="date"
                            label="Desde" />
                        <StandardInput
                            id="endingDate"
                            name="endingDate"
                            type="date"
                            label="Hasta" />
                        <button type="submit" className={`mx-auto ${statisticsFetchingIsLoading ? 'btn-primary-outlined cursor-wait' : 'btn-primary'}`}
                            disabled={statisticsFetchingIsLoading}>
                            Buscar
                        </button>
                    </Form>
                </Formik>
            </section>
            <section className="mx-auto p-5 md:p-10 lg:flex lg:justify-between lg:gap-5">
                {renderError()}
                {!statisticsFetchingError && (
                    <>
                        <PieChart title="Solicitudes de servicio por tipo de servicio" requestedServicesPerKindOfService={requestedServicesPerKindOfService} className="p-5 mb-10 lg:mb-0 lg:w-1/2 bg-white md:p-3 shadow-xl rounded-xl" />
                        <StackChart title="Solicitudes de servicio por días de la semana" requestedServicesPerWeekday={requestedServicesPerWeekday} className="p-5 lg:w-1/2 bg-white md:p-3 shadow-xl rounded-xl" />
                    </>
                )}
            </section>
        </>
    )
}

export default StatisticsPage