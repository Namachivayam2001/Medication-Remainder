const pool = require('./connection.js');

module.exports = async (table_name, Diabeties, user_id) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            UPDATE ${table_name}
            SET Diabetis = ?
            WHERE id = ${user_id}`, 
            [Diabeties]
        );
        console.log('Diabeties updated succesfully..........')
        connection.release();
    } catch (error) {
        console.error('Error updating Diabeties data:', error);
    }
};