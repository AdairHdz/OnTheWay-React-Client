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
        error: accountActivationError
    } = useFetch()

    const {
        sendRequest: requestNewActivationCode
    } = useFetch()

    const [canRequestNewCode, setCanRequestNewCode] = useState(true)

    const {data, activateAccount} = useContext(AuthContext)

    const history = useHistory()
    const {setFlashMessage} = useFlashMessage()

    useEffect(() => {
        if(accountActivationResponseStatus === 204) {
            activateAccount()
            setFlashMessage("Cuenta verificada", "Hemos verificado su cuenta. Ahora podrá iniciar sesión")
            history.push("/")
        }
    }, [accountActivationResponseStatus])

    useEffect(() => {
        if(accountActivationError) {
            setFlashMessage("Error", "No se ha podido verificar su cuenta. Por favor, intente más tarde")
        }
    }, [accountActivationError])

    const sendNewActivationCode = () => {        
        requestNewActivationCode(`/users/${data?.userId}/verify`, {
            method: "PUT",
            body: JSON.stringify({
                emailAddress: data?.emailAddress
            })
        })
        setCanRequestNewCode(false)
        setFlashMessage("Nuevo código", "Hemos enviado un nuevo código de verificación a tu dirección de correo electrónico")
    }

    useEffect(() => {
        if(!canRequestNewCode) {
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
                    className={`btn-primary-outlined mx-auto ${canRequestNewCode ? "hover:bg-yellow-500 hover:text-white transition-colors ease-linear" : "cursor-wait"}`}
                    onClick={sendNewActivationCode}>
                    Enviar nuevo código
                </button>
            </div>
        </div>
    )
}

export default AccountVerificationForm