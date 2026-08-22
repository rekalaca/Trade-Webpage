import { defineConfig } from 'vite';
import nodemailer from 'nodemailer';

export default defineConfig({
  plugins: [
    {
      name: 'smtp-mail-sender-plugin',
      configureServer(server) {
        server.middlewares.use('/api/send-email', async (req, res) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk.toString(); });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);

                if (!data.name || !data.email || !data.message) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, message: 'Kérjük töltse ki a kötelező mezőket!' }));
                }

                // Spam Bot Honeypot check
                if (data.honeypot) {
                  console.warn('Bot submission blocked via Honeypot trap.');
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: true, message: 'Köszönjük! Üzenetét sikeresen továbbítottuk e-mailben.' }));
                }

                // GDPR Privacy consent check
                if (data.privacyConsent === false) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ success: false, message: 'Kérjük fogadja el az Adatkezelési tájékoztatót!' }));
                }

                // SMTP configuration from user credentials
                const transporter = nodemailer.createTransport({
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                    user: 'demotradekft@gmail.com',
                    pass: 'cjjxniblpeyetuvm'
                  }
                });

                const mailOptions = {
                  from: `"Demo-Trade Weboldal" <demotradekft@gmail.com>`,
                  to: 'demotradekft@gmail.com',
                  replyTo: `"${data.name}" <${data.email}>`,
                  subject: `[Demo-Trade Kapcsolat] - ${data.subject || 'Új érdeklődés'}`,
                  html: `
                    <div style="font-family: Arial, sans-serif; padding: 25px; color: #1e293b; max-width: 650px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                      <div style="background: linear-gradient(135deg, #0f172a, #2d7d46); padding: 20px; border-radius: 8px; color: #ffffff; margin-bottom: 20px;">
                        <h2 style="margin: 0; font-size: 22px; color: #ffffff;">Új üzenet érkezett a Demo-Trade weboldalról!</h2>
                      </div>
                      
                      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold; width: 140px;">Küldő neve:</td>
                          <td style="padding: 8px 0;">${data.name}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold;">E-mail cím:</td>
                          <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #2d7d46; font-weight: bold;">${data.email}</a></td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold;">Telefonszám:</td>
                          <td style="padding: 8px 0;">${data.phone || 'Nincs megadva'}</td>
                        </tr>
                        <tr>
                          <td style="padding: 8px 0; font-weight: bold;">Téma / Szolgáltatás:</td>
                          <td style="padding: 8px 0; color: #f27922; font-weight: bold;">${data.subject || 'Általános érdeklődés'}</td>
                        </tr>
                      </table>

                      <div style="padding: 18px; background-color: #f8fafc; border-left: 4px solid #2d7d46; border-radius: 6px; margin-bottom: 20px;">
                        <h4 style="margin-top: 0; color: #0f172a;">Üzenet tartalma:</h4>
                        <p style="white-space: pre-wrap; font-size: 15px; line-height: 1.6; margin-bottom: 0;">${data.message}</p>
                      </div>

                      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
                      <p style="font-size: 12px; color: #64748b; text-align: center;">Demo-Trade Kft. - Automatikus Értesítő Rendszer</p>
                    </div>
                  `
                };

                await transporter.sendMail(mailOptions);

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Köszönjük! Üzenetét sikeresen továbbítottuk e-mailben.' }));
              } catch (err) {
                console.error('SMTP Email Error:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Hiba történt a levél küldésekor: ' + err.message }));
              }
            });
          } else {
            res.statusCode = 405;
            res.end();
          }
        });
      }
    }
  ]
});
