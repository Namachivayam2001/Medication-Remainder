const express = require('express');
const router = express.Router();
const schedule = require('../db/schedule');
const fetchData = require('../db/fetch-data-schedule');
const updateNotification = require('../db/update-notification');
const deleteRecord = require('../db/delete-record');
const verifyToken = require('../../middleware/verifyToken');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.secret_key;

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

router.get('/data', verifyToken, async (req, res) => {    
    const user_id = req.userId;
    await fetchData(tabel_name, user_id)
    .then(data => {
        console.log(data);
        const token = jwt.sign({schedules: data}, secret_key);
        res.header('user_schedules', token).json(token);
        console.log('Data fetched successfully');
    })
    .catch (err => {
        res.status(500).json({error: `Internal Server Error ${err}`});
    })
})

router.put('/data/:itemId',verifyToken, async (req, res) => {
    try{
        const itemId = parseInt(req.params.itemId, 10);
        await updateNotification(tabel_name, itemId);
        res.status(200).send('Notification Updated successfully');
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }  
});

router.delete('/data/:itemId', verifyToken, async (req, res) => {
    try{
        const itemId = parseInt(req.params.itemId, 10);
        await deleteRecord(tabel_name, itemId);
        res.status(200).send('Record Deleted Successfully');
    }  catch (error) {
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports = router;