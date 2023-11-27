const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Read the contents of emails.txt
function readEmailsFile() {
  try {
    const content = fs.readFileSync('emails.txt', 'utf8');
    return content;
  } catch (error) {
    throw new Error('Error reading emails.txt file');
  }
}

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rehmanwasik263@gmail.com', 
    pass: 'Pakistan9377', 
  },
});

// Define a route to display the contents of emails.txt
app.get('/emails', (req, res) => {
  try {
    const emailsContent = readEmailsFile();
    res.sendFile(__dirname + '/index.html');
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
});

// Define a route to send the email
app.get('/send-email', (req, res) => {
  try {
    const emailsContent = readEmailsFile();

    // Send email
    transporter.sendMail({
      from: 'rehmanwasik263@gmail.com', 
      to: 'rehmanwasik263@gmail.com', 
      subject: 'Read data from the Text file',
      text: emailsContent,
    });

    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/emails`);
});
