// Requirements.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const usersRouter = require('./routes/users');
const workspacesRouter = require('./routes/workspaces');
const projectsRouter = require('./routes/projects');

const PORT = process.env.PORT || 8000;
const uri = process.env.DB_URL;

//basic middlewares
app.use(bodyParser.json());
app.use(cors());

// Mount API routes on the /api URI prefix
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/workspaces', workspacesRouter);
app.use('/api/v1/projects', projectsRouter);


// Connect to MongoDB (replace 'mongodb://localhost/project_tracking_db' with your MongoDB connection string)
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
