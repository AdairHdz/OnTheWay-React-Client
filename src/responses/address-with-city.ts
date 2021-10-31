import City from "./city"

class AddressWithCity {
    id = ""
    indoorNumber = ""
    outdoorNumber = ""
    street = ""
    suburb = ""
    city: City|undefined
}

export default AddressWithCity