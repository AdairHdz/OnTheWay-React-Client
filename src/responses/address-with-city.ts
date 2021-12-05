import City from "./city"

type AddressWithCity = {
    id: string,
    indoorNumber: string,
    outdoorNumber: string,
    street: string,
    suburb: string,
    city: City|undefined
}

export default AddressWithCity