const pool = require('./connection.js');

module.exports = async (table_name, item_id) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            UPDATE ${table_name}
            SET notification = CASE WHEN notification = true THEN false ELSE true END
            WHERE id = ${item_id};
        `);
        connection.release();
        console.log('notification updated successfully')
    } catch (error) {
        console.error('Error updating data:', error);
    }
};