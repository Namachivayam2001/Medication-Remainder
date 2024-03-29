const pool = require('./connection.js');

module.exports = async (tableName, tableDefinition) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`);
        console.log('tabel created succesfully');
        return connection;
    } catch (error) {
        console.error('Error tabel creation:', error);
    }
};
