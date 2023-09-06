let mailOptions = (to, subject, text) => {
  return (mailOptions = {
    from: "vehibuy97@gmail.com",
    to: to,
    subject: subject,
    text: text,
  });
};
module.exports = mailOptions;
