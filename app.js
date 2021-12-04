const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

// Connect Database
mongoose.connect('mongodb+srv://gafur:gafur_1905+@cluster0.boqok.mongodb.net/smart-edu-db?retryWrites=true&w=majority').then(() => {
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
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://gafur:gafur_1905+@cluster0.boqok.mongodb.net/smart-edu-db?retryWrites=true&w=majority',
        }),
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.locals.flashMessages = req.flash();
    next();
});
app.use(
    methodOverride('_method', {
        methods: ['POST', 'GET'],
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

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});
