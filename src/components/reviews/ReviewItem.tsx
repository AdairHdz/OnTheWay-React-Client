import StarRate from "../generics/StarRate"

const ReviewItem: React.FC<{
    title: string,
    serviceRequester: string,
    date: string,
    score: number
    details: string
}> = (props) => {
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
        </div>
    )
}

export default ReviewItem