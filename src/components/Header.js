export function renderHeader(activePage, searchValue = '') {
  return `
    <div class="top-bar">
      <div class="container">
        <div class="top-bar-info">
          <a href="tel:+36303462848"><i class="fa-solid fa-phone"></i> 36 30 346 2848</a>
          <a href="mailto:demotradekft@gmail.com"><i class="fa-solid fa-envelope"></i> demotradekft@gmail.com</a>
          <span><i class="fa-solid fa-location-dot"></i> Szaktanácsadási Központ</span>
        </div>
        <div class="top-bar-badge">
          <i class="fa-solid fa-award"></i> Akkreditált Szaktanácsadó Szervezet
        </div>
      </div>
    </div>

    <nav class="navbar">
      <div class="container navbar-container">
        <a href="#" class="brand-logo" id="logo-btn">
          <img src="/images/lap_logo.png" alt="Demo-Trade Kft. Logó" class="brand-logo-img" />
        </a>

        <div class="nav-right-group">
          <ul class="nav-menu" id="nav-menu">
            <li class="nav-item">
              <button data-page="home" data-section="rolunk"><i class="fa-solid fa-users"></i> Rólunk</button>
            </li>
            <li class="nav-item">
              <button data-page="home" data-section="szolgaltatasok"><i class="fa-solid fa-gears"></i> Szolgáltatások</button>
            </li>
            <li class="nav-item ${activePage === 'blog' ? 'active' : ''}">
              <button data-page="blog"><i class="fa-solid fa-newspaper"></i> Blog & Hírek</button>
            </li>
            <li class="nav-item">
              <button data-page="home" data-section="kapcsolat"><i class="fa-solid fa-address-book"></i> Kapcsolat</button>
            </li>
          </ul>

          <!-- Live Menu Search Bar -->
          <div class="nav-search-container" id="nav-search-container">
            <div class="nav-search-input-wrapper">
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <input type="text" id="menu-search-input" placeholder="Keresés az oldalon..." autocomplete="off" value="${searchValue}" />
              ${searchValue ? '<button id="clear-menu-search" class="clear-search-btn" title="Keresés törlése"><i class="fa-solid fa-xmark"></i></button>' : ''}
            </div>
            <div class="search-dropdown" id="search-dropdown" style="display: none;"></div>
          </div>
        </div>

        <button class="mobile-toggle" id="mobile-toggle">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  `;
}

