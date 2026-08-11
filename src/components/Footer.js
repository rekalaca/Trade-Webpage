export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-slim-grid">
          <!-- LOGO + TAGLINE -->
          <div class="footer-brand">
            <div style="margin-bottom: 1rem;">
              <img src="/demo-trade-logo.jpg" alt="Demo-Trade Kft." style="height: 50px; width: auto; background: white; padding: 4px 8px; border-radius: 8px;" />
            </div>
            <p style="font-size: 0.9rem; line-height: 1.6;">Akkreditált Uniós Szaktanácsadási Központ. Küldetésünk, hogy minél több termelőnek megkönnyítsük az agrár- és vidékfejlesztéshez kapcsolódó ügyintézését.</p>
          </div>

          <!-- NAV LINKS -->
          <div class="footer-links">
            <h4>Navigáció</h4>
            <ul>
              <li><a href="#" data-page="home">Főoldal</a></li>
              <li><a href="#" data-page="home" data-section="rolunk">Rólunk</a></li>
              <li><a href="#" data-page="home" data-section="szolgaltatasok">Szolgáltatások</a></li>
              <li><a href="#" data-page="blog">Blog &amp; Hírek</a></li>
              <li><a href="#" data-page="home" data-section="kapcsolat">Kapcsolat</a></li>
              <li><a href="#" data-page="impresszum" style="color: var(--gray-400);">Impresszum</a></li>
            </ul>
          </div>

          <!-- CONTACT INFO -->
          <div class="footer-links">
            <h4>Elérhetőség</h4>
            <p><i class="fa-solid fa-phone" style="color:#5ce685; margin-right:0.5rem;"></i><a href="tel:+36303462848" style="color: var(--gray-300);">+36 30 346 2848</a></p>
            <p style="margin-top: 0.5rem;"><i class="fa-solid fa-envelope" style="color:#5ce685; margin-right:0.5rem;"></i><a href="mailto:demotradekft@gmail.com" style="color: var(--gray-300);">demotradekft@gmail.com</a></p>
            <p style="margin-top: 0.5rem;"><i class="fa-solid fa-location-dot" style="color:#5ce685; margin-right:0.5rem;"></i>4400 Nyíregyháza</p>
            <div style="margin-top: 1.2rem;">
              <a href="https://www.facebook.com/demotradekft" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 0.5rem; color: #5ce685; font-weight: 700; font-size: 0.9rem; text-decoration: none;">
                <i class="fa-brands fa-facebook" style="font-size: 1.1rem;"></i> Facebook oldalunk
              </a>
            </div>
          </div>
        </div>

        <div class="footer-bottom" style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 1.5rem; font-size: 0.85rem; color: var(--gray-400);">
          <p style="margin: 0;">&copy; ${new Date().getFullYear()} Demo-Trade Kft. Minden jog fenntartva.</p>
          <div>
            design by: <a href="https://www.rekalaca-webdesign.hu/" target="_blank" rel="noopener" style="color: #5ce685; text-decoration: underline; font-weight: 600;">rekalaca-webdesign</a>
          </div>
          <div style="display: flex; gap: 1.5rem; align-items: center;">
            <a href="#" data-page="impresszum" style="color: var(--gray-400); text-decoration: underline;">Impresszum</a>
            <a href="#" id="footer-admin-btn" style="color: var(--gray-400); text-decoration: underline; display: flex; align-items: center; gap: 0.4rem;">
              <i class="fa-solid fa-lock"></i> Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
