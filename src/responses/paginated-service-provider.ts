import PaginationLinks from "./pagination-links";
import ServiceProviderSearchResult from "./service-provider-search-result";

class PaginatedServiceProvider implements PaginationLinks {
    links: { first: string | undefined; last: string | undefined; prev: string | undefined; next: string | undefined; } | undefined;
    page: number | undefined;
    pages: number | undefined;
    perPage: number | undefined;
    total: number | undefined;
    data: ServiceProviderSearchResult[] = []
}

export default PaginatedServiceProvider