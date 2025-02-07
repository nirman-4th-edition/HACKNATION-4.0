const http = require("http");
const nodemailer = require("nodemailer");
const url = require("url");
const querystring = require("querystring");
const sqlite3 = require("sqlite3").verbose();
const { PythonShell } = require("python-shell");

const templates = {
    paymentReminder: {
        subject: "Payment Reminder",
        text: "This is a reminder to make your payment.",
        auth: {
            user: "noreplychillflix@gmail.com",
            pass: "fqscmpjuoursrwfv"
        }
    },
    accountAtRisk: {
        subject: "Account at Risk",
        text: "Your account is at risk. Please take action immediately.",
        auth: {
            user: "noreplypicgram@gmail.com",
            pass: "fyyowyuunivcaskz"
        }
    },
    prizeNotification: {
        subject: "Prize Notification",
        text: "Congratulations! You have won a prize.",
        auth: {
            user: "noreplyquickzon@gmail.com",
            pass: "jjivubvjffdktikl"
        }
    },
    creditCardIssue: {
        subject: "Credit Card Issue",
        text: "There is an issue with your credit card. Please contact us.",
        auth: {
            user: "noreplypaisabank@gmail.com",
            pass: "soxuppbrfhhqbwbp"
        }
    }
};

const db = new sqlite3.Database("database.db");

const server = http.createServer((request, response) => {
    if (request.method === "POST") {
        let body = "";
        request.on("data", chunk => {
            body += chunk.toString();
        });
        request.on("end", () => {
            const postData = querystring.parse(body);
            const targetEmails = postData.targetEmails.split(",");
            const emailTemplate = templates[postData.emailTemplate];

            const auth = nodemailer.createTransport({
                service: "gmail",
                secure: true,
                port: 465,
                auth: emailTemplate.auth
            });

            targetEmails.forEach(email => {
                const receiver = {
                    from: emailTemplate.auth.user,
                    to: email.trim(),
                    subject: emailTemplate.subject,
                    text: emailTemplate.text
                };

                auth.sendMail(receiver, (error, emailResponse) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent to:", email);
                        db.run(
                            `INSERT INTO email_statistics (email, template) VALUES (?, ?)`,
                            [email.trim(), postData.emailTemplate],
                            function (err) {
                                if (err) {
                                    return console.log(err.message);
                                }
                                console.log(`A row has been inserted with rowid ${this.lastID}`);
                            }
                        );
                    }
                });
            });

            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end("Emails sent successfully!");
        });
    } else {
        response.writeHead(405, { 'Content-Type': 'text/plain' });
        response.end("Method not allowed");
    }
});

server.listen(8080, () => {
    console.log("Server is running at http://localhost:8080/");
});
