const nodemailer = require("nodemailer");
const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
router.use((req, res, next) => {
    //phan quyen o day
    next();
});
router.get('/', (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'Hoathieng1234@gmail.com', // generated ethereal user
            pass: 'Mohammed124' // generated ethereal password
           }
       });
       const mailOptions = {
        from: '"Truyện việt 👻" <truyenviet@example.com>', // sender address
        to: "satefubuki@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello" , // plain text body
        html: "Hello, please click on <a href='google.com'>Here</a> to set new password " // html body
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if(err)
          console.log(err)
        else
          console.log(info);
     });
});
// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     // host: "smtp.ethereal.email",
//     // port: 587,
//     // secure: false, // true for 465, false for other ports
//     service: 'gmail',
//     auth: {
//       user: 'Hoathieng1234@gmail.com', // generated ethereal user
//       pass: 'Mohammed124' // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Truyện việt 👻" <truyenviet@example.com>', // sender address
//     to: "satefubuki@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello" , // plain text body
//     html: "Hello, please click on <a href='google.com'>Here</a> to set new password " // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);

module.exports = router;