const pool = require('./connection.js');

module.exports = async (table_name, Obesity_level, user_id) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            UPDATE ${table_name}
            SET Obesity_level = ?
            WHERE id = ${user_id}`, 
            [Obesity_level]
        );
        console.log('Obesity_level updated succesfully..........')
        connection.release();
    } catch (error) {
        console.error('Error updating Obesity level data:', error);
    }
};