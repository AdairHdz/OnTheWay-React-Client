import RegistryForm from "../components/RegistryForm"
import Image from "../assets/images/white-logo.png"

const RegistryPage = () => {

    return (    
        <div className="flex flex-col md:flex-row h-screen bg-blue-600 md:bg-white">
            <figure className="md:bg-blue-600 hidden h-screen md:w-1/2 md:flex">
                <img src={Image} className="hidden md:block m-auto" alt="Logo de la aplicación" />
            </figure>
            <div className="w-full md:w-1/2 flex relative max-h-screen overflow-auto">
                <RegistryForm className="h-screen md:h-auto" />
            </div>
        </div>
    )
}

export default RegistryPage