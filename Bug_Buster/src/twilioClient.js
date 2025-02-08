/* eslint-disable no-undef */
// src/twilioClient.js
const twilio = require("twilio");

// Your Twilio account SID and Auth Token from your Twilio Console
const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

module.exports = client;
