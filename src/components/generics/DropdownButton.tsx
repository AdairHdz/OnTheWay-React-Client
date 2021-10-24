import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

const DropdownButton: React.FC<{
    textWhenActive: string,
    textWhenInactive: string,
    isActive: boolean,
    toggleHandler: () => void
}> = (props) => {
        
    return (
        <div className="p-3 mx-auto text-center flex justify-center items-center gap-3 cursor-pointer" onClick={props.toggleHandler}>
            { props.isActive && <p> {props.textWhenActive} </p> }            
            { props.isActive && <FontAwesomeIcon icon={faChevronUp} className="text-lg" /> }

            { !props.isActive && <p> {props.textWhenInactive} </p>  }
            { !props.isActive && <FontAwesomeIcon icon={faChevronDown} className="text-lg" /> }
        </div>
    )
}

export default DropdownButton