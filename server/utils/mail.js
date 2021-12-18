const nodemailer = require('nodemailer')

// Email sending function
exports.sendEmail = (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    })

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: html,
    }

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return console.log('Error occurs')
        }
        return console.log('Email sent!!!')
    })
}
