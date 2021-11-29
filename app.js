const express = require('express');
const mongoose = require('mongoose');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');


const app = express();

// Connect Database
mongoose.connect('mongodb://localhost/smart-edu-db').then(() => { console.log('db connected!')});

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

// Routes

app.use('/', pageRoute);
app.use('/courses', courseRoute);

/* app.get('/about', pageComtroller.getAboutPage);
app.get('/courses', pageComtroller.getCoursesPage);
app.get('/dashboard', pageComtroller.getDashboardPage);
app.get('/contact', pageComtroller.getContactPage); */

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});
