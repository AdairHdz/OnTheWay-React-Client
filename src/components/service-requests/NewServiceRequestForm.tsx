import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, Formik } from "formik"
import useFetch from "../../hooks/use-fetch"
import SelectInput from "../generics/SelectInput"
import * as Yup from "yup"
import StandardInput from "../generics/StandardInput"

const NewServiceRequestForm: React.FC<{}> = (props) => {
    const {
        error,
        isLoading,
        sendRequest
    } = useFetch()

    return (
        <div className="shadow-md bg-white flex-grow-0 mb-5 p-10 lg:w-2/3 lg:mx-auto">
            <p className="text-center text-xl mb-5 font-bold">
                Solicitar servicio
            </p>
            <Formik
                initialValues={{

                }}
                validationSchema={Yup.object({

                })}
                onSubmit={(values) => {

                }}>
                <Form>
                    <SelectInput id="kindOfService" name="kindOfService" label="Tipo de servicio" />
                    <SelectInput id="city" name="city" label="Ciudad" />
                    <div className="flex items-center gap-3 lg:gap-10">
                        <div className="flex-grow">
                            <SelectInput id="address" name="address" label="Dirección de entrega" />
                        </div>
                        <div
                            className="bg-yellow-500 text-white rounded-full h-10 w-10 flex justify-center items-center cursor-pointer"
                            onClick={() => {}}>
                            <span className="inline-block text-center">
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </div>
                    </div>
                    <p className="text-xl font-bold text-center mb-5">Total: $0.00 MXN</p>
                    <button className="btn-primary mx-auto w-1/2 lg:w-1/3">Enviar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default NewServiceRequestForm