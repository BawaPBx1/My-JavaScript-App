import nodemailer from 'nodemailer';
import { transporter } from '../config/emailConfig.js';
import dotenv from 'dotenv';

dotenv.config();

export const sendResetEmail = async (recipientEmail, userFirstName, resetToken) => {
  const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

  // const htmlTemplate = `
  //   <!DOCTYPE html>
  //   <html>
  //   <body style="font-family: Arial, sans-serif;">
  //     <h2>Reset Your Password</h2>
  //     <p>Hi ${userFirstName},</p>
  //     <p>You requested a password reset. Click the button below to reset it:</p>
  //     <a href="${resetLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
  //     <p>This link will expire in 1 hour.</p>
  //     <p>If you didn’t request this, just ignore this email.</p>
  //   </body>
  //   </html>
  // `;
  const htmlTemplate = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
        <h2 style="color: #333;">🔐 Reset Your Password</h2>
        <p style="font-size: 16px; color: #555;">
          Hi ${userFirstName},<br /><br />
          We received a request to reset the password for your account. If you made this request, click the button below to choose a new password:
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
            Reset Password
          </a>
        </div>

        <p style="font-size: 14px; color: #777;">
          If you didn’t request a password reset, you can ignore this email—your password will remain the same.<br /><br />
          This link will expire in 1 hour for your security.
        </p>

        <p style="font-size: 14px; color: #999;">
          – The ${process.env.EMAIL_APP_NAME} Team
        </p>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    // from: `"Your App Name" <${process.env.EMAIL_APP_NAME}>`,
    from: `<${process.env.EMAIL_APP_NAME}>`,
    to: recipientEmail,
    subject: 'Reset Your Password',
    html: htmlTemplate,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Password reset email sent to ${recipientEmail} : `, result);
    // return res.status(200).json({
    return {
      message: "Password reset email sent successfully!",
    };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    throw error;
  }
};