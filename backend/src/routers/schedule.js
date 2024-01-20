const express = require('express')
const router = express.Router()
const schedule = require('../db/schedule')
const fetchData = require('../db/fetch-data')
const updateNotification = require('../db/update-notification')
const deleteRecord = require('../db/delete-record')

const tabel_name = "_schedules";
const tableDefinition = 'id INT AUTO_INCREMENT PRIMARY KEY, time TIME, days INT, hint VARCHAR(255), notification BOOLEAN';

router.post('/form', async (req, res) => {
    try{
        const {time, days, hint,  notification} = req.body;

        await schedule(tabel_name, tableDefinition, {time, days, hint, notification})
        ? res.status(200).json({inserted: true})
        : res.status(401).json({inserted: false})
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }    
})

router.get('/data', async (req, res) => {
    try{
        const data = await fetchData(tabel_name);
        res.status(200).json(data);
        console.log('Data fetched successfully');
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    } 
})

router.put('/data/:itemId', async (req, res) => {
    try{
        const itemId = parseInt(req.params.itemId, 10);
        await updateNotification(tabel_name, itemId);
        res.status(200).send('Notification Updated successfully');
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }  
});

router.delete('/data/:itemId', async (req, res) => {
    try{
        const itemId = parseInt(req.params.itemId, 10);
        await deleteRecord(tabel_name, itemId);
        res.status(200).send('Record Deleted Successfully');
    }  catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;