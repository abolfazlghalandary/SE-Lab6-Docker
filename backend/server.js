const http = require('http');
const url = require('url');
const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('./crud');

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const pathname = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');

    try {
        if (pathname === '/users' && method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { name, email, age } = JSON.parse(body);
                const user = await createUser(name, email, age);
                res.statusCode = 201;
                res.end(JSON.stringify(user));
            });

        } else if (pathname === '/users' && method === 'GET') {
            // Get all users
            const users = await getAllUsers();
            res.statusCode = 200;
            res.end(JSON.stringify(users));

        } else if (pathname.startsWith('/users/') && method === 'GET') {
            // Get a user by ID
            const id = pathname.split('/')[2];
            const user = await getUserById(id);
            if (user) {
                res.statusCode = 200;
                res.end(JSON.stringify(user));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'User not found' }));
            }

        } else if (pathname.startsWith('/users/') && method === 'PUT') {
            // Update a user by ID
            const id = pathname.split('/')[2];
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', async () => {
                const { name, email, age } = JSON.parse(body);
                const user = await updateUser(id, name, email, age);
                if (user) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(user));
                } else {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'User not found' }));
                }
            });

        } else if (pathname.startsWith('/users/') && method === 'DELETE') {
            // Delete a user by ID
            const id = pathname.split('/')[2];
            const success = await deleteUser(id);
            if (success) {
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'User deleted' }));
            } else {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'User not found' }));
            }

        } else {
            // Handle unknown routes
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Route not found' }));
        }
    } catch (err) {
        console.error('Error:', err);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal server error' }));
    }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
