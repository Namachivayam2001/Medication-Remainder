const pool = require('./connection.js');

module.exports = async (table_name) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`SELECT * FROM ${table_name}`);
        connection.release();
        console.log('data fetched successfully');
        return(rows);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};