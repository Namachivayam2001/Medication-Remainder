const cron = require('cron');
//const nodemailer = require('nodemailer'); 
const moment = require('moment'); 
const fetchData = require('./src/db/fetch-data.js');
const updateDays = require('./src/db/update-days.js')
const deleteRecord = require('./src/db/delete-record.js')

const table_name = "_schedules";

function checkTime(targetTime) {
    const currentTime = moment();
    const formattedTargetTime = moment(targetTime, 'HH:mm:ss');
    return currentTime.isSame(formattedTargetTime, 'second');
}

const job = new cron.CronJob('* * * * * *', async () => {
    await fetchData(table_name).then((data) => {
        data.map(async (item) => {
            if(checkTime(item.time) && item.notification){
                console.log('send notification');
                item.days - 1 <= 0 
                ? await deleteRecord(table_name, item.id) 
                : await updateDays(table_name, item.id, item.days - 1);
            } else if (checkTime(item.time)) {
                item.days - 1 <= 0 
                ? await deleteRecord(table_name, item.id) 
                : await updateDays(table_name, item.id, item.days - 1);
            }
        });
    });
}); 

job.start();