const pool = require('./db');

async function createUser(name, email, age) {
    const query = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, age];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

async function updateUser(id, name, email, age) {
    const query = 'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *';
    const values = [name, email, age, id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

async function deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = { createUser, getUserById, updateUser, deleteUser };
