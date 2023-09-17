let mailOptions = (to, subject, html) => {
  return (mailOptions = {
    from: "VehiBuy",
    to: to,
    subject: subject,
    html: html,
    attachments: [
      {
        filename: "facebook.png",
        path: "./facebook.png",
        cid: "fb",
      },
      {
        filename: "LOGO.png",
        path: "./LOGO.png",
        cid: "logo",
      },
      {
        filename: "linkedin.png",
        path: "./linkedin.png",
        cid: "ld",
      },
      {
        filename: "gmail.png",
        path: "./gmail.png",
        cid: "gmail",
      },
      {
        filename: "wapp.png",
        path: "./wapp.png",
        cid: "wapp",
      },
    ],
  });
};
module.exports = mailOptions;
