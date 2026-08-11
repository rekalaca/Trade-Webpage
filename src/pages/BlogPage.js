export function renderBlogPage(posts, activePostId, searchTerm = '', selectedCategory = 'all', currentPage = 1) {
  // If an active article is selected, render Single Article view
  if (activePostId) {
    const post = posts.find(p => p.id === activePostId);
    if (post) {
      return `
        <div class="container" style="padding-top: 3rem; padding-bottom: 5rem;">
          <button class="btn btn-outline back-to-blog-btn" style="margin-bottom: 2rem;">
            <i class="fa-solid fa-arrow-left"></i> Vissza a hírekhez
          </button>

          <article class="article-header">
            <div style="margin-bottom: 1rem;">
              <span class="blog-category">${post.category}</span>
              <span style="color: var(--gray-500); font-size: 0.9rem; margin-left: 1rem;">
                <i class="fa-regular fa-calendar"></i> ${post.date} &bull; <i class="fa-regular fa-user"></i> ${post.author}
              </span>
            </div>
            <h1>${post.title}</h1>
          </article>

          <img src="${post.image}" alt="${post.title}" class="article-cover" />

          <div class="article-content">
            ${post.content}
          </div>

          <!-- SHARE BUTTONS -->
          <div style="max-width: 840px; margin: 3rem auto 0; padding-top: 2rem; border-top: 1px solid var(--gray-200); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div style="font-weight: 700; color: var(--gray-700);">Cikk megosztása:</div>
            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
              <button class="btn-outline share-btn-fb" data-title="${encodeURIComponent(post.title)}" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fa-brands fa-facebook" style="color: #1877f2;"></i> Facebook
              </button>
              <button class="btn-outline share-btn-in" data-title="${encodeURIComponent(post.title)}" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fa-brands fa-linkedin" style="color: #0a66c2;"></i> LinkedIn
              </button>
              <button class="btn-outline share-btn-copy" style="padding: 0.5rem 1rem; font-size: 0.9rem;">
                <i class="fa-solid fa-link"></i> Link másolása
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }

  // Filter posts by category & search term
  let filteredPosts = posts;
  if (selectedCategory !== 'all') {
    filteredPosts = filteredPosts.filter(p => p.category === selectedCategory);
  }
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredPosts = filteredPosts.filter(p => 
      p.title.toLowerCase().includes(term) || 
      p.excerpt.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term)
    );
  }

  const postsPerPage = 9;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (validPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  const categories = ['all', ...new Set(posts.map(p => p.category))];

  return `
    <div class="container" style="padding-top: 4rem; padding-bottom: 5rem;">
      <div class="section-title">
        <span class="subtitle">Hírek & Cikkek</span>
        <h2>Agrár Szakmai Blog</h2>
        <p>Friss hírek, vidékfejlesztési támogatások és növényvédelmi előrejelzések egy helyen. <span style="display: block; margin-top: 0.4rem; font-size: 0.95rem; color: var(--primary); font-weight: 700;">[Összesen ${filteredPosts.length} bejegyzés]</span></p>
      </div>

      <!-- FILTER BAR -->
      <div class="filter-bar">
        <div class="search-input-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input type="text" id="blog-search" placeholder="Keresés hírekben, kifejezésekben..." value="${searchTerm}" />
        </div>

        <div class="category-pills">
          ${categories.map(cat => `
            <button class="pill-btn ${selectedCategory === cat ? 'active' : ''}" data-category="${cat}">
              ${cat === 'all' ? 'Összes' : cat}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- POSTS GRID -->
      ${paginatedPosts.length === 0 ? `
        <div style="text-align: center; padding: 4rem 0; color: var(--gray-500);">
          <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <h3>Nincs a keresésnek megfelelő bejegyzés</h3>
          <p>Próbáljon meg más keresőszót vagy kategóriát választani!</p>
        </div>
      ` : `
        <div class="blog-grid">
          ${paginatedPosts.map(post => `
            <div class="blog-card">
              <img src="${post.image}" alt="${post.title}" class="blog-card-img" />
              <div class="blog-card-body">
                <div class="blog-meta">
                  <span class="blog-category">${post.category}</span>
                  <span><i class="fa-regular fa-calendar"></i> ${post.date}</span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">${post.excerpt}</p>
                <div class="blog-card-footer">
                  <span><i class="fa-regular fa-user"></i> ${post.author}</span>
                  <button class="btn-outline view-post-btn" data-id="${post.id}" style="padding: 0.4rem 0.8rem; font-size: 0.85rem;">
                    Elolvasom <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- PAGINATION CONTROLS -->
        ${totalPages > 1 ? `
          <div style="display: flex; justify-content: center; align-items: center; gap: 0.8rem; margin-top: 3.5rem; flex-wrap: wrap;">
            <button class="blog-page-btn" data-page-num="${validPage - 1}" ${validPage === 1 ? 'disabled style="opacity:0.4; cursor:not-allowed; border:none; background:none; font-weight:700; padding:0.5rem 1rem;"' : 'style="border:none; background:none; font-weight:700; color:var(--primary); cursor:pointer; padding:0.5rem 1rem;"'}>
              <i class="fa-solid fa-chevron-left"></i> Előző
            </button>
            ${Array.from({ length: totalPages }, (_, i) => i + 1).map(p => `
              <button class="btn-outline blog-page-btn ${p === validPage ? 'active' : ''}" data-page-num="${p}" style="width: 40px; height: 40px; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; ${p === validPage ? 'background: var(--primary); color: #fff; border-color: var(--primary);' : ''}">
                ${p}
              </button>
            `).join('')}
            <button class="blog-page-btn" data-page-num="${validPage + 1}" ${validPage === totalPages ? 'disabled style="opacity:0.4; cursor:not-allowed; border:none; background:none; font-weight:700; padding:0.5rem 1rem;"' : 'style="border:none; background:none; font-weight:700; color:var(--primary); cursor:pointer; padding:0.5rem 1rem;"'}>
              Következő <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        ` : ''}
      `}
    </div>
  `;
}
