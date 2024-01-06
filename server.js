const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3030

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.get('^/$ | /index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'insex.html'));
})

app.listen(PORT, () => console.log(`server run on PORT ${PORT}`))