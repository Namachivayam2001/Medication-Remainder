const pool = require('./connection.js');

module.exports = async (tableName, data) => {
    try {
        const connection = await pool.getConnection();
        var [rows] = await connection.query(`
            SELECT COUNT(*) as count FROM ${tableName} 
            WHERE time = ? AND user_id = ?`, 
            [data.time, data.user_id]
        );       
        connection.release();
        const count = rows[0].count;
        console.log('Number of matching records:', count);
        return count > 0;
    } catch (error) {
        console.error('Error scheduling reminder:', error);
        return true; // Assuming an error means the schedule already exists to prevent accidental insertion
    }
};
