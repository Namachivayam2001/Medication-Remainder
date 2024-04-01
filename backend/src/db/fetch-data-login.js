const pool = require('./connection.js');

module.exports = async (table_name, data) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(
            `SELECT * FROM ${table_name} WHERE email = ? AND password = ?`,
            [data.email, data.password]
        );

        connection.release();
        const userRecord = {
            id: rows[0].id,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            dob: rows[0].dob,
            email: rows[0].email,
            guardian_email: rows[0].guardian_email,
            age: rows[0].age,
            Obesity_level: rows[0].Obesity_level
        };
        console.log('User record:', userRecord);
        return userRecord;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};