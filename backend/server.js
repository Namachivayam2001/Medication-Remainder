const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {loger} = require('./middleware/logEvents.js')
const errorHandler = require('./middleware/error-handler.js')
const PORT = process.env.PORT || 3060

//CROS origin resource sharing
const whiteList = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://loclahost:3060'
]

const corsOption = {
    origin: (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200
}

app.use(loger) //logEvents.js middleware
app.use(cors(corsOption)) //CROS origin resource sharing middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./src/routers/index.js'))
app.use('/schedule', require('./src/routers/schedule.js'))

app.use(errorHandler) //error-handler.js middleware

app.listen(PORT, () => console.log(`server run on PORT ${PORT}`))