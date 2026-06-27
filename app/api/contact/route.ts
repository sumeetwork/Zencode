import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const PROJECT_TYPES: Record<string, string> = {
  website: 'New Website',
  ecommerce: 'eCommerce Store',
  redesign: 'Website Redesign',
  seo: 'SEO & Optimisation',
  ai: 'AI Automation',
  maintenance: 'Maintenance & Support',
  other: 'Other',
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, projectType, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const projectLabel = PROJECT_TYPES[projectType] ?? projectType ?? 'Not specified';

  // ── Email to ZenCode ──────────────────────────────────────────────────
  await transporter.sendMail({
    from: `"ZenCode Contact Form" <${process.env.SMTP_USER}>`,
    to: 'info@zencode.co.za',
    replyTo: email,
    subject: `New Project Enquiry – ${projectLabel} from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:#112D32;padding:28px 32px;border-radius:6px 6px 0 0">
          <h2 style="color:#88BDBC;margin:0;font-size:1.3rem;letter-spacing:-0.02em">New Project Enquiry</h2>
          <p style="color:rgba(232,228,223,0.6);margin:6px 0 0;font-size:0.85rem">via zencode.co.za contact form</p>
        </div>
        <div style="background:#fff;padding:32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 6px 6px">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:0.85rem;color:#6b7280;width:140px">Full Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:0.85rem;color:#6b7280">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><a href="mailto:${email}" style="color:#254E58">${email}</a></td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:0.85rem;color:#6b7280">Contact Number</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${phone || '—'}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:0.85rem;color:#6b7280">Project Type</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><span style="background:#e8f4f3;color:#254E58;padding:2px 10px;border-radius:20px;font-size:0.8rem;font-weight:600">${projectLabel}</span></td></tr>
          </table>
          <div style="margin-top:24px">
            <p style="font-size:0.85rem;color:#6b7280;margin-bottom:10px">Project Summary</p>
            <div style="background:#f9fafb;border-left:3px solid #88BDBC;padding:16px 20px;border-radius:0 4px 4px 0;line-height:1.7;font-size:0.95rem">${message.replace(/\n/g, '<br>')}</div>
          </div>
          <div style="margin-top:28px;padding-top:20px;border-top:1px solid #f0f0f0;font-size:0.8rem;color:#9ca3af">
            Reply directly to this email to reach <strong>${name}</strong> at ${email}.
          </div>
        </div>
      </div>
    `,
  });

  // ── Confirmation email to sender ──────────────────────────────────────
  await transporter.sendMail({
    from: `"ZenCode Web Solutions" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `We received your enquiry, ${name.split(' ')[0]}! 👋`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#333">
        <div style="background:#112D32;padding:28px 32px;border-radius:6px 6px 0 0">
          <h2 style="color:#88BDBC;margin:0;font-size:1.3rem;letter-spacing:-0.02em">ZenCode Web Solutions</h2>
          <p style="color:rgba(232,228,223,0.55);margin:4px 0 0;font-size:0.8rem">zencode.co.za</p>
        </div>
        <div style="background:#fff;padding:36px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 6px 6px">
          <h3 style="margin:0 0 12px;font-size:1.1rem">Hi ${name.split(' ')[0]}, thanks for reaching out!</h3>
          <p style="color:#4b5563;line-height:1.7;margin:0 0 24px">
            We've received your enquiry and will get back to you as soon as possible — typically within 24 hours on business days.
          </p>

          <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:24px;margin-bottom:28px">
            <p style="font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;color:#9ca3af;margin:0 0 16px">Your submission</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:0.82rem;color:#6b7280;width:130px">Project Type</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:0.9rem;font-weight:600">${projectLabel}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:0.82rem;color:#6b7280">Contact Number</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:0.9rem">${phone || '—'}</td></tr>
            </table>
            <div style="margin-top:16px">
              <p style="font-size:0.82rem;color:#6b7280;margin:0 0 8px">Your message</p>
              <div style="background:#fff;border-left:3px solid #88BDBC;padding:14px 16px;border-radius:0 4px 4px 0;line-height:1.7;font-size:0.9rem;color:#374151">${message.replace(/\n/g, '<br>')}</div>
            </div>
          </div>

          <p style="color:#4b5563;line-height:1.7;margin:0 0 28px;font-size:0.92rem">
            In the meantime, feel free to browse our portfolio at
            <a href="https://zencode.co.za" style="color:#254E58;font-weight:600">zencode.co.za</a>
            to see examples of our work.
          </p>

          <div style="background:#112D32;border-radius:6px;padding:20px 24px;text-align:center">
            <p style="color:rgba(232,228,223,0.7);font-size:0.82rem;margin:0">Questions? Reply to this email or contact us at</p>
            <a href="mailto:info@zencode.co.za" style="color:#88BDBC;font-weight:600;font-size:0.9rem">info@zencode.co.za</a>
          </div>

          <p style="font-size:0.75rem;color:#d1d5db;margin:20px 0 0;text-align:center">
            © ${new Date().getFullYear()} ZenCode Web Solutions · South Africa
          </p>
        </div>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
