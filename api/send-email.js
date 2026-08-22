import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, phone, subject, message, honeypot, privacyConsent } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Kérjük töltse ki a kötelező mezőket!' });
  }

  // Spam Bot Honeypot Trap check
  if (honeypot) {
    console.warn('Bot submission blocked via Honeypot trap.');
    return res.status(200).json({ success: true, message: 'Köszönjük! Üzenetét sikeresen továbbítottuk e-mailben.' });
  }

  // GDPR Privacy consent check
  if (privacyConsent === false) {
    return res.status(400).json({ success: false, message: 'Kérjük fogadja el az Adatkezelési tájékoztatót!' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || 'demotradekft@gmail.com',
        pass: process.env.SMTP_PASS || 'cjjxniblpeyetuvm'
      }
    });

    const mailOptions = {
      from: `"Demo-Trade Weboldal" <demotradekft@gmail.com>`,
      to: 'demotradekft@gmail.com',
      replyTo: `"${name}" <${email}>`,
      subject: `[Demo-Trade Kapcsolat] - ${subject || 'Új érdeklődés'}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; color: #1e293b; max-width: 650px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #0f172a, #2d7d46); padding: 20px; border-radius: 8px; color: #ffffff; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 22px; color: #ffffff;">Új üzenet érkezett a Demo-Trade weboldalról!</h2>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Küldő neve:</td>
              <td style="padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">E-mail cím:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2d7d46; font-weight: bold;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Telefonszám:</td>
              <td style="padding: 8px 0;">${phone || 'Nincs megadva'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Téma / Szolgáltatás:</td>
              <td style="padding: 8px 0; color: #f27922; font-weight: bold;">${subject || 'Általános érdeklődés'}</td>
            </tr>
          </table>

          <div style="padding: 18px; background-color: #f8fafc; border-left: 4px solid #2d7d46; border-radius: 6px; margin-bottom: 20px;">
            <h4 style="margin-top: 0; color: #0f172a;">Üzenet tartalma:</h4>
            <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; margin-bottom: 0;">${message}</p>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b; text-align: center;">Demo-Trade Kft. - Automatikus Értesítő Rendszer</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Köszönjük! Üzenetét sikeresen továbbítottuk e-mailben.' });
  } catch (err) {
    console.error('SMTP Email Error:', err);
    return res.status(500).json({ success: false, message: 'Hiba történt a levél küldésekor: ' + err.message });
  }
}
