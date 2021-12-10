import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ReactDOM from "react-dom"

const Modal: React.FC<{
    show: boolean,
    closeModalHandler: () => void,
}> = (props) => {
    const portalRoot = document.getElementById("portal")!
    const content = (
        <div className={`
            rounded-lg p-8 shadow-lg z-10 absolute
            top-0 xl:top-32 xl:left-1/3 left-0
            md:left-1/3 w-full h-full md:h-screen
            overflow-y-auto md:w-1/2 lg:h-1/2
            lg:top-1/3 xl:h-3/4 xl:w-1/3 bg-white`}>
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