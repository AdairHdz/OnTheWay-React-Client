import { useEffect } from "react"
import Evidence from "../../responses/evidence"
import StarRate from "../generics/StarRate"

const ReviewItem: React.FC<{
    id: string,
    title: string,
    serviceRequester: string,
    date: string,
    score: number
    details: string,
    evidence: Evidence[]
}> = (props) => {

    useEffect(() => {
        console.log(props.evidence)
    })

    return (
        <div className="shadow-md rounded-lg p-8 text-gray-800 mb-5 text-left">
            <p className="font-bold mb-1">
                {props.title}
            </p>
            <p className="text-gray-400">
                {props.serviceRequester}
            </p>
            <p className="text-gray-400 mb-1">
                {props.date}
            </p>
            <StarRate
                rate={props.score}
                className="mb-4" />
            <p className="text-justify">
                {props.details}
            </p>
            <div>
                {props.evidence?.map(evidence => (
                    <a target="_blank"
                        rel="noreferrer"
                        href={`${process.env.REACT_APP_BASE_API_URL}:${process.env.REACT_APP_BASE_API_PORT}/reviews/${props.id}/${evidence.fileName}`}
                        className="text-blue-600 block"
                        > {evidence.fileName} </a>
                ))}
            </div>
        </div>
    )
}

export default ReviewItem