import { Form, Formik } from "formik"
import StandardInput from "../../components/generics/StandardInput"
import * as Yup from "yup"
import DropdownButton from "../../components/generics/DropdownButton"
import { useState } from "react"
import PriceRateFiltersForm from "../../components/service-provider/price-rate/PriceRateFiltersForm"
import ServiceRequestsList from "../../components/service-requests/ServiceRequestsList"

const ServiceProviderHomePage = () => {
    const [dropdownIsActive, setDropdownIsActive] = useState(false)

    const toggleHandler = () => {
        setDropdownIsActive((prevState => !prevState))
    }
    return (
        <div className="flex flex-col h-screen lg:flex-row">
            <div className="shadow-md bg-white m-5 p-5 ">
                <p className="mb-5">Fecha</p>
                <Formik
                    initialValues={{
                        date: ""
                    }}
                    validationSchema={Yup.object({
                        date: Yup.date()
                            .required("Por favor seleccione una fecha")
                    })}
                    onSubmit={(values) => {
                        console.log(values)
                    }}>
                    <Form>
                        <StandardInput type="date" id="date" name="date" />
                    </Form>
                </Formik>
                <DropdownButton
                    isActive={dropdownIsActive}
                    textWhenActive="Ocultar filtros"
                    textWhenInactive="Más filtros"
                    toggleHandler={toggleHandler} />
                {dropdownIsActive && <PriceRateFiltersForm />}
            </div>
            <ServiceRequestsList className="bg-white shadow m-5 flex-grow p-3" />
        </div>
    )
}

export default ServiceProviderHomePage