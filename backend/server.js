const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {loger} = require(path.join(__dirname, 'middleware', 'logEvents.js'))
const errorHandler = require(path.join(__dirname, 'middleware', 'error-handler.js'))
const PORT = process.env.PORT || 3030

//CROS origin resource sharing
const whiteList = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:3030',
    'http://localhost:3000'
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
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')))

app.use('/schedule', require(path.join(__dirname, 'src', 'routers', 'schedule-form.js')))
app.use('/', require(path.join(__dirname, 'src', 'routers', 'index.js')))
app.use('*', require(path.join(__dirname, 'src', 'routers', 'error.js')))

app.use(errorHandler) //error-handler.js middleware

app.listen(PORT, () => console.log(`server run on PORT ${PORT}`))