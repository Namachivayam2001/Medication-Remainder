const pool = require('./connection.js');

module.exports = async (table_name, user_id) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`SELECT * FROM ${table_name} WHERE user_id = ?`, [user_id]);
        connection.release();
        return(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};