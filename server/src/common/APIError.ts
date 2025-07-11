class APIError extends Error {
    constructor(
        public statusCode: number = 500,
        public message: string = 'Something went wrong! Please try again later.'
    ) {
        super(message);
    }
}

export { APIError };
