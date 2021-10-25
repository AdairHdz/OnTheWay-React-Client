import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useFetch from "../../hooks/use-fetch"
import Modal from "../generics/Modal"

const NewServiceRequestForm: React.FC<{
    submitFormHandler: () => void,
    closeModalHandler: () => void
}> = (props) => {
    const {
        error,
        isLoading,
        sendRequest
    } = useFetch()

    return (
        <div>
            <div className="flex justify-end items-start mb-5">
                <FontAwesomeIcon icon={faTimes} onClick={props.closeModalHandler} className="cursor-pointer" />
            </div>
            <p className="text-center text-lg mb-5"></p>
        </div>
    )
}

export default NewServiceRequestForm