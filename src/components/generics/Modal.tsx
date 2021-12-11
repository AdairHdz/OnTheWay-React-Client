import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactDOM from "react-dom"

const Modal: React.FC<{
    show: boolean,
    closeModalHandler: () => void,
}> = (props) => {
    const portalRoot = document.getElementById("portal")!
    const content = (
        <div className="modal">
            <div className="flex justify-end items-start mb-5">
                <FontAwesomeIcon
                    icon={faTimes} onClick={props.closeModalHandler}
                    className="cursor-pointer" />
            </div>
            {props.children}
        </div>
    )
    return ReactDOM.createPortal((
        props.show ? content : null
    ), portalRoot)
}

export default Modal