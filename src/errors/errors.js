class NonExistentAccountError extends Error {
    constructor() {
        super();
        this.name = this.constructor.name;

        this.statusCode = 404;
        this.defaultReturnValue = '0';
    }
}

module.exports = {
    NonExistentAccountError,
}