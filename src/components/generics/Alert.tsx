import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import useFlashMessage from '../../hooks/use-flash-message'

const Alert: React.FC<{
    className?: string,
    title: string,
    message: string,    
    show: boolean|undefined,
    screenTime?: number,
    closeAlertHandler?: () => void
}> = (props) => {

    const [display, setDisplay] = useState<boolean>(true)    
    const { resetFlashMessage } = useFlashMessage()

    useEffect(() => {
        if(props.show) {
            setDisplay(true)            
        }
    }, [props.show])

    useEffect(() => {
        let messageTimeout: NodeJS.Timeout
        if(props.show) {                        
            messageTimeout = setTimeout(() => {
                resetFlashMessage()
            }, props.screenTime ? props.screenTime : 5000)
        }

        return () => {
            clearTimeout(messageTimeout)
        }
    })

    const closeHandler = () => {
        resetFlashMessage()
    }

    if(props.show && display) {
        return (
            <div className={`rounded-md shadow p-5 bg-white ${props.className}`}>
                <div className="flex justify-end">
                    <FontAwesomeIcon icon={faTimes} className="text-gray-600" onClick={closeHandler}/>
                </div>
                <p className="font-bold"> {props.title} </p>
                <p className="text-sm text-justify"> {props.message} </p>
            </div>
        )
    }
    return null
}

export default Alert