const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/form.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'schedule', 'form.html'))
})

module.exports = router