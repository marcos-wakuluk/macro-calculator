const express = require('express');
const { sendEmail } = require('./emailService'); // Path might vary depending on file location

const app = express();

// Route to send an email
app.get('/send-email', async (req, res) => {
  console.log('se estaria enviando email', req.body.email)
  // try {
  //   const response = await sendEmail();

  //   // Check the response and send a response to the client
  //   console.log('Email sent:', response);
  //   res.send('Email sent successfully.');
  // } catch (error) {
  //   console.error('Error sending email:', error);
  //   res.status(500).send('An error occurred while sending the email.');
  // }
});

// Start the server on a port (replace with your desired port)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
