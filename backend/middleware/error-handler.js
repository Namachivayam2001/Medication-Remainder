const {logEvents} = require('./logEvents.js')

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}:\t${err.message}`, 'errLogs.txt')
    res.status(500).send(err.message)
    next()
}

module.exports = errorHandler;