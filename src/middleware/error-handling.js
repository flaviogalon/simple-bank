function errorHandling(error, req, res, next) {
    console.log('middleware!');
    console.log(error)
    res.status(error.statusCode).send(error.defaultReturnValue);
}

module.exports = errorHandling;