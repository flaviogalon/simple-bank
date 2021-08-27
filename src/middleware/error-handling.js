function errorHandling(error, req, res, next) {
    res.status(error.statusCode).send(error.defaultReturnValue);
}

module.exports = errorHandling;