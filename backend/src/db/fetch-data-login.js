const pool = require('./connection.js');

module.exports = async (table_name, data) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT * FROM ${table_name} WHERE email = ? AND password = ?`,
            [data.email, data.password]
        );

        connection.release();
        const userRecord = rows[0];
        console.log('User record:', userRecord);
        return userRecord;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};