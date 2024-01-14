const express = require('express')
const router = express.Router()
const schedule = require('../db/schedule')
const fetchData = require('../db/fetch-data')
const updateNotification = require('../db/update-notification')
const deleteRecord = require('../db/delete-record')

const tabel_name = "_schedules";

router.post('/form', (req) => {
    const {time, days, hint, notification} = req.body;
    schedule(tabel_name, {time, days, hint, notification});
})

router.get('/data', (req, res) => {
    fetchData(tabel_name, res);
})

router.put('/data/:itemId', (req) => {
    const itemId = parseInt(req.params.itemId, 10);
    updateNotification(tabel_name, itemId);
});

router.delete('/data/:itemId', (req) => {
    const itemId = parseInt(req.params.itemId, 10);
    deleteRecord(tabel_name, itemId);
});

module.exports = router;