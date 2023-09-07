const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "vehibuy97@gmail.com",
    pass: "Vehibuy98+",
    clientId:
      "385426413118-qtcv0kd8so271r879rhbopiunf8mjpm7.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04D3fv7-WM4MKCgYIARAAGAQSNwF-L9Irqo0goFV05ppJSv_GVUWpdLE0t828ncVRTsvYfwf73cl0A_nPxniZ_rZaD9RrP3i2OyY",
  },
});
module.exports = transporter;
