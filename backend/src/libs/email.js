import nodemailer from "nodemailer";

const buildTransport = () => {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });
};

const sendCodeEmail = async ({ to, subject, title, code, description }) => {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const transporter = buildTransport();

  await transporter.sendMail({
    from,
    to,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; background: #f8fafc; padding: 24px;">
        <div style="max-width: 560px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 32px; border: 1px solid #e5e7eb;">
          <h2 style="margin: 0 0 12px; font-size: 24px; color: #111827;">${title}</h2>
          <p style="margin: 0 0 24px; color: #4b5563; line-height: 1.6;">${description}</p>
          <div style="font-size: 32px; font-weight: 800; letter-spacing: 8px; text-align: center; padding: 18px 20px; border-radius: 16px; background: #f3f4f6; color: #111827;">
            ${code}
          </div>
          <p style="margin: 24px 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
            Mã này sẽ hết hạn sau 30 phút. Nếu bạn không yêu cầu thao tác này, hãy bỏ qua email.
          </p>
        </div>
      </div>
    `,
  });
};

export { sendCodeEmail };
