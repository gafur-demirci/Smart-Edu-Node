const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
    console.log(req.session.userID);
    res.status(200).render('index', {
        page_name: 'index',
    });
};

exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
        page_name: 'about',
    });
};

/* exports.getCoursesPage = (req, res) => {
    res.status(200).render('courses', {
        page_name: 'courses',
    });
}; */

/* exports.getDashboardPage = (req, res) => {
    res.status(200).render('dashboard', {
        page_name: 'dashboard',
    });
}; */

exports.getContactPage = (req, res) => {
    res.status(200).render('contact', {
        page_name: 'contact',
    });
};

exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
        page_name: 'login',
    });
};

exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
        page_name: 'register',
    });
};

exports.sendEmail = async (req, res) => {
    const outputMessage = `
    
    <h1>Mail Detail</h1>

    <ul>

        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>

    </ul>
    <h1>Message Detail</h1>

    <p>${req.body.message}</p>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "gafur.gs.68@gmail.com", // gmail account
            pass: "dxuncocgbfoeqcdk", // gmail password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Smart Edu Contact" <gafur.gs.68@gmail.com>', // sender address
        to: 'gafur.gs.68@gmail.com', // list of receivers
        subject: 'Smart Edu New Message From Contact Page ✔', // Subject line
        html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.status(200).redirect('contact')

    // console.log(req.body);
};
