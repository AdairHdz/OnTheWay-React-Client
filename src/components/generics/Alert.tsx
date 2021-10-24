import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react'

const Alert: React.FC<{
    className?: string,
    title: string,
    message: string,    
    show: boolean|undefined,
    screenTime?: number
}> = (props) => {

    const [display, setDisplay] = useState<boolean>(true)    

    useEffect(() => {
        if(props.show) {
            setDisplay(true)
        }
    }, [props.show])

    useEffect(() => {
        if(props.show) {                        
            setTimeout(() => {
                setDisplay(false)
            }, props.screenTime ? props.screenTime : 5000)
        }        
    })

    if(props.show && display) {
        return (
            <div className={`rounded-md shadow p-5 bg-white ${props.className}`}>
                <div className="flex justify-end">
                    <FontAwesomeIcon icon={faTimes} className="text-gray-600" onClick={() => setDisplay(false)}/>
                </div>
                <p className="font-bold"> {props.title} </p>
                <p className="text-sm text-justify"> {props.message} </p>
            </div>
        )
    }
    return null
}

export default Alert