import { readFileSync } from "fs";
import { resolve } from "path";
import nodemailer from "nodemailer";

function loadEnvFile(filePath: string) {
  const content = readFileSync(filePath, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvFile(resolve(process.cwd(), ".env.local"));

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST ?? "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT ?? "587");
  const to = process.env.CONTACT_TO_EMAIL ?? user;

  if (!user || !pass || !to) {
    console.error("FAIL: Missing SMTP_USER, SMTP_PASS, or CONTACT_TO_EMAIL in .env.local");
    process.exit(1);
  }

  console.log("Testing SMTP connection...");
  console.log(`Host: ${host}:${port}`);
  console.log(`From: ${user}`);
  console.log(`To: ${to}`);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.verify();
    console.log("OK: SMTP connection verified");

    const info = await transporter.sendMail({
      from: `"Jasmeet Singh Real Estate" <${user}>`,
      to,
      subject: "SMTP test — Jasmeet Singh website",
      text: "This is a test email from the Jasmeet Singh Real Estate website contact form SMTP setup. If you received this, email delivery is working.",
      html: "<p>This is a <strong>test email</strong> from the Jasmeet Singh Real Estate website contact form SMTP setup.</p><p>If you received this, email delivery is working.</p>",
    });

    console.log("OK: Test email sent successfully");
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
  } catch (error) {
    console.error("FAIL: SMTP test failed");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
