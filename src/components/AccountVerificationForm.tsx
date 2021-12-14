import { Form, Formik } from "formik"
import BlackLogo from "../assets/images/logo.png"
import StandardInput from "./generics/StandardInput"
import * as Yup from "yup"
import useFetch from "../hooks/use-fetch"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../store/AuthContext"
import { useHistory } from "react-router-dom"
import useFlashMessage from "../hooks/use-flash-message"

const AccountVerificationForm = () => {
    const {
        sendRequest: sendAccountActivationRequest,
        responseStatus: accountActivationResponseStatus,
        error: accountActivationError,
        isLoading: accountActivationIsLoading
    } = useFetch()

    const {
        sendRequest: requestNewActivationCode,
        error: requestNewActivationCodeError,
        responseStatus: requestNewActivationCodeResponseStatus,
        isLoading: requestNewActivationCodeIsLoading
    } = useFetch()

    const [canRequestNewCode, setCanRequestNewCode] = useState(true)

    const { data, activateAccount } = useContext(AuthContext)

    const history = useHistory()
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        if (accountActivationResponseStatus === 204) {
            activateAccount()
            setFlashMessage("Cuenta verificada", "Hemos verificado su cuenta. Ahora podrá iniciar sesión")
            history.push("/")
            return
        }

        if (accountActivationError && !accountActivationIsLoading) {
            switch (accountActivationResponseStatus) {
                case 0:
                    setFlashMessage("Conexión rechazada", "No pudimos establecer una conexión con nuestros servidores. Por favor, intente más tarde")
                    break
                case 400:
                    setFlashMessage("Solicitud no válida", "Los datos introducidos no son válidos. Por favor, verifique la información e intente nuevamente")
                    break
                case 404:
                    setFlashMessage("Código incorrecto", "El código que ha introducido no coincide con nuestros registros")
                    break
                default:
                    setFlashMessage("Ocurrió un error", "Ocurrió un error inesperado. Por favor, intente más tarde")
            }            
        }
    }, [accountActivationError, accountActivationIsLoading, accountActivationResponseStatus])

    useEffect(() => {      
        if(requestNewActivationCodeResponseStatus === 204) {            
            setFlashMessage("Nuevo código", "Hemos enviado un nuevo código de verificación a tu dirección de correo electrónico")
            return
        }  

        if (requestNewActivationCodeError && !requestNewActivationCodeIsLoading) {
            switch (requestNewActivationCodeResponseStatus) {
                case 0:
                    setFlashMessage("Conexión rechazada", "No pudimos establecer una conexión con nuestros servidores. Por favor, intente más tarde")
                    break
                case 400:
                    setFlashMessage("Solicitud no válida", "Los datos introducidos no son válidos. Por favor, verifique la información e intente nuevamente")
                    break                    
                default:
                    setFlashMessage("Ocurrió un error", "Ocurrió un error inesperado. Por favor, intente más tarde")
            }
            return
        }        
    }, [requestNewActivationCodeError, requestNewActivationCodeIsLoading, requestNewActivationCodeResponseStatus])

    const sendNewActivationCode = () => {
        requestNewActivationCode(`/users/${data?.userId}/verify`, {
            method: "PUT",
            body: JSON.stringify({
                emailAddress: data?.emailAddress
            })
        })
        setCanRequestNewCode(false)
    }

    useEffect(() => {
        if (!canRequestNewCode) {
            setTimeout(() => {
                setCanRequestNewCode(true)
            }, 5000)
        }
    }, [canRequestNewCode])

    return (
        <div className="flex flex-col w-full justify-around">
            <Formik
                initialValues={{
                    verificationCode: ""
                }}
                validationSchema={Yup.object({
                    verificationCode: Yup.string()
                        .trim()
                        .required("Este campo es obligatorio")
                        .length(8, "El código de verificación debe tener 8 dígitos"),
                })}
                onSubmit={(values) => {
                    sendAccountActivationRequest(`/users/${data?.userId}/verify`, {
                        method: "PATCH",
                        body: JSON.stringify(values)
                    })
                }} >
                <Form className="w-full px-12">
                    <img src={BlackLogo} className="mx-auto my-10" alt="" />
                    <p className="font-bold text-2xl text-center mb-5">Verificar cuenta</p>
                    <StandardInput
                        id="verificationCode"
                        name="verificationCode"
                        label="Código de verificación"
                        placeholder="Ingrese el código que enviamos a su correo electrónico"
                        type="text" />
                    <button type="submit" className="btn-primary mx-auto">Verificar cuenta</button>
                </Form>
            </Formik>
            <div className="">
                <p className="text-sm text-gray-500 mb-3">
                    ¿No recibiste ningún código en tu dirección de correo?
                </p>
                <button
                    disabled={!canRequestNewCode}
                    className={
                        `btn-primary-outlined mx-auto ${canRequestNewCode ?
                            "hover:bg-yellow-500 hover:text-white transition-colors ease-linear" :
                            "cursor-wait"}`
                    }
                    onClick={sendNewActivationCode}>
                    Enviar nuevo código
                </button>
            </div>
        </div>
    )
}

export default AccountVerificationForm