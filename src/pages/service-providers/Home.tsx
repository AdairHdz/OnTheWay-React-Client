import { useCallback, useContext, useState } from "react"
import NewPriceRateForm from "../../components/service-provider/price-rate/NewPriceRateForm"
import PriceRatesList from "../../components/service-provider/price-rate/PriceRatesList"
import ReviewsList from "../../components/reviews/ReviewsList"
import InfoOVerview from "../../components/service-provider/InfoOverview"
import PriceRate from "../../responses/price-rate"
import { AuthContext } from "../../store/AuthContext"

const HomePage = () => {
    const [showNewPriceRateForm, setShowNewPriceRateForm] = useState(false)    
    const openPriceRateFormModal = () => setShowNewPriceRateForm(true)
    const closePriceRateModal = () => setShowNewPriceRateForm(false)    

    const {data} = useContext(AuthContext)
    const [priceRates, setPriceRates] = useState<PriceRate[]>()
    const [error, setError] = useState<string>("")

    const fetchPriceRates = useCallback(() => {
        fetch(`http://127.0.0.1:8000/price-rates/${data.id}`)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            setError("No se encontraron tarifas")
        })
        .then((data: PriceRate[]) => {            
            setPriceRates(data)
        })
        .catch(err => console.log(err))
    }, [data.id])
    return (
        <>
            <div className="shadow-md bg-white flex-grow-0 mb-5">
                <InfoOVerview />
            </div>
            <div className="flex flex-col lg:flex-row gap-5 relative py-5 px-6">
                <div className="shadow-md bg-white flex-grow relative lg:w-1/2 xl:w-5/12 mb-5">
                    <p className="text-2xl font-bold p-5 text-center mt-5">Tarifas</p>
                    <PriceRatesList
                        fetchPriceRatesHandler={fetchPriceRates}
                        priceRates={priceRates}
                        openModalHandler={openPriceRateFormModal} />
                </div>
                <div className="shadow-md bg-white flex-grow mb-5 lg:w-1/2 xl:w-7/12 md:p-5">
                    <p className="text-2xl mb-5 font-bold p-5 text-center">Reseñas</p>  
                    <ReviewsList />
                </div>
            </div>
            { showNewPriceRateForm && (
                <NewPriceRateForm
                submitFormHandler={fetchPriceRates}
                closeModalHandler={closePriceRateModal} />
            ) }
        </>

    )
}

export default HomePage