require('dotenv').config();
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const database = require('./database');
const port = process.env.PORT;

// routes
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.listen(port, () => {
  console.log('server is ready:' + port);
});
