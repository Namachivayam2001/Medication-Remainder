const pool = require('./connection.js');

module.exports = async (tableName, tableDefinition) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`);
    } catch (err) {
        console.error('Error tabel creation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
