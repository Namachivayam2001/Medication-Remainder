const pool = require('./connection.js');

module.exports = async (table_name, id) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`SELECT * FROM ${table_name} WHERE id = ?`, [id]);
        console.log('notification schedule fetched');
        connection.release();
        return(rows[0]);
    } catch (error) {
        console.error('Error fetching notification data:', error);
    }
};