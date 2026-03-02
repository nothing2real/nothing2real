import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// LUXURY EDITORIAL STYLE - ADMIN TEMPLATE
const adminTemplate = ({ name, email, company, projectType, budget, message }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { background-color: #f8f8f8; margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; }
    .header { padding: 40px; border-bottom: 1px solid #f0f0f0; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.04em; text-transform: uppercase; }
    .content { padding: 40px; }
    .section-label { font-family: 'Courier New', Courier, monospace; font-size: 10px; text-transform: uppercase; color: #a0a0a0; letter-spacing: 0.2em; margin-bottom: 8px; }
    .data-value { font-size: 16px; font-weight: 500; margin-bottom: 32px; color: #1a1a1a; }
    .brief-box { background: #fbfbfb; padding: 30px; border-left: 2px solid #000000; font-size: 15px; line-height: 1.6; color: #444; }
    .footer { padding: 40px; border-top: 1px solid #f0f0f0; font-size: 11px; color: #a0a0a0; text-transform: uppercase; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Inquiry</h1>
    </div>
    <div class="content">
      <div class="section-label">01 / Client</div>
      <div class="data-value">${name} <span style="font-weight:400; color:#a0a0a0;">— ${company || "Independent"}</span></div>
      
      <div class="section-label">02 / Contact</div>
      <div class="data-value">${email}</div>

      <div style="display: flex; gap: 40px;">
        <div style="flex: 1;">
          <div class="section-label">03 / Type</div>
          <div class="data-value">${projectType}</div>
        </div>
        <div style="flex: 1;">
          <div class="section-label">04 / Budget</div>
          <div class="data-value">${budget}</div>
        </div>
      </div>

      <div class="section-label">05 / Project Brief</div>
      <div class="brief-box italic">${message}</div>
    </div>
    <div class="footer">
      Studio Archive — Log: ${new Date().toLocaleDateString()}
    </div>
  </div>
</body>
</html>
`;

// LUXURY MINIMALIST - USER CONFIRMATION
const userTemplate = ({ name, projectType, budget }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { background-color: #f8f8f8; margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1a1a1a; }
    .wrapper { max-width: 600px; margin: 0 auto; background: #ffffff; }
    .hero { padding: 60px 40px; background: #000; color: #fff; text-align: center; }
    .hero h1 { margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -0.05em; text-transform: uppercase; }
    .content { padding: 50px 40px; line-height: 1.8; color: #333; font-size: 16px; }
    .data-grid { margin: 40px 0; border-top: 1px solid #eee; }
    .grid-item { padding: 20px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; }
    .btn { display: inline-block; background: #000; color: #fff; padding: 18px 32px; text-decoration: none; font-weight: 700; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 20px; }
    .footer { padding: 40px; font-size: 12px; color: #a0a0a0; text-align: center; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="hero">
      <h1>Nothing2Real</h1>
    </div>
    <div class="content">
      Hello ${name},<br/><br/>
      Your enquiry has reached our studio. We believe every innovation deserves thoughtful developers, and we are currently reviewing your brief to see how we can elevate your vision.
      
      <div class="data-grid">
        <div class="grid-item">
          <span style="text-transform:uppercase; font-size:11px; color:#a0a0a0; letter-spacing:1px;">Subject</span>
          <span style="font-weight:600;">${projectType}</span>
        </div>
        <div class="grid-item">
          <span style="text-transform:uppercase; font-size:11px; color:#a0a0a0; letter-spacing:1px;">Range</span>
          <span style="font-weight:600;">${budget}</span>
        </div>
      </div>

      Expect a response from our lead developer within 24–48 hours. If you wish to bypass the wait, you may book a direct consultation below.
      <br/><br/>
      <a href="https://cal.com/nothing2real-ulhfmo" class="btn">Schedule Call</a>
    </div>
    <div class="footer">
      © Nothing2Real Studio — Aesthetic. Elegance. Experience.
    </div>
  </div>
</body>
</html>
`;

export async function POST(req) {
  try {
    const { name, email, company, projectType, budget, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin Notification
    await transporter.sendMail({
      from: `"N2R Studio" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `[INQUIRY] ${name} — ${projectType}`,
      html: adminTemplate({ name, email, company, projectType, budget, message }),
    });

    // User Receipt
    await transporter.sendMail({
      from: `"Nothing2Real Studio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Acknowledgment of Project Enquiry",
      html: userTemplate({ name, projectType, budget }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("EMAIL ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}