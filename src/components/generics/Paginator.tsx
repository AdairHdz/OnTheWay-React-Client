import PaginationLinks from "../../responses/pagination-links"
import PaginatorButton from "./PaginatorButton"
import PaginatorButtonType from "../../enums/paginator-button-type"

const Paginator: React.FC<{
    className?: string,
    paginationLinks: PaginationLinks,
    goToFirstPageHandler: () => void,
    goToPreviousPageHandler: () => void,
    goToNextPageHandler: () => void,
    goToLastPageHandler: () => void,
}> = (props) => {
    return (
        <div className={`flex justify-around items-center text-blue-600 my-5 ${props.className}`}>
            <PaginatorButton
                disabled={props.paginationLinks.page === 1}
                buttonType={PaginatorButtonType.FIRST_PAGE}
                clickHandler={props.goToFirstPageHandler} />
            <PaginatorButton
                disabled={props.paginationLinks.page === 1}
                buttonType={PaginatorButtonType.PREVIOUS_PAGE}
                clickHandler={props.goToPreviousPageHandler} />
            <span> { props.paginationLinks.page } </span>
            <PaginatorButton
                disabled={props.paginationLinks.page === props.paginationLinks.pages}
                buttonType={PaginatorButtonType.NEXT_PAGE}
                clickHandler={props.goToNextPageHandler} />
            <PaginatorButton
                disabled={props.paginationLinks.page === props.paginationLinks.pages}
                buttonType={PaginatorButtonType.LAST_PAGE}
                clickHandler={props.goToLastPageHandler} />            
        </div>
    )
}

export default Paginator