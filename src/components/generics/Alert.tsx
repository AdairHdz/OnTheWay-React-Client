import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Alert: React.FC<{
    className?: string,
    title: string,
    message: string,
    closeHandler: () => void
}> = (props) => {
    return (
        <div className={`rounded-md shadow p-5 bg-white ${props.className}`}>
            <div className="flex justify-end">
                <FontAwesomeIcon icon={faTimes} className="text-gray-600" onClick={props.closeHandler}/>
            </div>
            <p className="font-bold"> {props.title} </p>
            <p className="text-sm text-justify"> {props.message} </p>
        </div>
    )
}

export default Alert