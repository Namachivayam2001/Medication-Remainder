const insertData = require('./insert-record.js');
const isRepeat = require('./check-repeat-data.js')

module.exports = async (tabel_name, data) => {
    try {
        const scheduleExist = await isRepeat(tabel_name, data);
        if(scheduleExist){
            return false;
        } else {
            await insertData(tabel_name, data);
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};
