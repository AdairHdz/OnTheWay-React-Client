import StarRate from "../generics/StarRate"

const ServiceProviderItem = () => {
    return (
        <div className="rounded-xl bg-blue-500 flex text-white justify-between p-2 text-left gap-3 items-center mb-5">
            <div className="rounded-full w-16 h-16 bg-white flex justify-center items-center">
                <p className="text-blue-500 font-bold text-lg">$50.00</p>
            </div>
            <div className="flex-grow">
                <p className="font-bold text-sm lg:text-lg">Nombre del negocio</p>
                <div className="flex gap-5">
                    <p className="font-light text-xs lg:text-lg italic">Disponible</p>
                    <StarRate rate={5} />
                </div>
            </div>
        </div>
    )
}

export default ServiceProviderItem