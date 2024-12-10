const pool = require('./db');


async function queryDatabase(query, params = []) {
    try {
        const result = await pool.query(query, params);
        return result;
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
}


async function createUser(name, email, age) {
    const query = 'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, age];
    const result = await pool.query(query, values);
    return result.rows[0];
}


async function getAllUsers() {
    const query = 'SELECT * FROM users';
    const result = await pool.query(query);
    return result.rows;
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

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };




// const server = http.createServer(async (req, res) => {
//     const parsedUrl = url.parse(req.url, true);
//     const method = req.method;
//     const pathname = parsedUrl.pathname;

//     // // Set response headers
//     // res.setHeader('Content-Type', 'application/json');


//     if (pathname === '/users' && method === 'POST') {
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });

//         req.on('end', async () => {
//             const { name, email, age } = JSON.parse(body);
//             try {
//                 const result = await queryDatabase(
//                     'INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *',
//                     [name, email, age]
//                 );
//                 res.statusCode = 201;
//                 res.end(JSON.stringify(result.rows[0]));
//             } catch (err) {
//                 res.statusCode = 500;
//                 res.end(JSON.stringify({ error: 'Failed to create user' }));
//             }
//         });

//     } else if (pathname === '/users' && method === 'GET') {
//         try {
//             const result = await queryDatabase('SELECT * FROM users');
//             res.statusCode = 200;
//             res.end(JSON.stringify(result.rows));
//         } catch (err) {
//             res.statusCode = 500;
//             res.end(JSON.stringify({ error: 'Failed to fetch users' }));
//         }

//     } else if (pathname.startsWith('/users/') && method === 'GET') {
//         const id = pathname.split('/')[2];
//         try {
//             const result = await queryDatabase('SELECT * FROM users WHERE id = $1', [id]);
//             if (result.rows.length > 0) {
//                 res.statusCode = 200;
//                 res.end(JSON.stringify(result.rows[0]));
//             } else {
//                 res.statusCode = 404;
//                 res.end(JSON.stringify({ error: 'User not found' }));
//             }
//         } catch (err) {
//             res.statusCode = 500;
//             res.end(JSON.stringify({ error: 'Failed to fetch user' }));
//         }

//     } else if (pathname.startsWith('/users/') && method === 'PUT') {
//         const id = pathname.split('/')[2];
//         let body = '';
//         req.on('data', chunk => {
//             body += chunk.toString();
//         });

//         req.on('end', async () => {
//             const { name, email, age } = JSON.parse(body);
//             try {
//                 const result = await queryDatabase(
//                     'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
//                     [name, email, age, id]
//                 );
//                 if (result.rows.length > 0) {
//                     res.statusCode = 200;
//                     res.end(JSON.stringify(result.rows[0]));
//                 } else {
//                     res.statusCode = 404;
//                     res.end(JSON.stringify({ error: 'User not found' }));
//                 }
//             } catch (err) {
//                 res.statusCode = 500;
//                 res.end(JSON.stringify({ error: 'Failed to update user' }));
//             }
//         });

//     } else if (pathname.startsWith('/users/') && method === 'DELETE') {
//         const id = pathname.split('/')[2];
//         try {
//             const result = await queryDatabase('DELETE FROM users WHERE id = $1', [id]);
//             if (result.rowCount > 0) {
//                 res.statusCode = 200;
//                 res.end(JSON.stringify({ message: 'User deleted' }));
//             } else {
//                 res.statusCode = 404;
//                 res.end(JSON.stringify({ error: 'User not found' }));
//             }
//         } catch (err) {
//             res.statusCode = 500;
//             res.end(JSON.stringify({ error: 'Failed to delete user' }));
//         }

//     } else {
//         // Handle 404
//         res.statusCode = 404;
//         res.end(JSON.stringify({ error: 'Route not found' }));
//     }
// });