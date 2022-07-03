const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const hostUrl = process.env.hostURL;

exports.sendVerificationEmail = (to, token) => {
    const msg = {
      to: to, // Change to your recipient
      from: 'sanjeevmishra391@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: `Click on this link to verify your email ${hostUrl}/verify/${to}/${token}`,
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

exports.sendPasswordResetEmail = (email, token) => {
    const content = {
      to: email,
      from: "sanjeevmishra391@gmail.com",
      subject: "Password Recovery",
      html: `Click to set a new password : ${hostUrl}/verify_password_reset/${token}`
    }
    
    sgMail.send(content)
    .then(() => {
      console.log('Password reset email sent');
    })
    .catch((error) => {
      console.error(error)
    })
}