const express = require('express')
const router = express.Router()
const schedule = require('../db/schedule')
const fetchData = require('../db/fetch-data-schedule')
const updateNotification = require('../db/update-notification')
const deleteRecord = require('../db/delete-record')

const tabel_name = "_schedules";
const tableDefinition = 'id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, time TIME, days INT, hint VARCHAR(255), notification BOOLEAN, FOREIGN KEY(user_id) REFERENCES _users(id)';

router.post('/form', async (req, res) => {
    try{
        const {
            user_id, 
            time, 
            days, 
            hint,  
            notification,
        } = req.body;
        await schedule(tabel_name, tableDefinition, {
            user_id, 
            time, 
            days, 
            hint, 
            notification,
        })
        ? res.status(200).json({inserted: true})
        : res.status(401).json({inserted: false})
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }    
})

router.get('/data/:user_id', async (req, res) => {
    try{
        const user_id = parseInt(req.params.user_id, 10);
        const data = await fetchData(tabel_name, user_id);
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