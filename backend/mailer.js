const cron = require('cron');
const moment = require('moment'); 
const fetchData = require('./src/db/fetch-data-mailer.js');
const updateDays = require('./src/db/update-days.js');
const deleteRecord = require('./src/db/delete-record.js');
const fetchEmail = require('./src/db/fetch-data-email.js');
const fetchNotification = require('./src/db/fetch-email-notification.js');
const updateNotification = require('./src/db/update-notification.js');
const sendNotification = require('./email.js');

const table_name = "_schedules";

console.log('notification server start....')

// Function to handle sending notifications
async function sendNotifications(item) {
    let notificationAttempts = 1;

    async function executeFiveTimes() {
        if (notificationAttempts <= 5) {
            const notification_record = await fetchNotification(table_name, item.id);

            if (notification_record.notification) {
                const emailRecord = await fetchEmail(item.user_id);
                const user_name = `${emailRecord.first_name} ${emailRecord.last_name}`;

                // Sending email
                if (notificationAttempts < 5) {
                    await sendNotification(emailRecord.email, false, user_name);
                } else {
                    await sendNotification(emailRecord.guardian_email, true, user_name);
                    item.days - 1 <= 0
                        ? await deleteRecord(table_name, item.id, item.user_id) 
                        : await updateDays(table_name, item.id, item.days - 1);
                    console.log('session end....')
                }
            } else if(notificationAttempts <= 5){
                item.days - 1 <= 0 
                    ? await deleteRecord(table_name, item.id, item.user_id) 
                    : await updateDays(table_name, item.id, item.days - 1);
                await updateNotification(table_name, item.id);
            }

            notificationAttempts++;
            setTimeout(executeFiveTimes, 5 *  1000); // Wait 5 minutes for the next attempt
        }
    }

    executeFiveTimes();
}

// Function to check if current time matches the target time
function checkTime(targetTime) {
    const currentTime = moment();
    const formattedTargetTime = moment(targetTime, 'HH:mm:ss');
    return currentTime.isSame(formattedTargetTime, 'second');
}

// Function to continuously check for scheduled tasks
async function checkScheduledTasks() {
    const data = await fetchData(table_name);

    for (const item of data) {
        if (checkTime(item.time) && item.notification) {
            console.log('session start....')
            await sendNotifications(item);
        }
    }
}

// Schedule the task to run every second
const job = new cron.CronJob('* * * * * *', async () => {
    await checkScheduledTasks();
});

job.start();
