const pool = require('./connection.js');

module.exports = async (table_name, item_id, user_id) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            DELETE FROM ${table_name}
            WHERE id = ${item_id} AND user_id = ${user_id}
        `);

        const data = await connection.query(`
            SELECT * FROM ${table_name} WHERE user_id = ${user_id}
        `);
        
        connection.release();
        return(data[0]);
    } catch (error) {
        console.error('Error delete data:', error);
    }
};