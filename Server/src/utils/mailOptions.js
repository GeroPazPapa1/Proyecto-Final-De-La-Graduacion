let mailOptions = (to, subject, html) => {
  return (mailOptions = {
    from: "vehibuy97@gmail.com",
    to: to,
    subject: subject,
    html: html,
  });
};
module.exports = mailOptions;
