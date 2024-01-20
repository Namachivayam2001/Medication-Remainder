const pool = require('./connection.js');

module.exports = async (tableName, data) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT COUNT(*) as count FROM ${tableName} WHERE email = ? AND password = ?`,
            [data.email, data.password]
        );

        const [email_rows] = await connection.query(`
            SELECT COUNT(*) as count FROM ${tableName} WHERE email = ?`,
            [data.email]
        ); 

        const count = rows[0].count;
        const email_count = email_rows[0].count;

        if(count > 0){
            connection.release();
            console.log('Number of matching records:', count);
            return {match_email: true, match_password: true};
        } else if(email_count){
            connection.release();
            console.log('Number of matching records:', count);
            return {match_email: true, match_password: false};
        }else{
            connection.release();
            console.log('Number of matching records:', count);
            return {match_email: false, match_password: false};
        }

    } catch (error) {
        console.error('Error scheduling reminder:', error);
        return true; // Assuming an error means the schedule already exists to prevent accidental insertion
    }
};
