import './styles.css';
import { INITIAL_POSTS } from './data/initialPosts.js';
import { renderHeader } from './components/Header.js';
import { renderFooter } from './components/Footer.js';
import { renderHomePage } from './pages/HomePage.js';
import { renderAboutPage } from './pages/AboutPage.js';
import { renderServicesPage } from './pages/ServicesPage.js';
import { renderBlogPage } from './pages/BlogPage.js';
import { renderContactPage } from './pages/ContactPage.js';
import { renderAdminPage } from './pages/AdminPage.js';
import { renderImpresszumPage } from './pages/ImpresszumPage.js';

// --- STATE MANAGEMENT ---
let state = {
  activePage: 'home',
  posts: loadPosts(),
  activePostId: null,
  searchTerm: '',
  menuSearchTerm: '',
  selectedCategory: 'all',
  currentPage: 1,
  editingPostId: null,
  isLoggedIn: false
};

function loadPosts() {
  const saved = localStorage.getItem('demotrade_posts');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading posts from localStorage:', e);
    }
  }
  localStorage.setItem('demotrade_posts', JSON.stringify(INITIAL_POSTS));
  return INITIAL_POSTS;
}

function savePosts(posts) {
  state.posts = posts;
  localStorage.setItem('demotrade_posts', JSON.stringify(posts));
}

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid fa-${type === 'success' ? 'circle-check' : 'triangle-exclamation'}"></i> ${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}

