const express = require('express');
const router = express.Router();
const schedule = require('../db/schedule');
const fetchData = require('../db/fetch-data-schedule');
const updateNotification = require('../db/update-notification');
const deleteRecord = require('../db/delete-record');
const verifyNotificationToken = require('../../middleware/verifyNotificationToken')
const verifySchedulesToken = require('../../middleware/verifySchedulesToken');
const verifyNewScheduleToken = require('../../middleware/verifyNewScheduleToken');
const verifyDeleteToken = require('../../middleware/verifyDeleteToken');
const jwt = require('jsonwebtoken');
const checkTimeRepeat = require('../db/check-repeat-data');
require('dotenv').config();
const secret_key = process.env.secret_key;

const tabel_name = "_schedules";
const tableDefinition = 'id INT AUTO_INCREMENT PRIMARY KEY, user_id INT, time TIME, days INT, hint VARCHAR(255), notification BOOLEAN, FOREIGN KEY(user_id) REFERENCES _users(id)';

router.post('/form', verifyNewScheduleToken, async (req, res) => {
    try{
        const {
            user_id, 
            time, 
            days, 
            hint,  
            notification,
        } = JSON.parse(req.body.headers['values']);

        await checkTimeRepeat(tabel_name, {
            user_id, 
            time, 
        }) 
        ? res.status(200).json({repeat: true})
        : await schedule(tabel_name, tableDefinition, {
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

router.get('/data', verifySchedulesToken, async (req, res) => {    
    const user_id = req.userId;
    await fetchData(tabel_name, user_id)
    .then(data => {
        const token = jwt.sign({schedules: data}, secret_key);
        res.header('user_schedules', token).json(token);
        console.log('Data fetched successfully');
    })
    .catch (err => {
        res.status(500).json({error: `Internal Server Error ${err}`});
    });
})

router.put('/data',verifyNotificationToken, async (req, res) => {
        const userId = req.userId;
        const itemId = req.body.headers.itemId;

        await updateNotification(tabel_name, itemId, userId)
        .then(data => {
            const token = jwt.sign({togeled_data: data}, secret_key);
            res.header('altered_schedules', token).json(token);
            console.log('notification toggled successfully');
        })
        .catch(error => {
            res.status(500).json({error: `Internal Server Error ${error}`});
        });
});

router.delete('/data', verifyDeleteToken, async (req, res) => {
        const userId = req.userId;
        const itemId = req.headers.itemid;
        await deleteRecord(tabel_name, itemId, userId)
        .then(data => {
            const token = jwt.sign({remaining_data: data}, secret_key);
            res.header('altered_schedules', token).json(token);
            console.log('record deleted successfully');
        })
        .catch (error => {
            res.status(500).json({error: `Internal Server Error: ${error}`});
        })
});

module.exports = router;