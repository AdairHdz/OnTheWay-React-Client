import NotFoundImage from "../assets/images/not_found.png"

const NotFoundPage = () => {
    return (
        <figure className="h-screen w-screen">
            <img className="h-full w-full" src={NotFoundImage} alt="Page Not Found" />
        </figure>
    )
}

export default NotFoundPage