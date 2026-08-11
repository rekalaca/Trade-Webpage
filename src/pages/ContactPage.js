export function renderContactSection() {
  return `
    <section class="section contact-section reveal-on-scroll fade-in-up" id="kapcsolat" style="background: #ffffff; padding: 5rem 0;">
      <div class="container">
        <div class="section-title">
          <span class="subtitle">KAPCSOLAT</span>
          <h2>LÉPJEN KAPCSOLATBA KÖZPONTUNKKAL!</h2>
          <p>Kérdése van, vagy szaktanácsadásra lenne szüksége? Töltse ki az alábbi űrlapot, vagy keresse közvetlenül vezetőségünket!</p>
        </div>

        <div class="contact-grid">
          <!-- CONTACT INFO -->
          <div class="contact-info-card" style="text-align: center; padding: 3.5rem 2.5rem; display: flex; flex-direction: column; justify-content: space-around;">

            <!-- LOGO (Glassmorphic card with lap_logo.png) -->
            <div style="display: flex; justify-content: center; margin-bottom: 2.5rem;">
              <div class="contact-glass-logo-card">
                <img src="/images/lap_logo.png" alt="Demo-Trade Kft." style="width: 100%; max-width: 380px; height: auto;" />
              </div>
            </div>

            <div class="contact-info-item" style="justify-content: center; text-align: left; margin-bottom: 2rem;">
              <div class="contact-info-icon"><i class="fa-solid fa-envelope"></i></div>
              <div class="contact-info-text">
                <h4>E-mail címünk:</h4>
                <p><a href="mailto:demotradekft@gmail.com" style="color: #5ce685; font-weight: 700; font-size: 1.05rem;">demotradekft@gmail.com</a></p>
              </div>
            </div>

            <!-- KEY CONTACT 1 -->
            <div class="contact-info-item" style="justify-content: center; text-align: left; margin-bottom: 2rem;">
              <div class="contact-info-icon"><i class="fa-solid fa-user-tie"></i></div>
              <div class="contact-info-text">
                <h4 style="font-size: 1.15rem;">Moravszki Gábor</h4>
                <p style="font-size: 0.9rem; color: var(--gray-300); margin-bottom: 0.3rem;">ügyvezető igazgató, növényorvos</p>
                <p><a href="tel:+36303462848" style="color: #5ce685; font-weight: 700; font-size: 1.05rem;">+36 30 346 2848</a></p>
              </div>
            </div>

            <!-- KEY CONTACT 2 -->
            <div class="contact-info-item" style="justify-content: center; text-align: left; margin-bottom: 2rem;">
              <div class="contact-info-icon"><i class="fa-solid fa-user-gear"></i></div>
              <div class="contact-info-text">
                <h4 style="font-size: 1.15rem;">Sápi Imre</h4>
                <p style="font-size: 0.9rem; color: var(--gray-300); margin-bottom: 0.3rem;">irodavezető, szaktanácsadó</p>
                <p><a href="tel:+36305597376" style="color: #5ce685; font-weight: 700; font-size: 1.05rem;">+36 30 559 7376</a></p>
              </div>
            </div>

            <!-- FACEBOOK LINK BUTTON -->
            <div style="margin-top: 1rem;">
              <a href="https://www.facebook.com/demotradekft" target="_blank" rel="noopener" class="facebook-link-btn" style="padding: 0.85rem 1.8rem; font-size: 1rem;">
                <i class="fa-brands fa-facebook"></i> Kövess minket Facebookon!
              </a>
            </div>
          </div>


          <!-- FORM -->
          <div class="admin-card" style="position: relative;">
            <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; text-transform: uppercase;">Üzenetküldés</h3>
            <p style="color: var(--gray-600); font-size: 0.95rem; margin-bottom: 1.5rem;">Írja meg érdeklődését és közvetlenül továbbítjuk szakértő munkatársunknak!</p>
            
            <form id="contact-form">
              <div class="form-group">
                <label for="contact-name">Név *</label>
                <input type="text" id="contact-name" class="form-control" placeholder="Az Ön teljes neve" required />
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label for="contact-email">E-mail cím *</label>
                  <input type="email" id="contact-email" class="form-control" placeholder="minta@domain.hu" required />
                </div>
                <div class="form-group">
                  <label for="contact-phone">Telefonszám</label>
                  <input type="tel" id="contact-phone" class="form-control" placeholder="36 30 123 4567" />
                </div>
              </div>

              <div class="form-group">
                <label for="contact-subject">Téma / Szolgáltatás</label>
                <select id="contact-subject" class="form-control">
                  <option value="Általános érdeklődés">Általános érdeklődés</option>
                  <option value="Mezőgazdasági szaktanácsadás">Mezőgazdasági szaktanácsadás</option>
                  <option value="Növényvédelmi tanácsadás">Növényvédelmi tanácsadás</option>
                  <option value="Mezőgazdasági jellegű pályázatok">Mezőgazdasági jellegű pályázatok</option>
                  <option value="Permetezőgépek műszaki felülvizsgálata">Permetezőgépek műszaki felülvizsgálata</option>
                </select>
              </div>

              <div class="form-group">
                <label for="contact-message">Üzenet *</label>
                <textarea id="contact-message" class="form-control" placeholder="Írja meg üzenetét részletesen..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary" id="contact-submit-btn" style="width: 100%; font-size: 1.05rem;">
                <i class="fa-solid fa-paper-plane"></i> Üzenet küldése
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- MUNKATÁRSAINK, ELÉRHETŐSÉGEINK SZEKCIÓ -->
    <section class="section team-section reveal-on-scroll fade-in-up" id="munkatarsak" style="background: #f8fafc; padding: 5rem 0; border-top: 1px solid #e2e8f0;">
      <div class="container">
        <div class="section-title">
          <span class="subtitle">CSAPATUNK</span>
          <h2>MUNKATÁRSAINK, ELÉRHETŐSÉGEINK</h2>
          <p>Keresse bizalommal területi irodáink szakképzett munkatársait az alábbi elérhetőségeken!</p>
        </div>

        <div class="offices-grid">
          <!-- NYÍREGYHÁZI IRODA -->
          <div class="office-card reveal-on-scroll slide-in-left">
            <div class="office-header">
              <div>
                <h3>NYÍREGYHÁZI IRODA</h3>
                <span class="office-tag">Központi Iroda</span>
              </div>
            </div>

            <div class="staff-list">
              <div class="staff-card">
                <div class="staff-details">
                  <h4>Moravszki Gábor</h4>
                  <p class="staff-role">ügyvezető igazgató, növényorvos</p>
                  <a href="tel:+36303462848" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 346 2848</a>
                </div>
              </div>

              <div class="staff-card">
                <div class="staff-details">
                  <h4>Sápi Imre</h4>
                  <p class="staff-role">irodavezető, szaktanácsadó</p>
                  <a href="tel:+36305597376" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 559 7376</a>
                </div>
              </div>

              <div class="staff-card">
                <div class="staff-details">
                  <h4>Benke László</h4>
                  <p class="staff-role">szaktanácsadó</p>
                  <a href="tel:+36305571656" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 557 1656</a>
                </div>
              </div>

              <div class="staff-card">
                <div class="staff-details">
                  <h4>Mitruné Tóth Krisztina</h4>
                  <p class="staff-role">pályázati szaktanácsadó</p>
                  <a href="tel:+36302754911" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 275 4911</a>
                </div>
              </div>

              <div class="staff-card">
                <div class="staff-details">
                  <h4>Ungvári Enikő</h4>
                  <p class="staff-role">szaktanácsadó</p>
                  <a href="tel:+36307867133" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 786 7133</a>
                </div>
              </div>

              <div class="staff-card">
                <div class="staff-details">
                  <h4>Nagy Piroska</h4>
                  <p class="staff-role">szaktanácsadó</p>
                  <a href="tel:+36304402705" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 440 2705</a>
                </div>
              </div>
            </div>
          </div>

          <!-- KISVÁRDAI IRODA -->
          <div class="office-card reveal-on-scroll fade-in-up">
            <div class="office-header">
              <div>
                <h3>KISVÁRDAI IRODA</h3>
                <span class="office-tag">Területi Iroda</span>
              </div>
            </div>

            <div class="staff-list">
              <div class="staff-card">
                <div class="staff-details">
                  <h4>Pokol Roland</h4>
                  <p class="staff-role">növényorvos, szaktanácsadó</p>
                  <a href="tel:+36304402725" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 440 2725</a>
                </div>
              </div>

              <div class="staff-card">
                <div class="staff-details">
                  <h4>Kosztyi Nikolett</h4>
                  <p class="staff-role">szaktanácsadó</p>
                  <a href="tel:+36303400525" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 340 0525</a>
                </div>
              </div>
            </div>
          </div>

          <!-- TARPAI IRODA -->
          <div class="office-card reveal-on-scroll slide-in-right">
            <div class="office-header">
              <div>
                <h3>TARPAI IRODA</h3>
                <span class="office-tag">Területi Iroda</span>
              </div>
            </div>

            <div class="staff-list">
              <div class="staff-card">
                <div class="staff-details">
                  <h4>Sápi Imre</h4>
                  <p class="staff-role">szaktanácsadó</p>
                  <a href="tel:+36305597376" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 559 7376</a>
                </div>
              </div>

              <div class="staff-card">
                <div class="staff-details">
                  <h4>Benke László</h4>
                  <p class="staff-role">szaktanácsadó</p>
                  <a href="tel:+36305571656" class="staff-phone"><i class="fa-solid fa-phone"></i> +36 30 557 1656</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderContactPage() {
  return renderContactSection();
}
