import { Form, Formik } from 'formik';
import * as Yup from "yup"
import StandardInput from './generics/StandardInput';
import BlackLogo from "../assets/images/logo.png"
import { Link, useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../store/AuthContext';
import Login from '../responses/login';
import useFetch from '../hooks/use-fetch';
import useFlashMessage from '../hooks/use-flash-message';

const LoginForm: React.FC<{
    className?: string,    
}> = (props) => {

    const authContext = useContext(AuthContext)
    const history = useHistory()
    const { setFlashMessage } = useFlashMessage()

    const {
        data: loginInfo,
        error: loginError,
        isLoading: loginRequestIsLoading,
        sendRequest: sendLoginRequest,
        responseStatus: loginRequestResponseStatus
    } = useFetch<Login>()

    useEffect(() => {        
        if (loginInfo) {
            authContext.login(loginInfo)            
            if(!loginInfo.verified) {            
                history.push("/verify-account")
                return
            }
            
            history.push("/")
            return
        }                

        if (loginError && !loginRequestIsLoading) {        
            if(loginRequestResponseStatus === 403) {
                setFlashMessage("Credenciales incorrectas", "La dirección de correo electrónico o la contraseña no coinciden con nuestros registros")
                return
            }
            setFlashMessage("Ocurrió un error", "Ocurrió un error inesperado. Por favor, intente más tarde")
            return
        }
    }, [loginInfo, loginError, loginRequestIsLoading, authContext, history])

    return (
        <Formik
            initialValues={{
                emailAddress: "",
                password: "",
            }}
            validationSchema={Yup.object({
                emailAddress: Yup.string()
                    .trim()
                    .required("Este campo es obligatorio")
                    .email("Por favor inserte una dirección de correo válida")
                    .max(254, "Por favor inserte una dirección de correo con 254 caracteres o menos"),
                password: Yup.string()
                    .trim()    
                    .required("Este campo es obligatorio")
                    .max(50, "Por favor inserte una contraseña de longitud igual o menor a 50 caracteres"),
            })}
            onSubmit={(values) => {
                const init = {
                    method: "POST",
                    body: JSON.stringify(values)
                }
                sendLoginRequest("/users/login", init)
            }} >
            <div className="w-full lg:w-4/5 xl:w-2/3 rounded-b-lg lg:rounded-lg mx-auto lg:m-auto bg-white h-full flex">
                <Form className="m-auto w-full px-12">
                    <img src={BlackLogo} className="mx-auto my-10" alt="Black Logo" />
                    <p className="font-bold text-2xl text-center mb-5">Iniciar sesión</p>
                    <StandardInput
                        id="emailAddress"
                        name="emailAddress"
                        label='Correo electrónico'
                        placeholder="Correo electrónico"
                        type="email" />
                    <StandardInput
                        id="password"
                        name="password"
                        label='Contraseña'
                        placeholder="Contraseña"
                        type="password" />
                    <Link to="/" className="text-center block text-sm mt-10">
                        ¿Olvidaste tu contraseña?
                    </Link>
                    <button type="submit" disabled={loginRequestIsLoading} className="btn-primary mx-auto my-10">
                        Iniciar sesión
                    </button>
                    <Link to="/registry" className="text-center block text-sm text-blue-500">
                        Crear una cuenta
                    </Link>
                </Form>
            </div>
        </Formik>
    )
}

export default LoginForm