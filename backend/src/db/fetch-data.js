const pool = require('./connection.js');

module.exports = async (table_name, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.query(`SELECT * FROM ${table_name}`);
        connection.release();
        res.json(rows);
        console.log('data fetched successfully')
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};