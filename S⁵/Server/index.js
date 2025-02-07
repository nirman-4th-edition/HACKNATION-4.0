const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


require('./db/db')();
require('./models/index');
require('./routes/index')(app);

const port = process.env.PORT || 3000;

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});