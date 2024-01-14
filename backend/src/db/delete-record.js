const pool = require('./connection.js');

module.exports = async (table_name, item_id) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            DELETE FROM ${table_name}
            WHERE id = ${item_id};
        `);
        connection.release();
        console.log('data deleted successfully');
    } catch (error) {
        console.error('Error delete data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};