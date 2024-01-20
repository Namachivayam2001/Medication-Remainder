const express = require('express')
const router = express.Router()
const schedule = require('../db/schedule')
const isUserExist = require('../db/check-login-data')
const fetchData = require('../db/fetch-data-login')

const tabel_name = "_users";
const tableDefinition = 'id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(100), last_name VARCHAR(100), user_id VARCHAR(100), dob DATE, mobile_number VARCHAR(20), email VARCHAR(255), guardian_email VARCHAR(255), password VARCHAR(255)';

router.post('/registor', async (req, res) => {
    try{
        const {
            first_name,
            last_name,
            user_id,
            dob,
            mobile_number,
            email,
            guardian_email,
            password,
        } = req.body;

        await schedule(tabel_name, tableDefinition, {first_name, last_name, user_id, dob, mobile_number, email, guardian_email, password})
        ? res.status(200).json({inserted: true})
        : res.status(401).json({inserted: false})
        
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
            res.status(200).json({ 
                status: 'Login successful', 
                match_email: userExist.match_email, 
                match_password: userExist.match_password, 
                userRecord,
            });
        } else if(userExist.match_email){
            res.status(200).json({ 
                status: 'Login Fail', 
                match_email: userExist.match_email, 
                match_password: userExist.match_password, 
            });
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

module.exports = router;