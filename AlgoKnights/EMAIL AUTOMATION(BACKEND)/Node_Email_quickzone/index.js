const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    const auth = nodemailer.createTransport({
        service: "gmail",
        secure : true,
        port : 465,
        auth: {
            user: "noreplyquickzone@gmail.com",
            pass: "jjivubvjffdktikl"
        }
    });

    const receiver = {
        from : "noreplyquickzone@gmail.com",
        to : "arundhatisingh0101@gmail.com",
        subject : "Delivery Update",
        html : `<h6>Dear Buyer</h6><br>
                <p>Your order will be delivered today kindly fill the details on the given link<a href="">Click here</a></p>
                <br>
                <h6>Thank You</h6><br>
                <p>Team Quickzone</p>
                `
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