const nodemailer = require('nodemailer')
require('dotenv').config()
const { google } = require('googleapis');


module.exports = {
    sendContactEmail(req, res) {
        const {name, email, eventDate, comment} = req.body
        
        // TODO: OAuth2 in progress. Currently unverified app on Google. https://www.woolha.com/tutorials/node-js-send-email-using-gmail-with-nodemailer-oauth-2

        // const oauth2Client = new google.auth.OAuth2(
        //     process.env.GMAIL_OAUTH_CLIENT_ID,
        //     process.env.GMAIL_OAUTH_CLIENT_SECRET,
        //     process.env.GMAIL_OAUTH_REDIRECT_URL,
        // );

        // // Generate a url that asks permissions for Gmail scopes
        // const GMAIL_SCOPES = [
        //     'https://mail.google.com/',
        //     'https://www.googleapis.com/auth/gmail.modify',
        //     'https://www.googleapis.com/auth/gmail.compose',
        //     'https://www.googleapis.com/auth/gmail.send',
        // ];

        // const url = oauth2Client.generateAuthUrl({
        //     access_type: 'offline',
        //     scope: GMAIL_SCOPES,
        // });
        
        // console.info(`authUrl: ${url}`);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_ADDRESS,
                pass: process.env.GMAIL_PASSWORD
            }
        })

        const mailOptions = {
            from: `"SydneyElizaFlorals.com" <${process.env.EMAIL}`,
            to: process.env.SYDNEYS_EMAIL,
            replyTo: email,
            subject: 'New Contact on SydneyElizaFlorals.com!',
            html: `
                <div style="text-align:center">
                    <h2> Hi, Sydney! </h2>
                    <h3> You have a new contact submission from sydneyelizaflorals.com! Here's the info: </h3>
                    <br/>
                    <h4> Name: </h4>
                    <p> ${name} </p>
                    <h4> Email: </h4>
                    <p> ${email} </p>
                    <h4> Event Date: </h4>
                    <p> ${eventDate} </p>
                    <h4> Comment: </h4>
                    <p> ${comment} </p>
                </div>
            `
        }

        transporter.sendMail(mailOptions, (error,info) => {
            if(error) {
                console.log('------------ sendContactEmail error', error)
            } else {
                console.log(`Email sent: ${info.response}`)
                res.status(200).send('Email sent successfully!')
            }
        })
    }

}