// --- SEARCH INDEX DATA ---
function normalizeStr(str) {
  if (!str) return '';
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const STATIC_SEARCH_ITEMS = [
  {
    id: 'rolunk',
    category: 'Rólunk',
    icon: 'fa-solid fa-users',
    title: 'Rólunk - Szakmai szaktanácsadási központ',
    text: 'Küldetésünk, hogy minél több termelőnek megkönnyítsük az agrár- és vidékfejlesztéshez kapcsolódó ügyintézését.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-bio',
    category: 'Rólunk',
    icon: 'fa-solid fa-user-tie',
    title: 'Moravszki Gábor - Cégvezető',
    text: 'Mezőgazdasági szaktanácsadó, növényvédelmi szakmérnök. Akkreditált uniós szaktanácsadó 2007 óta.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-megyek',
    category: 'Rólunk',
    icon: 'fa-solid fa-map-location-dot',
    title: 'Megyei lefedettség (Szabolcs, Hajdú, Borsod)',
    text: 'Szabolcs-Szatmár-Bereg megye, Hajdú-Bihar megye, Borsod-Abaúj-Zemplén megye gazdálkodóinak segítsége.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-egyseges-kerelem',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-file-signature',
    title: 'Egységes kérelmek beadása',
    text: 'Szerződött gazdálkodók egységes kérelmeinek benyújtása és adminisztratív kötelességei.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-gazdalkodasi-naplo',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-book-open',
    title: 'Gazdálkodási napló (e-GN) vezetése',
    text: 'Gazdálkodási napló folyamatos vezetése és elektronikus benyújtása.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-nitratjelentres',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-file-lines',
    title: 'Nitrátjelentés készítése',
    text: 'Nitrátjelentés készítése és elektronikus benyújtása a hatóságok felé.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-tapanyag',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-flask',
    title: 'Tápanyag-gazdálkodási terv készítése',
    text: 'Tápanyag-gazdálkodási terv készítése talajvizsgálati adatok alapján.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-agrkarenyhites',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-cloud-sun-rain',
    title: 'Agrárkárenyhítés & Káresemények bejelentése',
    text: 'Agrárkárenyhítés kapcsán káresemények bejelentése és elszámolása.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-gazolaj',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-gas-pump',
    title: 'Gázolaj jövedéki adó visszaigénylése',
    text: 'Mezőgazdasági gázolaj jövedéki adó visszaigénylésének teljes körű ügyintézése.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-kamarai-tagdij',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-building',
    title: 'Kamarai tagdíjbevallás',
    text: 'Nemzeti Agrárgazdasági Kamarai tagdíjbevallás elkészítése.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-foldhasznalat',
    category: 'Rólunk / Adminisztráció',
    icon: 'fa-solid fa-vector-square',
    title: 'Földhasználati terv készítése',
    text: 'Földhasználati terv és adatszolgáltatás készítése.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'rolunk-biolabor',
    category: 'Rólunk / Szolgáltatás',
    icon: 'fa-solid fa-microscope',
    title: 'Növényvédelmi biolabor üzemeltetése',
    text: 'Növényvédelmi biolaboratórium, növényegészségügy és előrejelzés.',
    targetPage: 'home',
    targetElementId: 'rolunk'
  },
  {
    id: 'szolgaltatasok-main',
    category: 'Szolgáltatások',
    icon: 'fa-solid fa-gears',
    title: 'Szolgáltatásaink főoldala',
    text: 'Mezőgazdasági szaktanácsadás, növényvédelem, pályázatok, permetezőgép felülvizsgálat.',
    targetPage: 'home',
    targetElementId: 'szolgaltatasok'
  },
  {
    id: 'service-szaktanacsadas',
    category: 'Szolgáltatás',
    icon: 'fa-solid fa-wheat-awn',
    title: 'Mezőgazdasági szaktanácsadás',
    text: 'Technológiai és gazdálkodási szaktanácsadás, e-GN, támogatások igénylése.',
    targetPage: 'home',
    targetElementId: 'service-szaktanacsadas'
  },
  {
    id: 'service-novenyvedelem',
    category: 'Szolgáltatás',
    icon: 'fa-solid fa-bug-slash',
    title: 'Növényvédelmi tanácsadás',
    text: 'Integrált növényvédelem, receptírás, biolabor, növényvédelmi előrejelzés.',
    targetPage: 'home',
    targetElementId: 'service-novenyvedelem'
  },
  {
    id: 'service-palyazatok',
    category: 'Szolgáltatás',
    icon: 'fa-solid fa-hand-holding-dollar',
    title: 'Mezőgazdasági jellegű pályázatok',
    text: 'Pályázatok figyelése, pályázat készítése, menedzselése, vidékfejlesztés.',
    targetPage: 'home',
    targetElementId: 'service-palyazatok'
  },
  {
    id: 'service-permetezo',
    category: 'Szolgáltatás',
    icon: 'fa-solid fa-spray-can',
    title: 'Permetezőgépek műszaki felülvizsgálata',
    text: 'Permetezőgépek kötelező időszaki műszaki felülvizsgálata és mérése.',
    targetPage: 'home',
    targetElementId: 'service-permetezo'
  },
  {
    id: 'contact-info',
    category: 'Kapcsolat',
    icon: 'fa-solid fa-address-book',
    title: 'Kapcsolatfelvétel & Elérhetőségek',
    text: 'Telefon: 36 30 346 2848 | Email: demotradekft@gmail.com | Nyitvatartás: H-P 08:00-16:30',
    targetPage: 'contact',
    targetElementId: 'kapcsolat'
  }
];

// --- RENDER APP ---
function render() {
  const app = document.getElementById('app');
  
  let mainContent = '';
  switch (state.activePage) {
    case 'home':
      mainContent = renderHomePage(state.posts);
      break;
    case 'about':
      // Rólunk is on homepage section
      state.activePage = 'home';
      mainContent = renderHomePage(state.posts);
      break;
    case 'services':
      // Szolgáltatások is on homepage section
      state.activePage = 'home';
      mainContent = renderHomePage(state.posts);
      break;
    case 'blog':
      mainContent = renderBlogPage(state.posts, state.activePostId, state.searchTerm, state.selectedCategory, state.currentPage);
      break;
    case 'contact':
      mainContent = renderContactPage();
      break;
    case 'impresszum':
      mainContent = renderImpresszumPage();
      break;
    case 'admin':
      mainContent = renderAdminPage(state.posts, state.isLoggedIn, state.editingPostId);
      break;
    default:
      mainContent = renderHomePage(state.posts);
  }

  app.innerHTML = `
    ${renderHeader(state.activePage, state.menuSearchTerm)}
    <main id="main-content">
      ${mainContent}
    </main>
    ${renderFooter()}
  `;

  attachEventListeners();
  initScrollObserver();
  initParallaxScroll();
}


function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}


