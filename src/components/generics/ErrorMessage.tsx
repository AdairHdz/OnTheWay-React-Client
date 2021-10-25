import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ErrorMessage: React.FC<{
    errorTitle?: string,
    errorMessage?: string,
    className?: string
}> = (props) => {
    return (
        <div className={`mx-auto my-auto ${props.className}`}>
            <FontAwesomeIcon icon={faExclamationCircle} className="text-5xl text-gray-400" />
            <p className="font-bold text-xl">
                {props.errorTitle ? props.errorTitle : "Ocurrió un error"}
            </p>
            <p className="font-light">
                {props.errorMessage ? props.errorMessage : "Por favor, intente más tarde"}
            </p>
        </div>
    )
}

export default ErrorMessage