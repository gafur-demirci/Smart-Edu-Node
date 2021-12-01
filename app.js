const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// Connect Database
mongoose.connect('mongodb://localhost/smart-edu-db').then(() => {
    console.log('db connected!');
});

// Template Engine
app.set('view engine', 'ejs');

// Global Variables

global.userIN = null;

// Middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'keyboard_cat',
        resave: false,
        saveUninitialized: true,
    })
);

// Routes
app.use('*', (req, res, next) => {
    userIN = req.session.userID;
    next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});
