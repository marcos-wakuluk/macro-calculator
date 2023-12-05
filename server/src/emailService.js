const mailerSend = require('mailersend');

const mailer = new mailerSend({
  apiKey: process.env.API_KEY_MAILERSEND,
});

const sendEmail = async () => {
  try {
    const email = {
      to: [{ email: 'wakuluk.marcos@gmail.com', name: 'Lucas Yciz' }],
      subject: 'Uso la calculadora de macros',
      text: 'Email del usuario',
      from: 'sender@example.com',
    };

    // Send the email
    const response = await mailer.send(email);
    return response;
  } catch (error) {
    throw new Error('Error sending email');
  }
};

module.exports = { sendEmail };
