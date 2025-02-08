const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')
const PORT = 6900;
const app = express();
app.use(cors())
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const userName = req.body.name || 'unknown';
        const fileExtension = path.extname(file.originalname);
        cb(null, `${userName}${fileExtension}`);;
    },
});

const upload = multer({ storage });

app.post('/upload', upload.single('photo'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
        const photoDocument = {
            filename: req.file.filename,
            path: req.file.path,
            uploadedAt: new Date(),
        };

        await db.collection('photos').insertOne(photoDocument);

        res.json({ message: 'File uploaded successfully', file: req.file });
    } catch (err) {
        console.error('Error saving file to MongoDB', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Age: { type: Number, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
});

// Password Hashing Middleware
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Compare Passwords
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', UserSchema);

const jwt = require('jsonwebtoken');

// Register Route
app.post('/register', async (req, res) => {
    const { Name,
        Age,
        Email,
        Password} = req.body;
    try {
        let user = new User({ Name, Age,Email,Password });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send('Success');
    }
});

// Login Route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).send('User not found');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send('Invalid password');

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(400).send('Error logging in');
    }
});
