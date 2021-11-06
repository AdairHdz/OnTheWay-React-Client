import { useEffect } from "react"
import HTTPRequestError from "../../models/http-request-error"
import Review from "../../responses/review"
import ErrorMessage from "../generics/ErrorMessage"
import Paginator from "../generics/Paginator"
import Spinner from "../generics/Spinner"
import ReviewItem from "./ReviewItem"

const ReviewsList: React.FC<{
    data: Review[],
    error: HTTPRequestError|undefined,
    isLoading: boolean,
    responseStatus: number|undefined
    sendRequest: () => void
}> = (props) => {        

    useEffect(() => {        
        props.sendRequest()
    }, [])
     
    const renderReviewsError = () => {
        if(props.error && !props.isLoading) {
            if(props.responseStatus && props.responseStatus === 404) {
                return (
                    <ErrorMessage errorTitle="Sin resultados"
                        errorMessage="Parece ser que aún no hay reseñas" />
                )
            }
            <ErrorMessage />
        }
        return null
    }

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

                { renderReviewsError() }
            </div>            
            
        </>
    )
}

export default ReviewsList