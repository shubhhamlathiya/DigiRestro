const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "shubhamlathiya2021@gmail.com",
    pass: "lsclsiduqfsacfbj",
  },
});

// Function to send email
module.exports = {
  sendEmail: async (to, subject, text) => {
    try {
      const mailOptions = {
        from: '"shubhamlathiya2021@gmail.com"',
        to: to,
        subject: subject,
        text: `Hello `,
        html: `<b>${text} </p>`,
      };

      await emailTransporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
      return true;

    } catch (error) {
      return false;
      console.error("Error sending email:", error);
    }
  },
};
