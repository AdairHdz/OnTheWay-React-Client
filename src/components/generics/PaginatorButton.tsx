import { faChevronLeft, faChevronRight, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import PaginatorButtonType from "../../enums/paginator-button-type"

const PaginatorButton: React.FC<{
    disabled: boolean,
    buttonType: PaginatorButtonType,
    clickHandler: () => void
}> = (props) => {

    let iconToBeShown

    switch (props.buttonType) {
        case PaginatorButtonType.FIRST_PAGE:
            iconToBeShown = faStepBackward
            break;
        case PaginatorButtonType.PREVIOUS_PAGE:
            iconToBeShown = faChevronLeft
            break
        case PaginatorButtonType.LAST_PAGE:
            iconToBeShown = faStepForward
            break
        default:
            iconToBeShown = faChevronRight
            break;
    }

    return (
        <FontAwesomeIcon 
            icon={iconToBeShown} 
            className={`${props.disabled ? 'text-gray-400' : 'cursor-pointer'}`}
            onClick={ props.disabled ? () => {} : props.clickHandler } />
    )
}

export default PaginatorButton