const pool = require('./connection.js');

module.exports = async (tableName, data) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT COUNT(*) as count FROM ${tableName} 
            WHERE time = ? 
            AND days = ? 
            AND hint = ? 
            AND notification = ?`, 
            [data.time, data.days, data.hint, data.notification]
        );
        connection.release();
        console.log(rows)
        const count = rows[0].count;

        console.log('Number of matching records:', count);

        return count > 0;
    } catch (error) {
        console.error('Error scheduling reminder:', error);
        return true; // Assuming an error means the schedule already exists to prevent accidental insertion
    }
};
