const pool = require('./connection.js');

module.exports = async (table_name, item_id, days) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            UPDATE ${table_name}
            SET days = ${days} 
            WHERE id = ${item_id}
        `);
        connection.release();
        console.log('days updated successfully')
    } catch (error) {
        console.error('Error updating days:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};