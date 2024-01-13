const express = require('express')
const router = express.Router()
const schedule = require('../db/schedule')
const fetchData = require('../db/fetch-data')

router.post('/form', (req, res) => {
    const {time, days, hint} = req.body;
    schedule("_schedules", {time, days, hint});
})

router.get('/data', (req, res) => {
    fetchData("_schedules", res);
})

module.exports = router