import Evidence from "./evidence"

class ReviewWithRequesterId {    
    id: string|undefined
    title: string|undefined
    dateOfReview: string|undefined
    details: string|undefined
    score: number|undefined
    serviceRequesterId: string|undefined
    evidences: Evidence[]|undefined
}

export default ReviewWithRequesterId