import { Form, Formik } from "formik"
import CheckboxInput from "../../generics/CheckboxInput"
import SelectInput from "../../generics/SelectInput"
import * as Yup from "yup"

const PriceRateFiltersForm = () => {
    return (
        <Formik
            initialValues={{
                delivery: false,
                servicePayment: false,
                groceryShopping: false,
                drugShopping: false,
                other: false,
                status: "all",
                city: "all"
            }}
            validationSchema={Yup.object({
                delivery: Yup.boolean().oneOf([true, false], "Valor no válido"),
                servicePayment: Yup.boolean().oneOf([true, false], "Valor no válido"),
                groceryShopping: Yup.boolean().oneOf([true, false], "Valor no válido"),
                drugShopping: Yup.boolean().oneOf([true, false], "Valor no válido"),
                other: Yup.boolean().oneOf([true, false], "Valor no válido"),
                status: Yup.string()
                    .oneOf(["all", "actives", "inactives"], "Valor no válido"),
                city: Yup.string()
                    .oneOf(["all", "xalapa"], "Valor no válido")
            })}
            onSubmit={(values) => {
                console.log(values.city)
            }} >
            <Form>
                <p className="text-lg text-center font-bold mb-5">Tipo de servicio</p>
                <div className="w-full mx-auto text-center md:flex md:justify-between">
                    <div className="md:flex-grow">
                        <CheckboxInput
                            id="delivery"
                            name="delivery"
                            className="mb-5"
                            label="Entrega" />
                        <CheckboxInput
                            id="servicePayment"
                            name="servicePayment"
                            className="mb-5"
                            label="Pago de servicios" />
                        <CheckboxInput
                            id="groceryShopping"
                            name="groceryShopping"
                            className="mb-5"
                            label="Compra de víveres" />
                        <CheckboxInput
                            id="drugShopping"
                            name="drugShopping"
                            className="mb-5"
                            label="Compra de fármacos" />
                        <CheckboxInput
                            id="other"
                            name="other"
                            className="mb-5"
                            label="Otro" />
                    </div>
                    <div className="md:flex-grow md:flex md:flex-col md:justify-center">
                        <SelectInput
                            id="status"
                            name="status"
                            label="Mostrar">
                            <option value="all" selected>Todas</option>
                            <option value="actives">Activas</option>
                            <option value="inactives">Inactivas</option>
                        </SelectInput>
                        <SelectInput
                            id="city"
                            name="city"
                            label="Ciudad">
                            <option value="all" selected>Todas</option>
                            <option value="xalapa">Xalapa</option>
                        </SelectInput>
                    </div>
                </div>                
            </Form>
        </Formik>
    )
}

export default PriceRateFiltersForm