/* eslint-disable no-undef */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import twilio from "twilio";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  throw new Error(
    "TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set in the .env file"
  );
}

const client = twilio(accountSid, authToken);

app.post("/send-sms", (req, res) => {
  const { message, to } = req.body;

  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    })
    .then((message) => res.json({ success: true, sid: message.sid }))
    .catch((error) => res.json({ success: false, error: error.message }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
