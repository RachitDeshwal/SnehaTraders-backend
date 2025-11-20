import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', sans-serif; background-color: #f8f9fa; padding: 30px;">
        <div style="max-width: 520px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); overflow: hidden;">
          
          <div style="background-color: #1e3a8a; padding: 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0;">Sneha Traders</h1>
          </div>

          <div style="padding: 30px; text-align: center;">
            <h2 style="color: #111827; margin-bottom: 10px;">Verify Your Email</h2>
            <p style="color: #374151; font-size: 15px; margin-bottom: 20px;">
              Thank you for signing up with <strong>Sneha Traders</strong>.<br/>
              Please use the OTP below to verify your email address.
            </p>

            <div style="background: #f3f4f6; display: inline-block; padding: 16px 28px; border-radius: 10px; font-size: 28px; font-weight: bold; letter-spacing: 3px; color: #111827; margin-bottom: 20px;">
              ${otp}
            </div>

            <p style="color: #6b7280; font-size: 14px;">
              This OTP will expire in <strong>5 minutes</strong>.
            </p>

            <a href="#" style="display: inline-block; margin-top: 25px; background-color: #1e3a8a; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: bold;">
              Verify Now
            </a>
          </div>

          <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 13px; color: #6b7280;">
            <p style="margin: 0;">© ${new Date().getFullYear()} Sneha Traders. All rights reserved.</p>
          </div>

        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Sneha Traders" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: htmlContent,
    });

    console.log("✅ Email sent successfully!");
  } catch (error) {
    console.error("❌ Email not sent:", error);
  }
};
