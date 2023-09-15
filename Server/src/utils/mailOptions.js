let mailOptions = (to, subject, html) => {
  return (mailOptions = {
    from: "VehiBuy",
    to: to,
    subject: subject,
    html: html,
    attachments: [
      {
        filename: "facebook.png",
        path: "/home/daniel/Documentos/Proyecto-Final-Final/Server/src/utils/facebook.png",
        cid: "fb",
      },
      {
        filename: "LOGO.png",
        path: "/home/daniel/Documentos/Proyecto-Final-Final/Server/src/utils/LOGO.png",
        cid: "logo",
      },
      {
        filename: "linkedin.png",
        path: "/home/daniel/Documentos/Proyecto-Final-Final/Server/src/utils/linkedin.png",
        cid: "ld",
      },
      {
        filename: "gmail.png",
        path: "/home/daniel/Documentos/Proyecto-Final-Final/Server/src/utils/gmail.png",
        cid: "gmail",
      },
      {
        filename: "wapp.png",
        path: "/home/daniel/Documentos/Proyecto-Final-Final/Server/src/utils/wapp.png",
        cid: "wapp",
      },
    ],
  });
};
module.exports = mailOptions;
