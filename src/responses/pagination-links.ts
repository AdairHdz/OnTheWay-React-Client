interface PaginationLinks {
    links: {
        first:string|undefined,
        last:string|undefined,
        prev:string|undefined,
        next:string|undefined
    }|undefined,
    page: number|undefined,
    pages: number|undefined,
    perPage: number|undefined,
    total: number|undefined,
}

export default PaginationLinks