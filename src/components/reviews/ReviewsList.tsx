import { useContext, useEffect, useState } from "react"
import useFetch from "../../hooks/use-fetch"
import HTTPRequestError from "../../models/http-request-error"
import Review from "../../responses/review"
import {AuthContext} from "../../store/AuthContext"
import ErrorMessage from "../generics/ErrorMessage"
import Paginator from "../generics/Paginator"
import Spinner from "../generics/Spinner"
import ReviewItem from "./ReviewItem"

const ReviewsList: React.FC<{
    data: Review[],
    error: HTTPRequestError|undefined,
    isLoading: boolean,
    sendRequest: () => void
}> = (props) => {        

    useEffect(() => {        
        props.sendRequest()
    }, [])
     
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="w-full md:mt-10 md:w-11/12 md:mx-auto p-5 overflow-y-scroll max-h-screen">                
                {props.data && (
                    <>                    
                        {props.data.map(review => (
                            <ReviewItem key={review.id}
                                date={review.dateOfReview}
                                details={review.details}
                                score={review.score}
                                serviceRequester={review.requesterName} title={review.title} />
                        ))}
                        <Paginator />
                    </>
                )}

                {props.isLoading && <Spinner />}

                {props.error && !props.isLoading && (
                    <ErrorMessage />
                )}
            </div>            
            
        </>
    )
}

export default ReviewsList