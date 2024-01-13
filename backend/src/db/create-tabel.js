const pool = require('./connection.js');

module.exports = async (tableName, tableDefinition) => {
    try {
        const connection = await pool.getConnection();
        await connection.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${tableDefinition})`);
    } catch (err) {
        console.error(err);
        throw err; // Re-throw for higher-level handling
    }
};
