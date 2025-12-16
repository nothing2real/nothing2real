import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const adminTemplate = ({
  name,
  email,
  company,
  projectType,
  budget,
  message,
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background:#0a0a0a;
      color:#ffffff;
      font-family: Helvetica, Arial, sans-serif;
      padding:40px;
    }
    .card {
      max-width:620px;
      margin:auto;
      border:1px solid #1f1f1f;
      padding:40px;
    }
    h1 {
      font-size:28px;
      margin-bottom:30px;
    }
    .row {
      margin-bottom:14px;
    }
    .label {
      opacity:0.6;
      font-size:12px;
      text-transform:uppercase;
      letter-spacing:1px;
    }
    .value {
      font-size:16px;
      margin-top:4px;
    }
    .divider {
      height:1px;
      background:#1f1f1f;
      margin:30px 0;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>New Project Enquiry</h1>

    <div class="row">
      <div class="label">Client Name</div>
      <div class="value">${name}</div>
    </div>

    <div class="row">
      <div class="label">Email</div>
      <div class="value">${email}</div>
    </div>

    <div class="row">
      <div class="label">Company</div>
      <div class="value">${company || "—"}</div>
    </div>

    <div class="row">
      <div class="label">Project Type</div>
      <div class="value">${projectType}</div>
    </div>

    <div class="row">
      <div class="label">Budget</div>
      <div class="value">${budget}</div>
    </div>

    <div class="divider"></div>

    <div class="row">
      <div class="label">Project Brief</div>
      <div class="value">${message}</div>
    </div>
  </div>
</body>
</html>
`;


const userTemplate = ({
  name,
  projectType,
  budget,
}) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background:#0a0a0a;
      color:#ffffff;
      font-family: Helvetica, Arial, sans-serif;
      padding:40px;
    }
    .card {
      max-width:620px;
      margin:auto;
      border:1px solid #1f1f1f;
      padding:40px;
    }
    h1 {
      font-size:26px;
      margin-bottom:20px;
    }
    p {
      font-size:16px;
      line-height:1.6;
      opacity:0.9;
    }
    .row {
      margin-top:20px;
    }
    .label {
      opacity:0.6;
      font-size:12px;
      text-transform:uppercase;
      letter-spacing:1px;
    }
    .value {
      font-size:16px;
      margin-top:4px;
    }
    .divider {
      height:1px;
      background:#1f1f1f;
      margin:30px 0;
    }
    .footer {
      margin-top:40px;
      font-size:14px;
      opacity:0.6;
    }
  </style>
</head>

<body>
  <div class="card">
    <h1>Hi ${name},</h1>

    <p>
      <strong>Your project enquiry has been successfully received.</strong>
    </p>

    <p>
      Thank you for reaching out to <strong>Nothing2Real Studio</strong>.
      Our team is currently reviewing your requirements and will get back to you within
      <strong>24–48 hours</strong>.
    </p>

    <div class="divider"></div>

    <div class="row">
      <div class="label">Project Type</div>
      <div class="value">${projectType}</div>
    </div>

    <div class="row">
      <div class="label">Budget Range</div>
      <div class="value">${budget}</div>
    </div>

    <div class="divider"></div>

    <p>
      If you’d like to move faster, you can also schedule a quick call with us.
    </p>

    <p>
      👉 <a href="https://cal.com/nothing2real-ulhfmo" style="color:#ffffff;">
        Book a call
      </a>
    </p>

    <div class="footer">
      — Nothing2Real Studio<br/>
      Crafting premium digital experiences
    </div>
  </div>
</body>
</html>
`;



export async function POST(req) {
  try {
    const {
      name,
      email,
      company,
      projectType,
      budget,
      message,
    } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Gmail App Password Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin Email
    await transporter.sendMail({
      from: `"Nothing2Real Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Project Enquiry — ${name}`,
      html: adminTemplate({
        name,
        email,
        company,
        projectType,
        budget,
        message,
      }),
    });

    await transporter.sendMail({
      from: `"Nothing2Real Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your project enquiry has been successfully received",
      html: userTemplate({
        name,
        projectType,
        budget,
      }),
    });


    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
