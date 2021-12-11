import Image from "../assets/images/white-logo.png"
import AccountVerificationForm from "../components/AccountVerificationForm"
import Alert from "../components/generics/Alert"
import useFlashMessage from "../hooks/use-flash-message"

const AccountVerificationPage = () => {
    const { message } = useFlashMessage()

    return (
        <div className="flex flex-col md:flex-row h-screen bg-blue-600 md:bg-white">
            <div className="bg-blue-600 hidden md:w-1/2 h-full md:flex">
                <img src={Image} className="hidden md:block m-auto" alt="App Logo" />
            </div>
            <div className="w-full h-full md:w-1/2 flex relative bg-white">
                <Alert
                    className="absolute w-72 left-1/2 -ml-36 top-8"
                    show={message !== undefined} title={message?.title || ""}
                    message={message?.message || ""} />
                <AccountVerificationForm />
            </div>
        </div>
    )
}

export default AccountVerificationPage