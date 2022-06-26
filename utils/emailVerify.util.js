// const sendGrid = require('sendgrid').mail;
// const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendVerificationEmail = (to, token) => {
    const hostUrl = process.env.hostURL;
    const msg = {
      to: to, // Change to your recipient
      from: 'sanjeevmishra391@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: `Click on this link to verify your email ${hostUrl}/auth/verify/${to}/${token}`,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((error) => {
        console.error(error)
      })
};