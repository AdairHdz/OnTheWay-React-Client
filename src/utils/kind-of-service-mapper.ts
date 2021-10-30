import KindOfService from "../enums/kind-of-service"

const getKindOfService = (kindOfServiceNumber: number): string => {
    let kindOfServiceName
    switch(kindOfServiceNumber) {
        case KindOfService.DELIVERY:
            kindOfServiceName = "Entrega"
            break
        case KindOfService.DRUG_SHOPPING:
            kindOfServiceName = "Compra de fármacos"
            break
        case KindOfService.GROCERY_SHOPPING:
            kindOfServiceName = "Compra de víveres"
            break
        case KindOfService.OTHER:
            kindOfServiceName = "Otro"
            break
        case KindOfService.SERVICE_PAYMENT:
            kindOfServiceName = "Pago de servicios"
            break
        default:
            kindOfServiceName = "No definido"
    }
    return kindOfServiceName
}

export default getKindOfService