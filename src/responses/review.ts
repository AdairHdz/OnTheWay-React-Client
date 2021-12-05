import Evidence from "./evidence"

type Review = {
    id: string,
    title: string,
    dateOfReview: string,
    details: string,
    score: number,
    requesterName: string,
    evidence: Evidence[]
}

export default Review