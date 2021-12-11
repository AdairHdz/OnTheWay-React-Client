import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"

const StarRate: React.FC<{
    rate: number,
    className?: string
}> = (props) => {
    let stars: JSX.Element[] = []

    let starCount = 0

    for (let i = 0; i < props.rate; i++) {
        stars.push(<FontAwesomeIcon icon={solidStar} key={i} className="text-yellow-300" />)
        starCount++
    }

    for (let i = starCount; i < 5; i++) {
        stars.push(<FontAwesomeIcon icon={emptyStar} key={i} className="text-yellow-300" />)
    }

    return (
        <div className={`${props.className}`}>
            {stars}
        </div>
    )
}

export default StarRate