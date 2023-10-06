const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");


let transporter = nodemailer.createTransport({
    service: 'zohomai',
    host: 'smtp.zoho.in',
    port: 587,
    secure: false,
    auth: {
        user: '',
        pass: ''
    }
});

let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log(`Error in rendering ==> ${err}`);
                return;
            }
            mailHTML = template;
        }
    )

    return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
