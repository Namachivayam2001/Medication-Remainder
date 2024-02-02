const pool = require('./connection.js');

module.exports = async (table_name, item_id, user_id) => {
    try {
        const connection = await pool.getConnection();
        const updated_data = await connection.query(`
            UPDATE ${table_name}
            SET notification = CASE WHEN notification = true THEN false ELSE true END
            WHERE id = ${item_id} AND user_id = ${user_id}
        `);
        if(updated_data){
            const data = await connection.query(`
                SELECT * FROM ${table_name} WHERE user_id = ${user_id}
            `);
            return(data[0]);
        }
        connection.release();
    } catch (error) {
        console.error('Error updating data:', error);
    }
};