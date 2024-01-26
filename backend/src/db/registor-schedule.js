const createTableIfNotExists = require('./create-tabel.js');
const insertData = require('./insert-record.js');
const isRepeat = require('./check-registor-data.js')

module.exports = async (tabel_name, tableDefinition, data) => {
    try {
        const connection = await createTableIfNotExists(tabel_name, tableDefinition);
        const response = await isRepeat(tabel_name, data);

        if(!response.email_repeat){
            await insertData(tabel_name, data, connection);
            return({
                email_repeat: response.email_repeat,
            })
        } else {
            return({
                email_repeat: response.email_repeat,
            })
        }
    } catch (err) {
        console.error(err);
        return({
            email_repeat: response.email_repeat,
        })
    }
};
