
const nodemailer = require('nodemailer');
// const sendGridTransport = require('nodemailer-sendgrid-transport');
const handlebars = require('handlebars');
const fs = require('fs');


//READ HTML EMAIL FILE
var readHTMLFile = function(path, callback) {


    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};


const sendMail = async (options) => {

    
    // 1. create transporter
    let transporter;
    if (process.env.NODE_ENV === 'development'){

    
        //MAILTRAP transporter
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth:{
                user: process.env.GMAIL_EMAIL,
                pass: process.env.PASS
            }
        })
    }else{

        // //SENDGRID Transporter
        transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: process.env.GMAIL_EMAIL,
                pass: process.env.PASS
            }
        })
    }



    // READ EMAIL FILE AND REPLACE VARIABLES AND SEND MAIL
    let HTMLEmailFile;
    if (options.emailType === 'activation'){
        HTMLEmailFile = '/emailTemplates/activateAccount.html'
    }else if (options.emailType === 'forgotPassword'){
        HTMLEmailFile = '/emailTemplates/resetPassword.html'
    }
    readHTMLFile(__dirname + HTMLEmailFile , async function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             link: options.URL
        };
        var htmlToSend = template(replacements);
        const mailOptions = {
            from: 'attainu.deepambahre@gmail.com',
            to: options.email,
            // cc:''
            subject: options.subject,
            // text: options.message
            html: htmlToSend
        }
        await transporter.sendMail(mailOptions);
    });


    // // 2. define email options
    // const mailOptions = {
    //     from: 'ADMIN <camagru@test.com',
    //     to: options.email,
    //     // cc:''
    //     subject: options.subject,
    //     // text: options.message
    //     html: htmlTemplate
    // }

    // // 3. send email
    // await transporter.sendMail(mailOptions);
}


module.exports = sendMail;