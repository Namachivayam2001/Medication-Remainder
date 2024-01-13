const pool = require('./connection.js');

module.exports = async (table_name, data) => {
    try {
        const connection = await pool.getConnection();
        const columns = Object.keys(data);
        const values = Object.values(data).map(value => connection.escape(value));
        const query = `INSERT INTO ${table_name} (${columns.join(', ')}) VALUES (${values.join(', ')})`;
        await connection.query(query);
        console.log('Data inserted successfully');
    } catch (err) {
        console.error('Error inserting data:', err);
        throw err; // Re-throw the error for higher-level handling
    }
};
