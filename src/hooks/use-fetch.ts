import { useState } from "react"
import HTTPRequestError from "../models/http-request-error"

const useFetch = <T>(): {
    error: HTTPRequestError|undefined,
    isLoading: boolean,
    sendRequest: <T>(url: string, init?: RequestInit) => Promise<T>,
    data: T
} => {

    const [error, setError] = useState<HTTPRequestError|undefined>(undefined)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>()
    
    const sendRequest = async <Type>(url: string, init?: RequestInit): Promise<any> => {
        setIsLoading(true)
        setData(undefined)
        setError(undefined)
        try {
            let request
            if(init) {
                request = await fetch(url, init)
            } else {
                request = await fetch(url)
            }
                
            if(request.ok) {
                const response: Type = await request.json()            
                setData(response)
                setError(undefined)
                return
            }
            const response: HTTPRequestError = await request.json()
            setError({...response})
        } catch(error) {
            setError({
                name: "Conexión rechazada",
                message: "No pudimos establecer una conexión con nuestros servidores. Por favor, intente más tarde",
                statusCode: 0,
            })
        } finally {            
            setIsLoading(false)
        }                        
    }    
    
    return {
        error,
        isLoading,
        sendRequest,
        data
    }
}

export default useFetch