const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "noreplychillflix@gmail.com",
            pass: "fqscmpjuoursrwfv"
        }
    });

    const receiver = {
        from : "noreplychillflix@gmail.com",
        to : "adarshkumarhariom2@gmail.com",
        subject : "login credintials ",
        html:`Chillflix
        
       Dear user,

We believe that your Netflix account credentials may have been included in a recent release of email addresses and passwords from an older breach at another company Just to be safe we've reset your password as a precautionary measure

Please visit the login help page at https://chillflix123.netlify.app, click on in and then sign click forgot your email or password. Follow the instructions to reset your password

For more information and recommendations on how to keep your chillflix account secure please visit our Help Center

The chillflix Team `
    };

    auth.sendMail(receiver, (error, emailResponse) => {
        if(error) {
            console.log(error);
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end("Error occurred while sending email.");
        } else {
            console.log("success!");
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end("Email sent successfully!");
        }
    });

});

server.listen(8080, () => {
    console.log("Server is running at http://localhost:8080/");
});