import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

const StarScore: React.FC<{
    changeHandler: (currentValue: number) => void
}> = (props) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(1)

    const [stars, setStars] = useState<JSX.Element[]>([
        <FontAwesomeIcon
            className='text-yellow-400 text-3xl'
            key={1} icon={solidStar}
            onClick={() => setSelectedIndex(1)} />,
        <FontAwesomeIcon
            className='text-yellow-400 text-3xl'
            key={2} icon={emptyStar}
            onClick={() => setSelectedIndex(2)} />,
        <FontAwesomeIcon
            className='text-yellow-400 text-3xl'
            key={3} icon={emptyStar}
            onClick={() => setSelectedIndex(3)} />,
        <FontAwesomeIcon
            className='text-yellow-400 text-3xl'
            key={4} icon={emptyStar}
            onClick={() => setSelectedIndex(4)} />,
        <FontAwesomeIcon
            className='text-yellow-400 text-3xl'
            key={5} icon={emptyStar}
            onClick={() => setSelectedIndex(5)} />,
    ])

    useEffect(() => {
        setStars([
            <FontAwesomeIcon
                className='text-yellow-400 text-3xl'
                key={1} icon={selectedIndex >= 1 ? solidStar : emptyStar}
                onClick={() => {
                    props.changeHandler(1)
                    setSelectedIndex(1)
            }} />,
            <FontAwesomeIcon
                className='text-yellow-400 text-3xl'
                key={2} icon={selectedIndex >= 2 ? solidStar : emptyStar}
                onClick={() => {
                    props.changeHandler(2)
                    setSelectedIndex(2)
            }} />,
            <FontAwesomeIcon
                className='text-yellow-400 text-3xl'
                key={3} icon={selectedIndex >= 3 ? solidStar : emptyStar}
                onClick={() => {
                    props.changeHandler(3)
                    setSelectedIndex(3)
            }} />,
            <FontAwesomeIcon
                className='text-yellow-400 text-3xl'
                key={4} icon={selectedIndex >= 4 ? solidStar : emptyStar}
                onClick={() => {
                    props.changeHandler(4)
                    setSelectedIndex(4)
            }} />,
            <FontAwesomeIcon
                className='text-yellow-400 text-3xl'
                key={5} icon={selectedIndex >= 5 ? solidStar : emptyStar}
                onClick={() => {
                    props.changeHandler(5)
                    setSelectedIndex(5)
            }} />,
        ])


    }, [selectedIndex])

    return (
        <div className="flex justify-center p-5">
            {stars}
        </div>
    )

}

export default StarScore