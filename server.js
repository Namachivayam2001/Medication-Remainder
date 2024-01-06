const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const {loger} = require('./middleware/logEvents.js')
const errorHandler = require('./middleware/error-handler.js')
const PORT = process.env.PORT || 3030

app.use(loger) //logEvents.js middleware
//CROS origin resource sharing
const whiteList = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://loclahost:3030'
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
app.use(cors(corsOption)) //CROS origin resource sharing middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('^/$ | /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new-page.html'))
})

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'error', '404.html'))
    } else if (req.accepts('json')) {
        res.json({"error": "404 page not found"})
    } else {
        res.type('txt').send('404 page not found')
    }
})

app.use(errorHandler) //error-handler.js middleware

app.listen(PORT, () => console.log(`server run on PORT ${PORT}`))