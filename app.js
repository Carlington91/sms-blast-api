const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');
const dbConnect = require('./db');
require('dotenv').config();


//initiate app
const app = express();

//connect database
dbConnect();

//middlewares
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));


//routes
app.use('/api/auth', require(`./routes/auth`));
app.use('/api/contacts', require(`./routes/contact`));
app.use('/api/groups', require(`./routes/group`));

module.exports = app;