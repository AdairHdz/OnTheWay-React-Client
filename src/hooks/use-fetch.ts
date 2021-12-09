import { useContext, useEffect, useState } from "react"
import HTTPRequestError from "../models/http-request-error"
import { AuthContext } from "../store/AuthContext"

const useFetch = <T>(): {
    error: HTTPRequestError|undefined,
    isLoading: boolean,
    sendRequest: <T>(url: string, init?: RequestInit) => Promise<T>,
    data: T,
    responseStatus: number|undefined
} => {

    const {token} = useContext(AuthContext)
    const [error, setError] = useState<HTTPRequestError|undefined>(undefined)
    const [responseStatus, setResponseStatus] = useState<number|undefined>(undefined)

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<any>()    
    
    const sendRequest = async <Type>(url: string, init?: RequestInit): Promise<any> => {
        
        setIsLoading(true)
        setData(undefined)
        setError(undefined)        
        try {
            let request
            if(init) {
                request = await fetch(`${process.env.REACT_APP_BASE_API_URL}:${process.env.REACT_APP_BASE_API_PORT}${url}`, {
                    ...init,
                    headers: new Headers({
                        "Authorization": `Bearer ${token}`
                    }),
                    credentials: "include"
                })
            } else {
                request = await fetch(`${process.env.REACT_APP_BASE_API_URL}:${process.env.REACT_APP_BASE_API_PORT}${url}`, {
                    headers: new Headers({
                        "Authorization": `Bearer ${token}`
                    }),
                    credentials: "include",                    
                })
            }
            setResponseStatus(request.status)
            if(request.ok) {
                if(request.status !== 204) {
                    const response: Type = await request.json()
                    setData(response)
                }                
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
        data,
        responseStatus
    }
}

export default useFetch