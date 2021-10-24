import { useContext, useEffect, useState } from "react"
import useFetch from "../../hooks/use-fetch"
import Review from "../../responses/review"
import {AuthContext} from "../../store/AuthContext"
import ErrorMessage from "../generics/ErrorMessage"
import Paginator from "../generics/Paginator"
import Spinner from "../generics/Spinner"
import ReviewItem from "./ReviewItem"

const ReviewsList = () => {    
    const {data} = useContext(AuthContext)
    const {
        data: reviews,
        error,
        isLoading,
        sendRequest
    } = useFetch<Review[]>()

    useEffect(() => {        
        sendRequest(`http://127.0.0.1:8000/reviews/${data.id}?page=1&pageElements=5`)
    }, [data.id])
     
    useEffect(() => {

    }, [])
    return (
        <>
            <div className="w-full md:mt-10 md:w-11/12 md:mx-auto p-5 overflow-y-scroll max-h-screen">                
                {reviews && (
                    <>                    
                        {reviews.map(review => (
                            <ReviewItem key={review.id}
                                date={review.dateOfReview}
                                details={review.details}
                                score={review.score}
                                serviceRequester={review.requesterName} title={review.title} />
                        ))}
                        <Paginator />
                    </>
                )}

                {isLoading && <Spinner />}

                {error && !isLoading && (
                    <ErrorMessage />
                )}
            </div>            
            
        </>
    )
}

export default ReviewsList