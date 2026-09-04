export function renderNotFoundPage() {
  return `
    <section class="section notfound-section">
      <div class="container notfound-container">
        <div class="notfound-card reveal-on-scroll fade-in-up is-visible">
          
          <div class="notfound-badge">
            <i class="fa-solid fa-triangle-exclamation"></i> 404-es hiba
          </div>

          <div class="notfound-glitch-wrap">
            <span class="notfound-code">404</span>
            <div class="notfound-leaf-icon">
              <i class="fa-solid fa-seedling"></i>
            </div>
          </div>

          <h1 class="notfound-title">A keresett oldal nem található</h1>
          <p class="notfound-desc">
            Úgy tűnik, hogy a megadott hivatkozás hibás, időközben áthelyeztük az oldalt, vagy a tartalom már nem érhető el.
          </p>

          <!-- Primary Actions -->
          <div class="notfound-actions">
            <button class="btn btn-primary" data-page="home">
              <i class="fa-solid fa-house"></i> Vissza a főoldalra
            </button>
            <button class="btn btn-outline" data-page="home" data-section="kapcsolat">
              <i class="fa-solid fa-envelope"></i> Kapcsolatfelvétel
            </button>
          </div>

          <!-- Helpful Quick Links -->
          <div class="notfound-quicklinks">
            <h4>Hasznos hivatkozások:</h4>
            <div class="notfound-links-grid">
              <a href="#" data-page="home" data-section="szolgaltatasok" class="notfound-link-item">
                <i class="fa-solid fa-wheat-awn"></i>
                <span>Szolgáltatásaink</span>
              </a>
              <a href="#" data-page="home" data-section="rolunk" class="notfound-link-item">
                <i class="fa-solid fa-users"></i>
                <span>Rólunk</span>
              </a>
              <a href="#" data-page="blog" class="notfound-link-item">
                <i class="fa-solid fa-newspaper"></i>
                <span>Hírek &amp; Blog</span>
              </a>
              <a href="#" data-page="privacy" class="notfound-link-item">
                <i class="fa-solid fa-shield-halved"></i>
                <span>Adatkezelés</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  `;
}
