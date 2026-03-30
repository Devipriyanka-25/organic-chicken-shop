import nodemailer from 'nodemailer';

let transporter: any = null;

export async function initializeEmailTransporter() {
  if (transporter) return transporter;

  // For development, use Ethereal test account
  if (process.env.NODE_ENV === 'development' && !process.env.EMAIL_USER) {
    console.log('Creating Ethereal test account...');
    const testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    console.log('Ethereal test account created!');
    console.log('Test email user:', testAccount.user);
    console.log('Test email pass:', testAccount.pass);
    return transporter;
  }

  // For production, use configured email service
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter;
}

export async function sendPasswordResetEmail(
  to: string,
  resetLink: string,
  userName: string
) {
  try {
    const transporter = await initializeEmailTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@organmeat.com',
      to,
      subject: 'Reset Your Password - Organic Meat Shop',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #2d5016; color: white; padding: 20px; text-align: center; border-radius: 5px; }
              .content { padding: 20px; background: #f5f5f5; margin: 20px 0; border-radius: 5px; }
              .button { background: #67c26f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
              .footer { text-align: center; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Password Reset Request</h1>
              </div>
              <div class="content">
                <p>Hi ${userName},</p>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <a href="${resetLink}" class="button">Reset Password</a>
                <p>Or copy this link in your browser:</p>
                <p><small>${resetLink}</small></p>
                <p><strong>This link will expire in 24 hours.</strong></p>
                <p>If you didn't request this, you can ignore this email.</p>
              </div>
              <div class="footer">
                <p>© 2026 Organic Meat Shop. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);

    // In development with Ethereal, log preview URL
    if (process.env.NODE_ENV === 'development') {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
