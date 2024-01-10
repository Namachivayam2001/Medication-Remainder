const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$ | /schedule-form(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'index.html'));
})

module.exports = router