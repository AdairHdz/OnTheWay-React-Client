import { useState } from "react"
import HTTPRequestError from "../models/http-request-error"

const useFetch = <T>(): {
    error: HTTPRequestError|undefined,
    isLoading: boolean,
    sendRequest: <T>(url: string, init?: RequestInit) => Promise<T>,
    data: T
} => {

    const [error, setError] = useState<HTTPRequestError|undefined>(undefined)

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [data, setData] = useState<any>()
    
    const sendRequest = async <Type>(url: string, init?: RequestInit): Promise<any> => {        
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
                return
            }            
            const response: HTTPRequestError = await request.json()
            setError({...response})
            // throw new HTTPRequestError("")
            throw error
        } catch(error) {
            if(error !instanceof HTTPRequestError) {
                setError({
                    name: "Connection Refused",
                    message: "We couldn't stablish a connection with our servers. Please try again later",
                    statusCode: 0,
                })    
            }
            throw new Error()
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