import { useContext, useEffect, useState } from "react"
import Review from "../../responses/review"
import {AuthContext} from "../../store/AuthContext"
import Paginator from "../generics/Paginator"
import ReviewItem from "./ReviewItem"

const ReviewsList = () => {
    const [error, setError] = useState<string>("")
    const [reviews, setReviews] = useState<Review[]>([])
    const {data} = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/reviews/${data.id}?page=1&pageElements=5`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            setError("No se encontraron reseñas")
        })
        .then((data: Review[]) => {            
            setReviews(data)
        })
        .catch(err => console.log(err))
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
                {error && <p> {error} </p>}
            </div>            
            
        </>
    )
}

export default ReviewsList