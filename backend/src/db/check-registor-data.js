const pool = require('./connection.js');

module.exports = async (tableName, data) => {
    try {
        const connection = await pool.getConnection();      

        var [user_id_rows] = await connection.query(`
            SELECT COUNT(*) as count FROM ${tableName} 
            WHERE user_id = ?`,
            [data.user_id]
        );   
        
        var [email_rows] = await connection.query(`
            SELECT COUNT(*) as count FROM ${tableName} 
            WHERE email = ?`,
            [data.email]
        ); 

        connection.release();
        const user_id_count = user_id_rows[0].count;
        const email_count = email_rows[0].count;
        console.log('Number of matching user_id:', user_id_count);
        console.log('Number of matching email:', email_count);
        return {
            user_id_repeat: user_id_count>0, 
            email_repeat: email_count>0};
    } catch (error) {
        console.error('Error scheduling reminder:', error);
        return true; // Assuming an error means the schedule already exists to prevent accidental insertion
    }
};
