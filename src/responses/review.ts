import Evidence from "./evidence"

class Review {
    id = ""
    title = ""
    dateOfReview = ""
    details = ""
    score = 0
    requesterName = ""
    evidence: Evidence[] = []
}

export default Review