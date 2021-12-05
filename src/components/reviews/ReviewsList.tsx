import { useContext, useEffect } from "react"
import HTTPRequestError from "../../models/http-request-error"
import PaginatedReview from "../../responses/paginated-review"
import ErrorMessage from "../generics/ErrorMessage"
import Paginator from "../generics/Paginator"
import Spinner from "../generics/Spinner"
import ReviewItem from "./ReviewItem"
import { AuthContext } from "../../store/AuthContext"

const ReviewsList: React.FC<{
    reviews: PaginatedReview,
    error: HTTPRequestError|undefined,
    isLoading: boolean,
    responseStatus: number|undefined
    fetchReviews: (url: string) => void
}> = (props) => {        

    const {data, token} = useContext(AuthContext)
    useEffect(() => {        
        props.fetchReviews(`providers/${data?.id}/reviews?page=1&pageSize=5`)
    }, [token])    

    useEffect(() => {
        if(props.reviews) {
            console.log(props.reviews)
        }
    }, [props.reviews])
     
    const renderReviewsError = () => {
        if(props.error && !props.isLoading) {
            if(props.responseStatus && props.responseStatus === 404) {
                return (
                    <ErrorMessage errorTitle="Sin resultados"
                        errorMessage="Parece ser que aún no hay reseñas" />
                )
            }
            return <ErrorMessage />
        }
        return null
    }

    return (
        <>
            <div className="w-full md:mt-10 md:w-11/12 md:mx-auto p-5 overflow-y-auto max-h-screen">                
                {props.reviews !== undefined && (
                    <>                    
                        {props.reviews.data && props.reviews.data.map(review => (
                            <ReviewItem key={review.id}
                                id={review.id}
                                date={review.dateOfReview}
                                details={review.details}
                                score={review.score}
                                serviceRequester={review.requesterName} title={review.title}
                                evidence={review.evidence} />
                        ))}
                        <Paginator                            
                            paginationLinks={{
                                links: props.reviews.links,
                                page: props.reviews.page,
                                pages: props.reviews.pages,
                                perPage: props.reviews.perPage,
                                total: props.reviews.total
                            }}
                            goToPreviousPageHandler={ () => { props.fetchReviews(props.reviews.links!.prev!) } }
                            goToNextPageHandler={ () => { props.fetchReviews(props.reviews.links!.next!) } }
                            goToFirstPageHandler={ () => { props.fetchReviews(props.reviews.links!.first!) } }
                            goToLastPageHandler={ () => { props.fetchReviews(props.reviews.links!.last!) } } />
                    </>
                )}

                {props.isLoading && <Spinner />}

                { renderReviewsError() }
            </div>            
            
        </>
    )
}

export default ReviewsList