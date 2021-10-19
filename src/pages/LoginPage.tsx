import Image from "../assets/images/white-logo.png"
import LoginForm from "../components/LoginForm"
import { useEffect, useState } from "react"
import Alert from "../components/generics/Alert"
import { useHistory } from "react-router"


const LoginPage = () => {

    const [showAlert, setShowAlert] = useState<boolean>(false)    
    const [showLoginError, setShowLoginError] = useState<boolean>(false)

    const dismissAlert = () => {
        setShowAlert(false)
    }

    const showLoginErrorAlert = (httpStatusCode: number) => {
        if(httpStatusCode === 403) {
            setShowLoginError(true)
            setTimeout(() => {
                setShowLoginError(false)
            }, 3000)
        }        
    }

    const dismissLoginErrorAlert = () => {
        setShowLoginError(false)
    }
    
     const { location } = useHistory()
     const params = location.search
            
    useEffect(() => {
        if(params.includes("?success=true")) {
            setShowAlert(true)
            setTimeout(() => {
                setShowAlert(false)
            }, 3000)
         }
    }, [params])

    return (
        <div className="flex flex-col md:flex-row h-screen bg-blue-600 md:bg-white">
            <div className="bg-blue-600 hidden md:w-1/2 h-full md:flex">
                <img src={Image} className="hidden md:block m-auto" alt="" />
            </div>
            <div className="w-full h-full md:w-1/2 flex relative">
            {showAlert ? <Alert className="absolute w-72 left-1/2 -ml-36 top-8" closeHandler={dismissAlert} title="Registro exitoso" message="El registro se ha realizado de forma exitosa. Luego de verificar su cuenta, podrá iniciar sesión." /> : null}
            {showLoginError ? <Alert className="absolute w-72 left-1/2 -ml-36 top-8" closeHandler={dismissLoginErrorAlert} title="Credenciales incorrectas" message="La dirección de correo electrónico o la contraseña no coinciden con nuestros registros" /> : null}
                <LoginForm showLoginErrorHandler={showLoginErrorAlert} />
            </div>
        </div>
    )
}

export default LoginPage