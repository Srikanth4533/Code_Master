const nodeMailer = require("nodemailer");
const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_PASS,
  EMAIL_USER,
} = require("../config/serverConfig");

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
