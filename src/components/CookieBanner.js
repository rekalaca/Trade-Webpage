export function renderCookieBanner() {
  const consent = localStorage.getItem('demotrade_cookie_consent');
  if (consent) return '';

  return `
    <div id="cookie-banner" class="cookie-banner-overlay" role="dialog" aria-modal="true" aria-labelledby="cookie-heading">
      <div class="cookie-banner-card">
        <div class="cookie-banner-header">
          <div class="cookie-icon-wrapper">
            <i class="fa-solid fa-cookie-bite"></i>
          </div>
          <div>
            <h4 id="cookie-heading">Cookie &amp; Adatvédelmi Beállítások</h4>
            <p>Weboldalunk a legjobb felhasználói élmény, a biztonságos működés és a forgalomelemzés érdekében sütiket (cookie-kat) használ az EU GDPR irányelveinek megfelelően.</p>
          </div>
        </div>

        <div class="cookie-banner-actions">
          <div class="cookie-links">
            <a href="#" data-page="privacy" class="cookie-info-link">
              <i class="fa-solid fa-shield-halved"></i> Adatkezelési tájékoztató
            </a>
          </div>
          <div class="cookie-btn-group">
            <button id="cookie-essential-btn" class="btn btn-cookie-secondary">
              Csak a szükségesek
            </button>
            <button id="cookie-accept-all-btn" class="btn btn-cookie-primary">
              <i class="fa-solid fa-check"></i> Összes elfogadása
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}
