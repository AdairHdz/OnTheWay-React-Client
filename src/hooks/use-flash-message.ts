import { useContext } from "react"
import { FlashContext } from "../store/FlashContext"
import FlashMessage from "../utils/history-params/flash-message"

const useFlashMessage = (): {
    message: FlashMessage|undefined,
    setFlashMessage: (title: string, message: string) => void,
    resetFlashMessage: () => void
} => {
    const {
        message,
        clearFlashMessage,
        setFlashMessage: setMessage
    } = useContext(FlashContext)

    const setFlashMessage = (title: string, message: string) => {
        clearFlashMessage()
        setMessage(title, message)
    }

    const resetFlashMessage = () => {
        clearFlashMessage()
    }

    // useEffect(() => {
    //     return () => {
    //         if(message) {                
    //             clearFlashMessage()
    //         }
    //     }
    // }, [message, clearFlashMessage])

    return {
        message,
        setFlashMessage,
        resetFlashMessage
    }
}

export default useFlashMessage