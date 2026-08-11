export function renderServicesPage() {
  return `
    <div class="container" style="padding-top: 4rem; padding-bottom: 5rem;">
      <div class="section-title">
        <span class="subtitle">Demo-Trade Kft.</span>
        <h2>Szolgáltatások</h2>
        <p>Akkreditált szaktanácsadási központunk az alábbi területeken áll a gazdálkodók rendelkezésére:</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
        <div class="service-card">
          <div class="service-icon-wrapper"><i class="fa-solid fa-wheat-awn"></i></div>
          <h3>Mezőgazdasági szaktanácsadás</h3>
          <p>Technológiai és gazdálkodási szaktanácsadás, gazdálkodási napló vezetés, támogatások igénylése.</p>
        </div>

        <div class="service-card">
          <div class="service-icon-wrapper"><i class="fa-solid fa-bug-slash"></i></div>
          <h3>Növényvédelmi tanácsadás</h3>
          <p>Integrált növényvédelem, receptírás, növényegészségügyi vizsgálatok és szakmai javaslatok készítése.</p>
        </div>

        <div class="service-card">
          <div class="service-icon-wrapper"><i class="fa-solid fa-hand-holding-dollar"></i></div>
          <h3>Mezőgazdasági jellegű pályázatok</h3>
          <p>Vidékfejlesztési és fejlesztési pályázatok teljes körű elkészítése és projektmenedzsmentje.</p>
        </div>

        <div class="service-card">
          <div class="service-icon-wrapper"><i class="fa-solid fa-spray-can"></i></div>
          <h3>Permetezőgépek műszaki felülvizsgálata</h3>
          <p>A 3 évnél idősebb növényvédelmi gépek kötelező időszaki műszaki felülvizsgálata és mérése.</p>
        </div>
      </div>
    </div>
  `;
}
