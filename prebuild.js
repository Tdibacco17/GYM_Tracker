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
        if (error.code === '23505') { // Código de error de unicidad en PostgreSQL
            console.error('Error: El correo electrónico ya está en uso.');
        } else {
            console.error('Error creating user:', error.message);
        }
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
                email VARCHAR(50) NOT NULL UNIQUE,
                password TEXT NOT NULL,
                access_token TEXT,
                name VARCHAR(50) DEFAULT NULL,
                weight DECIMAL(5, 2) DEFAULT NULL,
                height DECIMAL(5, 2) DEFAULT NULL
            );

            CREATE TABLE IF NOT EXISTS exercises (
                id TEXT PRIMARY KEY,
                name VARCHAR(50) NOT NULL
            );

            CREATE TABLE IF NOT EXISTS routines (
                id TEXT PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
                created_at TIMESTAMPTZ DEFAULT NOW()
            );

            CREATE TABLE IF NOT EXISTS routine_exercises (
                id TEXT PRIMARY KEY,
                routine_id TEXT REFERENCES routines(id) ON DELETE CASCADE,
                exercise_id TEXT REFERENCES exercises(id) ON DELETE CASCADE,
                repetitions INT NOT NULL,
                weight DECIMAL(5, 2) NOT NULL
            );
            `;

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
            DROP TABLE IF EXISTS routine_exercises CASCADE;
            DROP TABLE IF EXISTS routines CASCADE;
            DROP TABLE IF EXISTS exercises CASCADE;
            DROP TABLE IF EXISTS users CASCADE;
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
        // await createTables();
        // await dropTables();
    } catch (error) {
        console.error('Error occurred:', error.message);
    } finally {
        await pool.end();
        console.log('Pool connection closed');
    }
})();