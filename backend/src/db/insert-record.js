const pool = require('./connection.js');

module.exports = async (table_name, data) => {
    try {
        const connection = await pool.getConnection(); 
        const columns = Object.keys(data);
        const values = Object.values(data).map(value => connection.escape(value));
        const query = `INSERT INTO ${table_name} (${columns.join(', ')}) VALUES (${values.join(', ')})`;
        await connection.query(query);
        connection.release();
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};
