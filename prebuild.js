require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

const createTables = async () => {
    const client = await pool.connect();
    try {
        console.log('Creating tables...');
        await client.query("SET TIMEZONE='America/Argentina/Buenos_Aires'");

        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS days (
                id TEXT PRIMARY KEY,
                name VARCHAR(20) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS exercises (
                id TEXT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                default_repetitions INT NOT NULL,
                default_weight DECIMAL(5, 2) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS routine (
                id TEXT PRIMARY KEY,
                day_id TEXT REFERENCES days(id) ON DELETE CASCADE,
                exercise_id TEXT REFERENCES exercises(id) ON DELETE CASCADE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );
        `;

        await client.query(createTablesQuery);
        console.log('Tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error.message);
    } finally {
        client.release();
    }
};

const dropTables = async () => {
    const client = await pool.connect();
    try {
        console.log('Dropping tables...');
        const dropTablesQuery = `
            DROP TABLE IF EXISTS routine;
            DROP TABLE IF EXISTS exercises;
            DROP TABLE IF EXISTS days;
        `;

        await client.query(dropTablesQuery);
        console.log('Tables dropped successfully.');
    } catch (error) {
        console.error('Error dropping tables:', error.message);
    } finally {
        client.release();
    }
};

(async () => {
    try {
        await createTables();
        // await dropTables();
    } catch (error) {
        console.error('Error occurred:', error.message);
    } finally {
        await pool.end();
        console.log('Pool connection closed');
    }
})();
