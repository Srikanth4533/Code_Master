const nodeMailer = require("nodemailer");

const EMAIL_USER = "d2c07bc582d467";
const EMAIL_PASS = "324e40fd3b004a";
const EMAIL_HOST = "sandbox.smtp.mailtrap.io";
const EMAIL_PORT = 25;

const sendEmail = async (option) => {
  // CREATE A TRANSPORTER
  const transporter = nodeMailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  // DEFINE EMAIL OPTIONS
  const emailOptions = {
    from: "MovieHUB support<support@moviehub.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = sendEmail;
