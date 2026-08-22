export function renderPrivacyPage() {
  return `
    <section class="section" style="background: #f8fafc; padding: 5rem 0; min-height: 80vh;">
      <div class="container" style="max-width: 960px;">
        <div class="section-title" style="text-align: left; max-width: 100%; margin-bottom: 2.5rem;">
          <span class="subtitle">JOGI DOKUMENTUM</span>
          <h2>ADATKEZELÉSI TÁJÉKOZTATÓ</h2>
          <p>A Demo-Trade Kft. adatkezelési alapelvei és az érintettek jogai a GDPR (EU 2016/679) rendelettel összhangban.</p>
        </div>

        <div class="admin-card" style="padding: 2.5rem; margin-bottom: 2rem; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);">
          <!-- PDF LETÖLTÉS GOMB -->
          <div style="background: linear-gradient(135deg, #0f172a, #1e293b); color: white; padding: 1.5rem 2rem; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.2rem; margin-bottom: 2.5rem;">
            <div>
              <h4 style="color: #ffffff; margin-bottom: 0.3rem; font-size: 1.15rem; display: flex; align-items: center; gap: 0.6rem;">
                <i class="fa-solid fa-file-pdf" style="color: #ef4444; font-size: 1.4rem;"></i>
                Hivatalos Adatkezelési Tájékoztató Dokumentum
              </h4>
              <p style="color: #94a3b8; font-size: 0.9rem; margin: 0;">A teljes, cégszerűen aláírt dokumentum PDF formátumban letölthető.</p>
            </div>
            <a href="/adatkezelesi_tajekoztato.pdf" target="_blank" rel="noopener" class="btn btn-primary" style="padding: 0.75rem 1.6rem; font-size: 0.95rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
              <i class="fa-solid fa-download"></i> PDF Megnyitása / Letöltése
            </a>
          </div>

          <!-- RÖVID ÁTTEKINTŐ BLOKKOK -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 10px; border-left: 4px solid var(--primary);">
              <h5 style="color: #0f172a; margin-bottom: 0.5rem; font-size: 1.05rem;"><i class="fa-solid fa-shield-halved" style="color: var(--primary); margin-right: 0.5rem;"></i> Adatkezelő</h5>
              <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.6;">
                <strong>Demo-Trade Kft.</strong><br>
                Székhely: 4400 Nyíregyháza, Lengyel u. 15.<br>
                E-mail: demotradekft@gmail.com
              </p>
            </div>

            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #f27922;">
              <h5 style="color: #0f172a; margin-bottom: 0.5rem; font-size: 1.05rem;"><i class="fa-solid fa-envelope-open-text" style="color: #f27922; margin-right: 0.5rem;"></i> Üzenetküldés célja</h5>
              <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.6;">
                Kapcsolatfelvétel, mezőgazdasági szaktanácsadási és árajánlatkérési megkeresések közvetlen megválaszolása.
              </p>
            </div>

            <div style="background: #f8fafc; padding: 1.5rem; border-radius: 10px; border-left: 4px solid #3b82f6;">
              <h5 style="color: #0f172a; margin-bottom: 0.5rem; font-size: 1.05rem;"><i class="fa-solid fa-user-lock" style="color: #3b82f6; margin-right: 0.5rem;"></i> Érintetti jogok</h5>
              <p style="font-size: 0.9rem; color: #475569; margin: 0; line-height: 1.6;">
                Hozzáférés, helyesbítés, törlés („elfeledtetéshez való jog”), kezelés korlátozása és tiltakozás.
              </p>
            </div>
          </div>

          <!-- RÉSZLETES TARTALOM ÖSSZEFOGLALÓ -->
          <div class="privacy-content-body" style="color: #334155; line-height: 1.8; font-size: 0.95rem;">
            <h3 style="color: #0f172a; font-size: 1.3rem; margin: 2rem 0 1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">
              1. Az adatkezelő adatai és elérhetőségei
            </h3>
            <p>
              A <strong>Demo-Trade Kft.</strong> (székhely: 4400 Nyíregyháza, Lengyel u. 15., cégjegyzékszám: 15-09-074844, adószám: 14901832-2-15, e-mail: <a href="mailto:demotradekft@gmail.com" style="color: var(--primary); font-weight: 600;">demotradekft@gmail.com</a>) elkötelezett a felhasználók és ügyfelek személyes adatainak védelme iránt.
            </p>

            <h3 style="color: #0f172a; font-size: 1.3rem; margin: 2rem 0 1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">
              2. A kezelt adatok köre, célja és jogalapja
            </h3>
            <p><strong>Kapcsolatfelvételi űrlap:</strong></p>
            <ul style="padding-left: 1.5rem; margin-bottom: 1.2rem;">
              <li><strong>Kezelt adatok:</strong> Név, e-mail cím, telefonszám, választott téma/szolgáltatás, üzenet szövege.</li>
              <li><strong>Adatkezelés célja:</strong> Érdeklődésre, árajánlatkérésre vagy szaktanácsadói megkeresésre történő válaszadás.</li>
              <li><strong>Jogalap:</strong> Az érintett önkéntes hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont) és jogos érdek (kapcsolattartás).</li>
              <li><strong>Adatkezelés időtartama:</strong> A kapcsolatfelvételi ügy lezárásáig, illetve az érintett hozzájárulásának visszavonásáig vagy szerződéskötés esetén a törvényi megőrzési ideig.</li>
            </ul>

            <h3 style="color: #0f172a; font-size: 1.3rem; margin: 2rem 0 1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">
              3. Sütik (Cookie-k) kezelése
            </h3>
            <p>
              Weboldalunk a megfelelő működés és a felhasználói élmény biztosítása érdekében sütiket (cookie-kat) használ:
            </p>
            <ul style="padding-left: 1.5rem; margin-bottom: 1.2rem;">
              <li><strong>Elengedhetetlenül szükséges (technikai) sütik:</strong> Biztosítják a navigációt, a munkamenet és az adatvédelmi beállítások (pl. cookie hozzájárulás) mentését.</li>
              <li><strong>Kényelmi és statisztikai sütik:</strong> Segítenek megérteni az oldal használatát a szolgáltatások minőségének javítása érdekében.</li>
            </ul>

            <h3 style="color: #0f172a; font-size: 1.3rem; margin: 2rem 0 1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">
              4. Beágyazott PDF megtekintése
            </h3>
            <div style="margin-top: 1.5rem; border: 1px solid #cbd5e1; border-radius: 10px; overflow: hidden;">
              <iframe src="/adatkezelesi_tajekoztato.pdf" width="100%" height="600" style="border: none;" title="Adatkezelési Tájékoztató PDF">
                <p>Az Ön böngészője nem támogatja a PDF beágyazást. <a href="/adatkezelesi_tajekoztato.pdf" target="_blank" rel="noopener">Kattintson ide a PDF letöltéséhez.</a></p>
              </iframe>
            </div>

            <h3 style="color: #0f172a; font-size: 1.3rem; margin: 2.5rem 0 1rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">
              5. Jogorvoslati lehetőségek
            </h3>
            <p>
              Amennyiben úgy ítéli meg, hogy az adatkezelés megsértette a jogszabályokat, panasszal élhet a felügyeleti hatóságnál:
            </p>
            <div style="background: #f1f5f9; padding: 1.2rem 1.5rem; border-radius: 8px; font-size: 0.9rem;">
              <strong>Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)</strong><br>
              Cím: 1055 Budapest, Falk Miksa utca 9-11.<br>
              Postacím: 1363 Budapest, Pf.: 9.<br>
              Telefon: +36 (1) 391-1400 | E-mail: <a href="mailto:ugyfelszolgalat@naih.hu" style="color: var(--primary);">ugyfelszolgalat@naih.hu</a> | Honlap: <a href="https://naih.hu" target="_blank" rel="noopener" style="color: var(--primary);">www.naih.hu</a>
            </div>
          </div>

          <div style="margin-top: 3rem; text-align: center;">
            <button class="btn btn-outline" data-page="home">
              <i class="fa-solid fa-arrow-left"></i> Vissza a főoldalra
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}
