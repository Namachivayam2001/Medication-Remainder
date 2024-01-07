const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {  //check the log folder if there exist
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));  //creating log folder if not exist
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);  //write the event logs in specified file name
    } catch (err) {
        console.error(err);
    }
}

const loger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLogs.txt')
    next()
}

module.exports = {
    loger,
    logEvents
}