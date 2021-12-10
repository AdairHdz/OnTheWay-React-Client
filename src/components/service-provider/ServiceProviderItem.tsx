import StarRate from "../generics/StarRate"

const ServiceProviderItem: React.FC<{
    priceRate: number,
    serviceProviderName: string,
    serviceProviderAverageScore: number,
    businessName: string

}> = (props) => {
    return (
        <div className={`
            rounded-xl bg-blue-500 flex
            text-white justify-between p-2
            text-left gap-3 items-center mb-5`
        }>
            <div className="rounded-full w-16 h-16 bg-white flex justify-center items-center">
                <p className="text-blue-500 font-bold text-sm text-center">${props.priceRate}</p>
            </div>
            <div className="flex-grow">
                <p className="font-bold text-sm lg:text-lg"> {props.businessName} </p>
                <p className="font-thin text-xs lg:text-lg"> {props.serviceProviderName} </p>
                <div className="flex gap-5">
                    <StarRate rate={props.serviceProviderAverageScore} />
                </div>
            </div>
        </div>
    )
}

export default ServiceProviderItem