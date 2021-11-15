const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const multer = require('multer');
const path = require('path');
const dbConnect = require('./db');
require('dotenv').config();

const errorHandler = require('./utils/error');

//initiate app
const app = express();

//connect database
dbConnect();

//middlewares
app.use(express.json({ limit: '10kb' }));
app.use(helmet()); //Set Security HTTP headers
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use('/api/auth', require(`./routes/auth`));
app.use('/api/contacts', require(`./routes/contact`));
app.use('/api/groups', require(`./routes/group`));
app.use('/api/senders', require(`./routes/sender`));
app.use('/api/messages', require(`./routes/message`));

app.use(errorHandler);

module.exports = app;