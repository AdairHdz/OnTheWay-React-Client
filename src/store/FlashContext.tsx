import React, { useState } from "react"
import FlashMessage from "../utils/history-params/flash-message"

type FlashContextType = {
    message: FlashMessage|undefined,
    setFlashMessage: (title: string, message: string) => void,
    clearFlashMessage: () => void
}

const defaultValues = {
    message: undefined,
    setFlashMessage: (title: string, message: string) => {},
    clearFlashMessage: () => {}
}

export const FlashContext = React.createContext<FlashContextType>(defaultValues)

const FlashContextProvider: React.FC = (props) => {
    const [message, setMessage] = useState<FlashMessage|undefined>()

    const setFlashMessage = (title: string, message: string) => {
        setMessage(new FlashMessage(title, message))
    }

    const clearFlashMessage = () => {
        setMessage(undefined)
    }

    const flashContextValues: FlashContextType = {
        message,
        setFlashMessage,
        clearFlashMessage
    }

    return (
        <FlashContext.Provider value={flashContextValues}>
            {props.children}
        </FlashContext.Provider>
    )
}

export default FlashContextProvider