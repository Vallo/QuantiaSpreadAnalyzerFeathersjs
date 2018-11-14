'use strict';
const nodemailer = require('nodemailer');
const mail = 'mail@mail.com';
const pass = 'pass';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mail,
    pass: pass
  }
});


module.exports = {
// setup email data with unicode symbols
  mailOptions(moneda, texto, mails) {
    return {
      from: '"Fred Foo 👻" <mail@mail.com>', // sender address //todo sender
      to: mails.join(', '), // list of receivers
      subject: `Alerta ${moneda}`, // Subject line
      text: texto, // plain text body
    };
  },
  // send mail with defined transport object
  sendMail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  }
};
