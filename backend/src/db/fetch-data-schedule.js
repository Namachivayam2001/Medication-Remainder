const pool = require('./connection.js');
const createTableIfNotExists = require('./create-tabel.js');

module.exports = async (table_name, user_id, tableDefinition) => {
    try {
        await createTableIfNotExists(table_name, tableDefinition);
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`SELECT * FROM ${table_name} WHERE user_id = ?`, [user_id]);
        connection.release();
        return(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};