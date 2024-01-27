const cron = require('cron');
const moment = require('moment'); 
const fetchData = require('./src/db/fetch-data-mailer.js');
const updateDays = require('./src/db/update-days.js');
const deleteRecord = require('./src/db/delete-record.js');
const fetchEmail = require('./src/db/fetch-data-email.js');
const featchNotication = require('./src/db/fetch-email-notification.js');
const updateNotification = require('./src/db/update-notification.js')
const sendNotification = require('./email.js');

const table_name = "_schedules";

function checkTime(targetTime) {
    const currentTime = moment();
    const formattedTargetTime = moment(targetTime, 'HH:mm:ss');
    return currentTime.isSame(formattedTargetTime, 'second');
}

setInterval(async () => {

    const data = await fetchData(table_name);    

    for (const item of data) {

        if(checkTime(item.time) && item.notification){

            let notificationAttempts = 0;
            console.log('schedule start ', notificationAttempts);

            async function executeFiveTimes() {
                // Check if count is less than 5
                if (notificationAttempts < 6) {
                    console.log('5 min schedule start');
                    console.log(item);
                    console.log(notificationAttempts);
                
                    const notification_record = await featchNotication(table_name, item.id);
                    console.log(notification_record);
                    if (notification_record.notification && notificationAttempts < 5) {
                
                        //getting email and guardian email using join query
                        const emailRecord = await fetchEmail(item.user_id);
                        console.log('email for user');
                        console.log(emailRecord);
                
                        var user_name = `${emailRecord.first_name} ${emailRecord.last_name}`;
                        await sendNotification(emailRecord.email, false, user_name);
                        notificationAttempts++;

                    } else if ( !notification_record.notification && notificationAttempts < 5 ){
                        notificationAttempts++;
                    }
                
                    if (notification_record.notification && notificationAttempts >= 5) {
                
                        //getting email and guardian email using join query
                        const emailRecord = await fetchEmail(item.user_id);
                        console.log('email for guardian');
                        console.log(emailRecord);
                
                        await sendNotification(emailRecord.guardian_email, true, user_name);
                        item.days - 1 <= 0 
                            ? await deleteRecord(table_name, item.id) 
                            : await updateDays(table_name, item.id, item.days - 1);
                        notificationAttempts++;

                    } else if (!notification_record.notification && notificationAttempts >= 5){

                        if(item.days - 1 <= 0){
                            await deleteRecord(table_name, item.id)
                        } else {
                            await updateDays(table_name, item.id, item.days - 1);
                            await updateNotification(table_name, item.id);
                        } 
                        notificationAttempts++;
                    }
            
                    // Call the function recursively after 5 seconds
                    setTimeout(executeFiveTimes, 6 * 60 * 1000);
                }
            }
            
            // Initial call to start the execution
            executeFiveTimes();                             
        } 
    } 
}, 1000); 


