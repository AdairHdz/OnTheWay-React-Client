import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const Paginator: React.FC<{
    className?: string
}> = (props) => {
    return (
        <div className={`flex justify-around items-center text-blue-600 my-5 ${props.className}`}>
            <Link to="/">
                <FontAwesomeIcon icon={faStepBackward} />
            </Link>
            <Link to="/">
                <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
            <span> 1 </span>
            <Link to="/">
                <FontAwesomeIcon icon={faChevronRight} />
            </Link>
            <Link to="/">
                <FontAwesomeIcon icon={faStepForward} />
            </Link>                                    
        </div>
    )
}

export default Paginator