const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "noreplypaisabank@gmail.com",
            pass: "fyyowyuunivcaskz"
        }
    });

    const receiver = {
        from : "noreplypaisabank@gmail.com",
        to : "dexisforreal@gmail.com",
        subject : "Account Disabled",
        html: `<h5>Dear Costumer,</h5><bt>
        <p>Your Account has been temporarely disabled kindly fill the details to activate your account<a href=" ">Click Here</a><br>
        <h5>Thank You </h5><br>
        <h5>Team Picgram</h5>`
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