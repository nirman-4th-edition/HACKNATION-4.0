const express = require('express');
const r = require('rethinkdb');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend requests

const dbConfig = {
    host: '192.168.23.118', // Your remote RethinkDB IP
    port: 28015, // Default RethinkDB port
    db: 'uday', // Your database name
    user: 'admin', // Change if using a different user
    password: '' // Set if you have a password
};

let connection;

// Connect to RethinkDB
r.connect(dbConfig)
    .then(conn => {
        connection = conn;
        console.log('✅ Connected to RethinkDB at 192.168.23.118');
    })
    .catch(err => console.error('❌ DB Connection Error:', err));

// 🚀 Get All Responses
app.get('/responses', async (req, res) => {
    try {
        const cursor = await r.table('response').run(connection);
        const responses = await cursor.toArray();
        res.json(responses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🚀 Add a New Response
app.post('/responses', async (req, res) => {
    try {
        const { name, message, location } = req.body;
        const result = await r.table('response').insert({ name, message, location }).run(connection);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🚀 Edit a Response by ID
app.put('/responses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, message, location } = req.body;
        const result = await r.table('response').get(id).update({ name, message, location }).run(connection);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 🚀 Delete a Response by ID
app.delete('/responses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await r.table('response').get(id).delete().run(connection);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start the Backend Server
app.listen(3000, () => {
    console.log('✅ Server running on http://localhost:3000');
});
// app.delete('/responses/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await r.table('response').get(id).delete().run(dbConnection);
//         res.status(200).json({ success: true, message: "Deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Failed to delete" });
//     }
// });
