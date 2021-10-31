import { useContext, useEffect } from "react"
import { FlashContext } from "../store/FlashContext"
import FlashMessage from "../utils/history-params/flash-message"

const useFlashMessage = (): {
    message: FlashMessage|undefined,
    setFlashMessage: (title: string, message: string) => void
} => {
    const {
        message,
        clearFlashMessage,
        setFlashMessage: setMessage
    } = useContext(FlashContext)

    const setFlashMessage = (title: string, message: string) => {
        setMessage(title, message)
    }

    useEffect(() => {
        return () => {
            if(message) {
                console.log("Limpi an do")
                clearFlashMessage()
            }
        }
    }, [message, clearFlashMessage])

    return {
        message,
        setFlashMessage
    }
}

export default useFlashMessage