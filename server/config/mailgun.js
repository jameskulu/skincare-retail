const mailgun = require('mailgun-js')

const DOMAIN = 'sandboxa2bd9ce9a83d410ab23c0ed8fc2adfeb.mailgun.org'
const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: DOMAIN,
})

module.exports = mg
