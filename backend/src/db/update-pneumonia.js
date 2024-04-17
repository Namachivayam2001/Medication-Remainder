const pool = require('./connection.js');

module.exports = async (table_name, Pneumonia, user_id) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            UPDATE ${table_name}
            SET Pneumonia = ?
            WHERE id = ${user_id}`, 
            [Pneumonia]
        );
        console.log('Pneumonia updated succesfully..........')
        connection.release();
    } catch (error) {
        console.error('Error updating Obesity level data:', error);
    }
};