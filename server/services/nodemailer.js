const nodemailer = require('nodemailer');

function getTransporter(user, pass) {
    return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user,
            pass,
        },
    });
}

function generateMailOptions(recipient) {
    return {
        from: 'miha.gulak@gmail.com',
        to: recipient.email,
        subject: 'City Pulse welcome message',
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to City Pulse</title>
        </head>
        <body>
        <table width="100%" style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <tr>
            <td align="center">
              <h1>Welcome to City Pulse!</h1>
            </td>
          </tr>
          <tr>
            <td>
              <p>Dear ${recipient.displayName},</p>
              <p>We're thrilled to have you on board and to be your go-to source for all things local. Whether you're looking for the latest community events, interesting stories, or insider tips, we've got you covered.</p>
              <p>Here's what you can expect from us:</p>
              <ul>
                <li>Listing of latest articles and events.</li>
                <li>Comfortable text editor with markup support for you to create articles.</li>
                <li>An interactive map where you can see where and when various events will take place.</li>
              </ul>
              <p>We're dedicated to bringing you timely, relevant, and engaging content that enriches your connection to our community.</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Our mailing address:</p>
              <p>miha.gulak@gmail.com</p>
            </td>
          </tr>
        </table>
        </body>
        </html>
        `,
    };
}

module.exports = { getTransporter, generateMailOptions };
