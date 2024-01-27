const pool = require('./connection.js');

module.exports = async (user_id) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`
            SELECT _users.email, _users.guardian_email, _users.first_name, _users.last_name, _schedules.user_id
            FROM _users
            JOIN _schedules
            ON _users.id = _schedules.user_id
            WHERE _schedules.user_id = ?`,
            [user_id]
        );
        connection.release();
        return(rows[0]);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};