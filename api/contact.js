// Vercel serverless function for handling contact form submissions with Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, company, email, phone, product, destination, message } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Email to company
    const companyEmailData = {
      from: 'noreply@chittampalliexports.com',
      to: 'info@chittampalliexports.com',
      subject: `New Enquiry from ${name} - ${product || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f6f1;">
          <div style="background: #1e4535; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-family: Georgia, serif;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Chittampalli Exports Private Limited</p>
          </div>
          
          <div style="background: white; padding: 30px; border-left: 4px solid #b8600e;">
            <h3 style="color: #1e4535; margin-top: 0;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1e4535; width: 150px;">Name:</td>
                <td style="padding: 8px 0;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1e4535;">Email:</td>
                <td style="padding: 8px 0;">${email}</td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1e4535;">Company:</td>
                <td style="padding: 8px 0;">${company}</td>
              </tr>
              ` : ''}
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1e4535;">Phone:</td>
                <td style="padding: 8px 0;">${phone}</td>
              </tr>
              ` : ''}
              ${product ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1e4535;">Product Interest:</td>
                <td style="padding: 8px 0;">${product}</td>
              </tr>
              ` : ''}
              ${destination ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #1e4535;">Destination:</td>
                <td style="padding: 8px 0;">${destination}</td>
              </tr>
              ` : ''}
            </table>
            
            ${message ? `
            <h3 style="color: #1e4535; margin-top: 25px;">Message:</h3>
            <div style="background: #f8f6f1; padding: 15px; border-radius: 5px; border-left: 3px solid #b8600e;">
              ${message.replace(/\n/g, '<br>')}
            </div>
            ` : ''}
            
            <div style="margin-top: 25px; padding: 15px; background: #fdf2e8; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px; color: #b8600e;"><strong>Action Required:</strong> Please respond to this enquiry within 1-2 business days as promised on the website.</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #7a7a7a; font-size: 12px;">
            <p>This message was sent from the contact form on chittampalliexports.com</p>
          </div>
        </div>
      `
    };

    // Acknowledgment email to customer
    const customerEmailData = {
      from: 'info@chittampalliexports.com',
      to: email,
      subject: 'Your enquiry received - Chittampalli Exports',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8f6f1;">
          <div style="background: #1e4535; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-family: Georgia, serif;">Thank you for your enquiry</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">Chittampalli Exports Private Limited</p>
          </div>
          
          <div style="background: white; padding: 30px; border-left: 4px solid #b8600e;">
            <p style="font-size: 16px; color: #1e4535; margin-top: 0;">Dear ${name},</p>
            
            <p style="line-height: 1.6; color: #3a3a3a;">Thank you for your interest in <strong>Chittampalli Exports Private Limited</strong>. We have received your enquiry and our team will review your requirements carefully.</p>
            
            <div style="background: #fdf2e8; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 0; color: #b8600e; font-weight: bold;">⏰ Response Timeline: 1-2 business days</p>
            </div>
            
            <p style="line-height: 1.6; color: #3a3a3a;">Our export specialists will contact you with:</p>
            <ul style="color: #3a3a3a; line-height: 1.6;">
              <li>Product availability and specifications</li>
              <li>Pricing and payment terms</li>
              <li>Shipping options and documentation</li>
              <li>Samples (if requested)</li>
            </ul>
            
            <p style="line-height: 1.6; color: #3a3a3a;">In the meantime, feel free to explore our certifications and learn more about our quality standards on our website.</p>
            
            <div style="margin: 25px 0; padding: 20px; background: #1e4535; text-align: center; border-radius: 5px;">
              <p style="color: white; margin: 0; font-style: italic;">"India's finest farm harvests, delivered globally"</p>
            </div>
          </div>
          
          <div style="background: #f0ece4; padding: 20px; text-align: center;">
            <h4 style="color: #1e4535; margin-top: 0;">Contact Information</h4>
            <p style="margin: 5px 0; color: #3a3a3a;"><strong>Email:</strong> info@chittampalliexports.com</p>
            <p style="margin: 5px 0; color: #3a3a3a;"><strong>Phone/WhatsApp:</strong> +91-6301419503</p>
            <p style="margin: 5px 0; color: #3a3a3a;"><strong>Address:</strong> 8-1-605/3, Mahalaxmi Nagar, Karimnagar, Telangana - 505001</p>
          </div>
          
          <div style="text-align: center; padding: 15px; color: #7a7a7a; font-size: 11px;">
            <p>© 2026 Chittampalli Exports Private Limited | CIN: U46305TS2026PTC213988</p>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      resend.emails.send(companyEmailData),
      resend.emails.send(customerEmailData)
    ]);

    return res.status(200).json({ 
      success: true, 
      message: 'Enquiry sent successfully! We will get back to you within 1-2 business days.' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    return res.status(500).json({ 
      error: 'Failed to send enquiry. Please try again or contact us directly.' 
    });
  }
}