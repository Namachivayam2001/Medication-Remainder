const path = require('path');
const createTableIfNotExists = require(path.join(__dirname, 'create-tabel.js'));
const insertData = require(path.join(__dirname, 'insert-record.js'));

module.exports = async (tabel_name, data) => {
    try {
        const tableDefinition = 's_no INT AUTO_INCREMENT PRIMARY KEY, time TIME, days INT, hint VARCHAR(255)';

        await createTableIfNotExists(tabel_name, tableDefinition);
        await insertData(tabel_name, data);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving schedule');
    }
};
