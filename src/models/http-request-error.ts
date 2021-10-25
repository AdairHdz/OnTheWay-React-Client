class HTTPRequestError extends Error {
    statusCode: number|undefined    
    
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, HTTPRequestError.prototype);
    }
}

export default HTTPRequestError