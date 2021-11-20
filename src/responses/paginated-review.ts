// import PaginationLinks from "./pagination-links";
import PaginationLinks from "./pagination-links";
import Review from "./review";

class PaginatedReview implements PaginationLinks {
    links: { first: string | undefined; last: string | undefined; prev: string | undefined; next: string | undefined; } | undefined;
    page: number | undefined;
    pages: number | undefined;
    perPage: number | undefined;
    total: number | undefined;
    data: Review[]|undefined    
}

export default PaginatedReview