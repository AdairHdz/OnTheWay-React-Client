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
    const { setFlashMessage, message } = useFlashMessage()

    const {
        data,
        error,
        isLoading,
        sendRequest,
        responseStatus
    } = useFetch<Login>()

    useEffect(() => {        
        if (data) {
            authContext.login(data)            
            if(!data.verified) {            
                history.push("/verify-account")
                return
            }
            
            history.push("/")
            return
        }                

        if (error && !isLoading) {            
            setFlashMessage("Credenciales incorrectas", "La dirección de correo electrónico o la contraseña no coinciden con nuestros registros")
            return
        }
    }, [data, error, isLoading, authContext, history])

    return (
        <Formik
            initialValues={{
                emailAddress: "",
                password: "",
            }}
            validationSchema={Yup.object({
                emailAddress: Yup.string()
                    .required("Este campo es obligatorio")
                    .email("Por favor inserte una dirección de correo válida"),
                password: Yup.string()
                    .required("Este campo es obligatorio")
                    .min(8, "Por favor inserte una contraseña de al menos 8 caracteres")
                    .max(50, "Por favor inserte una contraseña de menos de 50 caracteres"),
            })}
            onSubmit={(values) => {
                const init = {
                    method: "POST",
                    body: JSON.stringify(values)
                }
                sendRequest("http://127.0.0.1:8000/users/login", init)
            }} >
            <div className="w-full lg:w-4/5 xl:w-2/3 rounded-b-lg lg:rounded-lg mx-auto lg:m-auto bg-white h-full flex">
                <Form className="m-auto w-full px-12">
                    <img src={BlackLogo} className="mx-auto my-10" alt="" />
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
                    <button type="submit" disabled={isLoading} className="btn-primary mx-auto my-10">
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