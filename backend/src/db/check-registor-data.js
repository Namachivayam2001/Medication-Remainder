const pool = require('./connection.js');

module.exports = async (tableName, data) => {
    try {
        const connection = await pool.getConnection();      

        var [email_rows] = await connection.query(`
            SELECT COUNT(*) as count FROM ${tableName} 
            WHERE email = ?`,
            [data.email]
        ); 

        connection.release();
        const email_count = email_rows[0].count;
        console.log('Number of matching email:', email_count);
        return { 
            email_repeat: email_count>0
        };
    } catch (error) {
        console.error('Error scheduling reminder:', error);
        return true; // Assuming an error means the schedule already exists to prevent accidental insertion
    }
};
