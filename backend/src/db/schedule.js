const createTableIfNotExists = require('./create-tabel.js');
const insertData = require('./insert-record.js');
const isRepeat = require('./check-repeat-data.js')

module.exports = async (tabel_name, tableDefinition, data) => {
    try {
        const connection = await createTableIfNotExists(tabel_name, tableDefinition);
        const scheduleExist = await isRepeat(tabel_name, data);
        if(scheduleExist){
            return false;
        } else {
            await insertData(tabel_name, data, connection);
            return true;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};
