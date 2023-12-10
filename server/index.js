require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require("./userSchema.js");
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const secretKey = process.env.SECRET_KEY; 
const DBURL = process.env.DBURI;
//multer's things
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // this for large file (so we need to save in disk inorder to use it)
const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage }) //this for small size files

// Middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(cors());

mongoose.set("strictQuery", false);

// MongoDB setup (Replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));


// Routes
//Authentication Routes

app.post('/api/register', async (req, res) => {
  console.log("registering user")
  console.log(req.body)
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.json({ token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ error: 'Email already exists' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});


//Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});


app.post('/api/file-upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileText = req.file.buffer.toString('utf8');
    console.log(fileText);
  

    res.json({ message: 'File uploaded successfully' ,content: fileText});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});