const path = require('path');
const createTableIfNotExists = require(path.join(__dirname, 'create-tabel.js'));
const insertData = require(path.join(__dirname, 'insert-record.js'));

module.exports = async (tabel_name, data) => {
    try {
        const tableDefinition = 'id INT AUTO_INCREMENT PRIMARY KEY, time TIME, days INT, hint VARCHAR(255), notification BOOLEAN';
        const connection = await createTableIfNotExists(tabel_name, tableDefinition);
        await insertData(tabel_name, data, connection);
        console.log('notification scheduled succesfully')
    } catch (error) {
        console.error('Error schedule remainder:', error);
    }
};