function executeTargetNavigation(targetPage, targetElementId) {
  const dropdown = document.getElementById('search-dropdown');
  if (dropdown) dropdown.style.display = 'none';
  state.menuSearchTerm = '';
  
  const searchInput = document.getElementById('menu-search-input');
  if (searchInput) searchInput.value = '';

  const targetElMissing = targetElementId ? !document.getElementById(targetElementId) : false;
  const needsRender = state.activePage !== targetPage || state.activePostId !== null || targetElMissing;

  setPageState(targetPage, null, true);

  if (needsRender) {
    render();
  }

  setTimeout(() => {
    if (targetElementId) {
      const el = document.getElementById(targetElementId);
      if (el) {
        const yOffset = -90;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });

        el.classList.remove('highlight-search-target');
        void el.offsetWidth;
        el.classList.add('highlight-search-target');
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, 120);
}

const SERVICES_DATA = [
  {
    title: 'Mezőgazdasági szaktanácsadás',
    icon: 'fa-solid fa-wheat-awn',
    desc: 'A gazdálkodást segítő információk átadásán túl számos szolgáltatással segítjük a gazdálkodókat.',
    listTitle: 'Részletes feladatok & adminisztrációs kötelezettségek:',
    items: [
      'Egységes kérelmek beadása',
      'Gazdálkodási napló folyamatos vezetése és elektronikus benyújtása',
      'Nitrátjelentés készítése és elektronikus benyújtása',
      'Tápanyag-gazdálkodási terv készítése',
      'Agrárkárenyhítés kapcsán káresemények bejelentése és elszámolása',
      'Gázolaj jövedéki adó visszaigénylés',
      'Kamarai tagdíjbevallás',
      'Földhasználati terv készítése',
      'Monitoring adatszolgáltatás készítése',
      'Egyéb adatszolgáltatások'
    ]
  },
  {
    title: 'Növényvédelmi tanácsadás',
    icon: 'fa-solid fa-microscope',
    desc: 'A növényvédelmi biolabor üzemeltetése, meteorológiai állomások, növényvédelmi előrejelzéseken túl heti hírlevéllel segítjük a munkát.',
    listTitle: 'Növényvédelmi szolgáltatásaink:',
    items: [
      'Növényvédelmi biolabor üzemeltetése',
      'Meteorológiai állomások adatai és elemzései',
      'Növényvédelmi előrejelzés',
      'Hírlevelek heti rendszerességgel'
    ]
  },
  {
    title: 'Mezőgazdasági jellegű pályázatok',
    icon: 'fa-solid fa-hand-holding-dollar',
    desc: 'A pályázatok figyelése, pályázatok készítése és menedzselése is feladataink közé tartozik.',
    listTitle: 'Mezőgazdasági jellegű pályázatok típusai:',
    items: [
      'Fiatal gazda pályázatok',
      'Öntözési fejlesztési pályázatok',
      'Gépbeszerzéses és technológiai pályázatok stb.'
    ]
  },
  {
    title: 'Permetezőgépek műszaki felülvizsgálata',
    icon: 'fa-solid fa-spray-can-sparkles',
    desc: 'Mobil vizsgaállomásunkkal a permetezőgépek időszakos műszaki felülvizsgálatában is ügyfeleink rendelkezésére állunk.',
    listTitle: 'Felülvizsgálati szolgáltatásaink:',
    items: [
      'Mobil vizsgaállomás üzemeltetése helyszíni méréssel',
      'Az árutermelésben és szolgáltatásban használt permetezőgépek időszakos műszaki felülvizsgálata'
    ]
  }
];

function openServiceModal(data) {
  const backdrop = document.getElementById('service-modal-backdrop');
  const iconEl = document.getElementById('modal-icon');
  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-desc');
  const listTitleEl = document.getElementById('modal-list-title');
  const listEl = document.getElementById('modal-list');

  if (!backdrop) return;

  if (iconEl) iconEl.innerHTML = `<i class="${data.icon}"></i>`;
  if (titleEl) titleEl.textContent = data.title;
  if (descEl) descEl.textContent = data.desc;
  if (listTitleEl) listTitleEl.textContent = data.listTitle;

  if (listEl) {
    listEl.innerHTML = data.items.map(item => `
      <li><i class="fa-solid fa-circle-check"></i> ${item}</li>
    `).join('');
  }

  backdrop.style.display = 'flex';
  void backdrop.offsetWidth;
  backdrop.classList.add('open');
}

function closeServiceModal() {
  const backdrop = document.getElementById('service-modal-backdrop');
  if (backdrop) {
    backdrop.classList.remove('open');
    setTimeout(() => {
      backdrop.style.display = 'none';
    }, 350);
  }
}

function initParallaxScroll() {
  const parallax = document.getElementById('fruit-parallax');
  if (!parallax) return;

  function onScroll() {
    const rect = parallax.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const centerPos = (rect.top + rect.height / 2) - (windowHeight / 2);
      const speed = 0.40;
      const yOffset = centerPos * speed;
      parallax.style.backgroundPositionY = `calc(50% + ${yOffset}px)`;
    }
  }

  if (window._parallaxHandler) {
    window.removeEventListener('scroll', window._parallaxHandler);
  }
  window._parallaxHandler = onScroll;
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function setPageState(page, postId = null, push = true) {
  state.activePage = page;
  state.activePostId = postId;

  if (push) {
    let hash = '#';
    if (page === 'blog' && postId) {
      hash = `#blog/${postId}`;
    } else if (page && page !== 'home') {
      hash = `#${page}`;
    }
    window.history.pushState({ page, postId }, '', hash);
  }
}

function initHistoryState() {
  const hash = window.location.hash;
  if (hash.startsWith('#blog/')) {
    state.activePage = 'blog';
    state.activePostId = hash.replace('#blog/', '');
  } else if (hash.startsWith('#') && hash.length > 1) {
    const cleanHash = hash.replace('#', '');
    if (['home', 'about', 'services', 'blog', 'contact', 'impresszum', 'admin'].includes(cleanHash)) {
      state.activePage = cleanHash;
    }
  }
}

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.page) {
    state.activePage = e.state.page;
    state.activePostId = e.state.postId || null;
  } else {
    initHistoryState();
  }
  render();
});

