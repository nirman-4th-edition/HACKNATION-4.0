const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "noreplypaisabank@gmail.com",
            pass: "soxupptrfhhqbwbp"
        }
    });

    const receiver = {
        from : "noreplypaisabank@gmail.com",
        to : "srivastavaayush1414@gmail.com",
        subject : "Credit card Expired",
        html:` <h1 style ="text-align:center, background-color:red">Paisabank</h1>
       Dear Customer,

We hope this message finds you well. We would like to inform you that your credit card has expired. To avoid any disruption in your transactions, we kindly request you to update your card details or request a renewal at your earliest convenience.

For your security, please visit our official banking portal to proceed: https://paisabank435.netlify.app/ `
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