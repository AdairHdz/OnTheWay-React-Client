const ServiceRequestItem = () => {
    return (
        <div className="rounded-xl bg-blue-500 flex text-white justify-between p-2 text-left gap-3 items-center">
            <figure className="w-12 h-12">
                <img
                    className="rounded-full w-full h-full"
                    src="https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=130&w=220" alt="" />
            </figure>
            <div className="flex-grow">
                <p className="font-bold text-sm lg:text-lg">Compra de fármacos</p>
                <div className="flex gap-5">
                    <p className="font-light text-xs lg:text-lg">08/03/2021</p>
                    <p className="font-light text-xs lg:text-lg">01:56 P.M.</p>
                </div>
            </div>
            <p className="font-light text-xs lg:text-lg italic self-start">En proceso</p>
        </div>
    )
}

export default ServiceRequestItem