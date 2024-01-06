const express = require('express')
const app = express()
const path = require('path')
const logEvents = require('./logEvents.js')
const PORT = process.env.PORT || 3030

app.use((req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLogs.txt')
    next()
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('^/$ | /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/old-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'new-page.html'))
})

app.listen(PORT, () => console.log(`server run on PORT ${PORT}`))