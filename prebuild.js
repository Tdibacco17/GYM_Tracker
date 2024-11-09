require('dotenv').config();
const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
});

const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

const createUser = async (client, email, password, accessToken) => {
    try {
        const userId = uuidv4();
        const hashedPassword = await encrypt(password);
        const hashedAccessToken = await encrypt(accessToken);

        const query = `
        INSERT INTO users (id, email, password, access_token)
        VALUES ($1, $2, $3, $4)
        RETURNING id, email, access_token;
        `;
        const values = [userId, email, hashedPassword, hashedAccessToken];

        const result = await client.query(query, values);
        // console.log('User created:', result.rows[0]);
    } catch (error) {
        console.error('Error creating user:', error.message);
    }
};


const createTables = async () => {
    const client = await pool.connect();
    try {
        console.log('Creating tables...');
        await client.query("SET TIMEZONE='America/Argentina/Buenos_Aires'");

        const createTablesQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email VARCHAR(50) NOT NULL,
                password TEXT NOT NULL,
                access_token TEXT
            );
            `;
        /* 
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
        */

        await client.query(createTablesQuery);
        console.log('Tables created successfully.');

        await createUser(client, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, process.env.ACCESS_TOKEN);
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
            DROP TABLE IF EXISTS users;
        `;
        /* 
            DROP TABLE IF EXISTS routine;
            DROP TABLE IF EXISTS exercises;
            DROP TABLE IF EXISTS days;
        */

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