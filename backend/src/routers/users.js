const express = require('express')
const router = express.Router()
const schedule = require('../db/registor-schedule')
const isUserExist = require('../db/check-login-data')
const fetchData = require('../db/fetch-data-login')
const verifyNotificationToken = require('../../middleware/verifyNotificationToken')
const updateObesityLevel = require("../db/update-obesity-level")
const updatePneumonia = require("../db/update-pneumonia")
const updateDiabetis = require("../db/update-diabeties")
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret_key = process.env.secret_key;

const tabel_name = "_users";
const tableDefinition = 'id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), age INT, dob DATE, email VARCHAR(255), guardian_email VARCHAR(255), password VARCHAR(255), Obesity_level VARCHAR(50), Pneumonia VARCHAR(50), Diabetis VARCHAR(50)';

router.post('/registor', async (req, res) => {
    try{
        const {
            first_name,
            last_name,
            dob,
            email,
            guardian_email,
            password,
            age,
        } = req.body;

        const response = await schedule(tabel_name, {
            first_name,
            last_name,
            dob,
            email,
            guardian_email,
            password,
            age,
        });
        res.status(200).json(response);
        console.log(response);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }    
})

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const userExist = await isUserExist(tabel_name, {email, password});
        console.log(userExist);
        
        if (userExist.match_email && userExist.match_password) {
            const userRecord = await fetchData(tabel_name, { email, password });
            // Generate JWT token
            const token = jwt.sign(userRecord, secret_key);

            res.header('userData', token).json(token);
        } else {
            res.status(200).json({ 
                status: 'Login Fail',
                match_email: userExist.match_email, 
                match_password: userExist.match_password,
            });
        }
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.put('/Obesity_level',verifyNotificationToken, async (req, res) => {
    const userId = req.userId;
    const Obesity_level = req.body.headers.Obesity_level;

    await updateObesityLevel(tabel_name, Obesity_level, userId)
    .catch(error => {
        res.status(500).json({error: `Internal Server Error ${error}`});
    });
    res.status(200).json({message: "Obesity_level updated successfully"})
});

router.put('/pneumonia',verifyNotificationToken, async (req, res) => {
    const userId = req.userId;
    const pneumonia = req.body.headers.pneumonia;

    await updatePneumonia(tabel_name, pneumonia, userId)
    .catch(error => {
        res.status(500).json({error: `Internal Server Error ${error}`});
    });
    res.status(200).json({message: "pneumonia updated successfully"})
});

router.put('/Diabetis',verifyNotificationToken, async (req, res) => {
    const userId = req.userId;
    const Diabetis = req.body.headers.Diabetis;

    await updateDiabetis(tabel_name, Diabetis, userId)
    .catch(error => {
        res.status(500).json({error: `Internal Server Error ${error}`});
    });
    res.status(200).json({message: "Diabetis updated successfully"})
});

module.exports = router;