const express = require('express');
const pageRoute = require('./routes/pageRoute');


const app = express();

// Template Engine
app.set('view engine', 'ejs');

// Middlewares
app.use(express.static('public'));

// Routes

app.use('/', pageRoute);
/* app.get('/about', pageComtroller.getAboutPage);
app.get('/courses', pageComtroller.getCoursesPage);
app.get('/dashboard', pageComtroller.getDashboardPage);
app.get('/contact', pageComtroller.getContactPage); */

const port = 3000;

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor...`);
});