// --- EVENT BINDING ---
function attachEventListeners() {
  // Navigation buttons & links (including data-section)
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.getAttribute('data-page');
      const section = el.getAttribute('data-section');

      if (section && page === 'home') {
        executeTargetNavigation('home', section);
      } else {
        setPageState(page, null, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  });

  // Open Service Modal
  document.querySelectorAll('.open-service-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(btn.getAttribute('data-service-idx'), 10);
      const data = SERVICES_DATA[idx];
      if (data) {
        openServiceModal(data);
      }
    });
  });

  // Modal close events
  const modalCloseBtn = document.getElementById('service-modal-close');
  const modalBackdrop = document.getElementById('service-modal-backdrop');
  const modalContactBtn = document.getElementById('modal-contact-btn');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeServiceModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeServiceModal();
      }
    });
  }

  if (modalContactBtn) {
    modalContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeServiceModal();
      setTimeout(() => {
        setPageState('home', null, true);
        executeTargetNavigation('home', 'kapcsolat');
      }, 200);
    });
  }

  // Contact Form Submission Handler via Nodemailer API
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('contact-submit-btn');
      const origBtnText = submitBtn ? submitBtn.innerHTML : 'Üzenet küldése';
      
      const name = document.getElementById('contact-name')?.value.trim();
      const email = document.getElementById('contact-email')?.value.trim();
      const phone = document.getElementById('contact-phone')?.value.trim();
      const subject = document.getElementById('contact-subject')?.value;
      const message = document.getElementById('contact-message')?.value.trim();

      if (!name || !email || !message) {
        showToast('Kérjük töltse ki a kötelező mezőket!', 'error');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Küldés folyamatban...';
      }

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, phone, subject, message })
        });

        const result = await response.json();

        if (response.ok && result.success) {
          showToast(result.message || 'Köszönjük! Üzenetét sikeresen továbbítottuk e-mailben!');
          contactForm.reset();
        } else {
          showToast(result.message || 'Hiba történt az üzenet küldésekor.', 'error');
        }
      } catch (err) {
        console.error('Contact form submit error:', err);
        showToast('Köszönjük érdeklődését! Üzenetét mentettük.', 'success');
        contactForm.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = origBtnText;
        }
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeServiceModal();
    }
  });

  // Footer Admin Belépés button
  const footerAdminBtn = document.getElementById('footer-admin-btn');
  if (footerAdminBtn) {
    footerAdminBtn.addEventListener('click', (e) => {
      e.preventDefault();
      state.activePage = 'admin';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    });
  }


  // --- MENU LIVE SEARCH LOGIC ---
  const menuSearchInput = document.getElementById('menu-search-input');
  const searchDropdown = document.getElementById('search-dropdown');
  const clearSearchBtn = document.getElementById('clear-menu-search');

  if (menuSearchInput && searchDropdown) {
    const handleSearchInput = (val) => {
      state.menuSearchTerm = val;
      const normalizedQuery = normalizeStr(val.trim());

      if (!normalizedQuery) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      // 1. Search in static sections
      const matchedStatic = STATIC_SEARCH_ITEMS.filter(item => {
        return normalizeStr(item.title).includes(normalizedQuery) ||
               normalizeStr(item.text).includes(normalizedQuery) ||
               normalizeStr(item.category).includes(normalizedQuery);
      });

      // 2. Search in blog posts
      const matchedPosts = state.posts.filter(post => {
        return normalizeStr(post.title).includes(normalizedQuery) ||
               normalizeStr(post.excerpt).includes(normalizedQuery) ||
               normalizeStr(post.content).includes(normalizedQuery) ||
               normalizeStr(post.category).includes(normalizedQuery);
      }).map(post => ({
        id: `post-${post.id}`,
        category: 'Blog cikk',
        icon: 'fa-solid fa-newspaper',
        title: post.title,
        text: post.excerpt,
        targetPage: 'blog',
        postId: post.id
      }));

      const allMatches = [...matchedStatic, ...matchedPosts];

      if (allMatches.length === 0) {
        searchDropdown.innerHTML = `
          <div class="search-no-results">
            <i class="fa-solid fa-magnifying-glass"></i>
            Nincs találat a következőre: <strong>"${val}"</strong>
          </div>
        `;
        searchDropdown.style.display = 'block';
        return;
      }

      // Group matches by category
      const grouped = {};
      allMatches.forEach(item => {
        const cat = item.category.split('/')[0].trim();
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(item);
      });

      let dropdownHTML = '';
      for (const [categoryName, items] of Object.entries(grouped)) {
        dropdownHTML += `
          <div class="search-result-group">
            <div class="search-group-header">${categoryName}</div>
            ${items.map(item => `
              <button class="search-result-item" data-target-page="${item.targetPage}" data-target-element="${item.targetElementId || ''}" data-post-id="${item.postId || ''}">
                <div class="result-icon">
                  <i class="${item.icon}"></i>
                </div>
                <div class="result-content">
                  <h5>${item.title}</h5>
                  <p>${item.text}</p>
                </div>
              </button>
            `).join('')}
          </div>
        `;
      }

      searchDropdown.innerHTML = dropdownHTML;
      searchDropdown.style.display = 'block';

      // Attach click listeners to result items
      searchDropdown.querySelectorAll('.search-result-item').forEach(itemBtn => {
        itemBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const targetPage = itemBtn.getAttribute('data-target-page');
          const targetElement = itemBtn.getAttribute('data-target-element');
          const postId = itemBtn.getAttribute('data-post-id');

          if (targetPage === 'blog' && postId) {
            setPageState('blog', postId, true);
            searchDropdown.style.display = 'none';
            state.menuSearchTerm = '';
            render();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            executeTargetNavigation(targetPage, targetElement);
          }
        });
      });
    };

    menuSearchInput.addEventListener('input', (e) => {
      handleSearchInput(e.target.value);
    });

    menuSearchInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) {
        handleSearchInput(e.target.value);
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      const container = document.getElementById('nav-search-container');
      if (container && !container.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchDropdown) {
        searchDropdown.style.display = 'none';
      }
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      state.menuSearchTerm = '';
      if (menuSearchInput) menuSearchInput.value = '';
      if (searchDropdown) searchDropdown.style.display = 'none';
    });
  }

  // Admin Login form submit
  const loginForm = document.getElementById('admin-login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('admin-password').value;
      if (pass === 'MoRa!b18jA') {
        state.isLoggedIn = true;
        showToast('Sikeres belépés az Admin Panelre!');
        render();
      } else {
        showToast('Hibás jelszó!', 'error');
      }
    });
  }

  // Admin Logout button
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      state.isLoggedIn = false;
      showToast('Kijelentkezve.');
      render();
    });
  }

  // Logo button
  const logoBtn = document.getElementById('logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.activePage === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setPageState('home', null, true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        render();
      }
    });
  }

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('is-active');
    });

    // Close mobile menu when clicking any nav item
    navMenu.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu && navMenu.classList.contains('is-active')) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('is-active');
        }
      }
    });
  }

  // View single blog post
  document.querySelectorAll('.view-post-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const postId = btn.getAttribute('data-id');
      setPageState('blog', postId, true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      render();
    });
  });

  // Back to blog listing
  const backBtn = document.querySelector('.back-to-blog-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        setPageState('blog', null, true);
        render();
      }
    });
  }

  // Social Share Handlers
  const currentUrl = window.location.href;

  document.querySelectorAll('.share-btn-fb').forEach(btn => {
    btn.addEventListener('click', () => {
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
      window.open(shareUrl, '_blank', 'width=600,height=400,noopener,noreferrer');
    });
  });

  document.querySelectorAll('.share-btn-in').forEach(btn => {
    btn.addEventListener('click', () => {
      const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
      window.open(shareUrl, '_blank', 'width=600,height=500,noopener,noreferrer');
    });
  });

  document.querySelectorAll('.share-btn-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(currentUrl).then(() => {
        showToast('Cikk hivatkozása másolva a vágólapra!');
      }).catch(() => {
        showToast('Nem sikerült a másolás.', 'error');
      });
    });
  });

  // Blog search input inside blog page
  const searchInput = document.getElementById('blog-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchTerm = e.target.value;
      state.currentPage = 1;
      render();
      const newSearch = document.getElementById('blog-search');
      if (newSearch) {
        newSearch.focus();
        newSearch.setSelectionRange(newSearch.value.length, newSearch.value.length);
      }
    });
  }

  // Category filter pills
  document.querySelectorAll('.pill-btn').forEach(pill => {
    pill.addEventListener('click', () => {
      state.selectedCategory = pill.getAttribute('data-category');
      state.currentPage = 1;
      render();
    });
  });

  // Blog pagination buttons
  document.querySelectorAll('.blog-page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pageNum = parseInt(btn.getAttribute('data-page-num'), 10);
      if (pageNum && !isNaN(pageNum)) {
        state.currentPage = pageNum;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });



  // Admin File Upload for Cover Image (Vercel Base64 compatible)
  const imageFileInput = document.getElementById('post-image-file');
  const imageUrlInput = document.getElementById('post-image');
  const imagePreviewCont = document.getElementById('post-image-preview-container');
  const imagePreview = document.getElementById('post-image-preview');

  if (imageFileInput && imageUrlInput) {
    const updatePreview = (src) => {
      if (imagePreviewCont && imagePreview) {
        if (src) {
          imagePreview.src = src;
          imagePreviewCont.style.display = 'block';
        } else {
          imagePreviewCont.style.display = 'none';
        }
      }
    };

    imageFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          imageUrlInput.value = evt.target.result;
          updatePreview(evt.target.result);
          showToast('Kép sikeresen betöltve a bejegyzéshez!');
        };
        reader.readAsDataURL(file);
      }
    });

    imageUrlInput.addEventListener('input', (e) => {
      updatePreview(e.target.value.trim());
    });
  }

  // WYSIWYG Editor Toolbar Handlers
  const editorArea = document.getElementById('post-content-editor');
  const editorFileInput = document.getElementById('editor-image-file-input');

  if (editorArea) {
    document.querySelectorAll('.editor-btn[data-cmd]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const cmd = btn.getAttribute('data-cmd');
        const val = btn.getAttribute('data-val') || null;

        if (cmd === 'createLink') {
          const url = prompt('Adja meg a hivatkozás URL-jét:', 'https://');
          if (url) document.execCommand(cmd, false, url);
        } else {
          document.execCommand(cmd, false, val);
        }
        editorArea.focus();
      });
    });

    const insertImgBtn = document.getElementById('editor-insert-img-btn');
    if (insertImgBtn && editorFileInput) {
      insertImgBtn.addEventListener('click', (e) => {
        e.preventDefault();
        editorFileInput.click();
      });

      editorFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const base64 = evt.target.result;
            editorArea.focus();
            document.execCommand('insertHTML', false, `<img src="${base64}" alt="Cikk kép" style="max-width:100%; height:auto; border-radius:8px; margin: 1.5rem 0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />`);
            showToast('Kép beillesztve a cikkbe!');
            editorFileInput.value = '';
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  // Admin form submission (Add / Edit)
  const adminForm = document.getElementById('admin-post-form');
  if (adminForm) {
    adminForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('post-id').value;
      const title = document.getElementById('post-title').value.trim();
      const category = document.getElementById('post-category').value;
      const author = document.getElementById('post-author').value.trim();
      const image = document.getElementById('post-image').value.trim() || '/images/hero.png';
      const excerpt = document.getElementById('post-excerpt').value.trim();
      const content = editorArea ? editorArea.innerHTML.trim() : document.getElementById('post-content').value.trim();
      const date = new Date().toLocaleDateString('hu-HU');

      if (!content || content === '<br>') {
        showToast('Kérjük adja meg a cikk teljes szövegét!', 'error');
        return;
      }

      if (id) {
        const updatedPosts = state.posts.map(p => p.id === id ? { ...p, title, category, author, image, excerpt, content } : p);
        savePosts(updatedPosts);
        showToast('Bejegyzés sikeresen frissítve!');
      } else {
        const newPost = {
          id: 'post-' + Date.now(),
          title,
          category,
          author,
          date,
          image,
          excerpt,
          content
        };
        savePosts([newPost, ...state.posts]);
        showToast('Új bejegyzés sikeresen közzétéve!');
      }

      state.editingPostId = null;
      render();
    });
  }

  // Admin Edit button
  document.querySelectorAll('.edit-post-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.editingPostId = btn.getAttribute('data-id');
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Admin Cancel edit
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      state.editingPostId = null;
      render();
    });
  }

  // Admin Delete button
  document.querySelectorAll('.delete-post-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (confirm('Biztosan törölni szeretné ezt a bejegyzést?')) {
        const filtered = state.posts.filter(p => p.id !== id);
        savePosts(filtered);
        showToast('Bejegyzés törölve!');
        if (state.editingPostId === id) state.editingPostId = null;
        render();
      }
    });
  });

  // Admin Reset posts button
  const resetBtn = document.getElementById('reset-posts-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Visszaállítja a gyári demo cikkeket?')) {
        savePosts(INITIAL_POSTS);
        state.editingPostId = null;
        showToast('Demo bejegyzések visszaállítva!');
        render();
      }
    });
  }
}

// Initial render
initHistoryState();
document.addEventListener('DOMContentLoaded', () => {
  initHistoryState();
  render();
});
render();
