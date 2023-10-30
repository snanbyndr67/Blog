const express = require('express')
const router = express.Router()

router.post('/email', (req, res) => {
    const outputHTML = `
                        <h2>Mail Details</h2>
                        <ul>
                            <li>Name : ${req.body.name} </li>
                            <li>Email : ${req.body.email} </li>
                            <li>Phone : ${req.body.phone} </li>
                        </ul>
                        <h3>Message </h3>
                        <p>${req.body.message}</p>`

    "use strict";
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: 'blogdemohesap@gmail.com',
            pass: 'shvz ggbe ygcl xafu'
        }
    });

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Node Project Contact Form 👻" <blogdemohesap@gmail.com>', // sender address
            to: "blogdemohesap@gmail.com", // list of receivers
            subject: "Node Contact Subject", // Subject line
            text: "Hello world?", // plain text body
            html: outputHTML, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        //
        // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
        //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
        //       <https://github.com/forwardemail/preview-email>
        //
        req.session.sessionFlash = {
            type: 'alert alert-success',
            message: "Your message has been send"
        }

        res.redirect('/contact')

    }



    main().catch(console.error);

})




module.exports = router