const nodeMailer = require('../config/nodemailer');


//this another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comments.ejs');

    nodeMailer.transporter.sendMail({
        from: '',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString, 
    }, (err, info) => {
        if(err){
            console.log(`Error in sending main ===> ${err}`);
            return;
        }
        console.log(`Messege Sent ==> ${info}`);
        return;
    })
}
