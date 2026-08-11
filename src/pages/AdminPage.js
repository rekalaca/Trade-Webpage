export function renderAdminPage(posts, isLoggedIn, editingPostId = null) {
  if (!isLoggedIn) {
    return `
      <div class="container" style="padding-top: 5rem; padding-bottom: 6rem; max-width: 480px;">
        <div class="admin-card" style="text-align: center; padding: 3rem 2rem;">
          <div style="width: 70px; height: 70px; background: var(--primary-light); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 1.5rem;">
            <i class="fa-solid fa-lock"></i>
          </div>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">Admin Belépés</h2>
          <p style="color: var(--gray-600); font-size: 0.95rem; margin-bottom: 2rem;">Kérjük adja meg az adminisztrátori jelszót a szerkesztő eléréséhez!</p>

          <form id="admin-login-form">
            <div class="form-group" style="text-align: left;">
              <label for="admin-password">Jelszó</label>
              <input type="password" id="admin-password" class="form-control" placeholder="Adja meg a jelszót..." required autofocus />
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
              <i class="fa-solid fa-right-to-bracket"></i> Belépés
            </button>
          </form>
        </div>
      </div>
    `;
  }

  const editingPost = editingPostId ? posts.find(p => p.id === editingPostId) : null;

  return `
    <div class="container" style="padding-top: 3rem; padding-bottom: 5rem; max-width: 1200px;">
      <div class="admin-header" style="margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; background: var(--dark); color: #fff; padding: 1.8rem 2.2rem; border-radius: var(--radius-lg);">
        <div>
          <h1 style="color: #fff; font-size: 1.8rem; margin-bottom: 0.3rem; text-transform: uppercase; letter-spacing: 0.5px;"><i class="fa-solid fa-user-gear" style="color: #5ce685;"></i> BLOG ADMINISZTRÁCIÓS PANEL</h1>
          <p style="color: var(--gray-300); font-size: 0.95rem;">Töltsön fel új agrárhíreket, szerkessze vagy törölje a meglévő bejegyzéseket.</p>
        </div>
        <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <a href="/" target="_blank" class="btn btn-outline" style="color: white; border-color: rgba(255,255,255,0.4); text-decoration: none; display: inline-flex; align-items: center; gap: 0.4rem;" title="Weboldal megtekintése új böngészőlapon">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Weboldal Megtekintése Új Ablakban
          </a>
          <button class="btn btn-secondary" id="reset-posts-btn" title="Alapértelmezett cikkek visszaállítása">
            <i class="fa-solid fa-rotate-left"></i> Alapállapot
          </button>
          <button class="btn btn-outline" id="admin-logout-btn" style="color: white; border-color: rgba(255,255,255,0.4);">
            <i class="fa-solid fa-right-from-bracket"></i> Kijelentkezés
          </button>
        </div>
      </div>

      <!-- TOP: NEW / EDIT POST FORM (WIDE LAYOUT) -->
      <div class="admin-card" style="margin-bottom: 3rem; padding: 2.5rem;">
        <h3 style="font-size: 1.5rem; margin-bottom: 1.8rem; display: flex; align-items: center; gap: 0.6rem; border-bottom: 2px solid var(--primary-light); padding-bottom: 0.8rem;">
          <i class="fa-solid ${editingPost ? 'fa-pen-to-square' : 'fa-circle-plus'}" style="color: var(--primary);"></i>
          ${editingPost ? 'Bejegyzés Szerkesztése' : 'Új Cikk Létrehozása'}
        </h3>

        <form id="admin-post-form">
          <input type="hidden" id="post-id" value="${editingPost ? editingPost.id : ''}" />

          <div style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
            <div class="form-group" style="margin: 0;">
              <label for="post-title" style="font-weight: 700;">Cikk Címe *</label>
              <input type="text" id="post-title" class="form-control" placeholder="Pl. Növényvédelmi előrejelzés..." value="${editingPost ? editingPost.title : ''}" required />
            </div>

            <div class="form-group" style="margin: 0;">
              <label for="post-category" style="font-weight: 700;">Kategória *</label>
              <select id="post-category" class="form-control" required>
                <option value="Híreink" ${editingPost && editingPost.category === 'Híreink' ? 'selected' : ''}>Híreink</option>
                <option value="Pályázatok" ${editingPost && editingPost.category === 'Pályázatok' ? 'selected' : ''}>Pályázatok</option>
                <option value="Műszaki felülvizsgálat" ${editingPost && editingPost.category === 'Műszaki felülvizsgálat' ? 'selected' : ''}>Műszaki felülvizsgálat</option>
                <option value="Szaktanácsadás" ${editingPost && editingPost.category === 'Szaktanácsadás' ? 'selected' : ''}>Szaktanácsadás</option>
                <option value="Növényvédelem" ${editingPost && editingPost.category === 'Növényvédelem' ? 'selected' : ''}>Növényvédelem</option>
              </select>
            </div>

            <div class="form-group" style="margin: 0;">
              <label for="post-author" style="font-weight: 700;">Szerző *</label>
              <input type="text" id="post-author" class="form-control" placeholder="Mitruné Tóth Krisztina" value="${editingPost ? editingPost.author : 'Mitruné Tóth Krisztina'}" required />
            </div>
          </div>

          <!-- PROMINENT COVER IMAGE UPLOAD BOX -->
          <div style="background: var(--gray-100); border: 2px dashed var(--gray-300); border-radius: var(--radius-md); padding: 1.5rem; text-align: center; margin-bottom: 1.5rem;">
            <div style="font-weight: 700; color: var(--dark); font-size: 1.05rem; margin-bottom: 0.4rem;">
              <i class="fa-solid fa-cloud-arrow-up" style="color: var(--primary); font-size: 1.6rem; display: block; margin: 0 auto 0.4rem;"></i>
              Cikk Borítóképe (Kép feltöltése a számítógépről)
            </div>
            <p style="color: var(--gray-600); font-size: 0.88rem; margin-bottom: 1rem;">Válasszon ki egy fájlt a gépéről, vagy adja meg a kép hivatkozását!</p>
            
            <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap;">
              <input type="file" id="post-image-file" class="form-control" accept="image/*" style="max-width: 320px; background: #ffffff;" />
              <span style="color: var(--gray-500); font-weight: 700;">VAGY URL:</span>
              <input type="text" id="post-image" class="form-control" placeholder="/images/fagykar.jpg vagy https://..." value="${editingPost ? editingPost.image : '/images/fagykar.jpg'}" style="max-width: 380px; background: #ffffff;" required />
            </div>

            <div id="post-image-preview-container" style="margin-top: 1.2rem; ${editingPost && editingPost.image ? '' : 'display: none;'}">
              <span style="font-size: 0.85rem; color: var(--gray-600); display: block; margin-bottom: 0.4rem; font-weight: 600;">Borítókép előnézete:</span>
              <img id="post-image-preview" src="${editingPost ? editingPost.image : ''}" style="max-height: 140px; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 2px solid #ffffff;" />
            </div>
          </div>

          <div class="form-group">
            <label for="post-excerpt" style="font-weight: 700;">Rövid Kivonat (1-2 mondat) *</label>
            <textarea id="post-excerpt" class="form-control" style="min-height: 70px;" placeholder="Rövid ízelítő a cikk kártyájára..." required>${editingPost ? editingPost.excerpt : ''}</textarea>
          </div>

          <!-- VISUAL RICH TEXT EDITOR FOR CONTENT -->
          <div class="form-group">
            <label style="font-weight: 700; display: flex; justify-content: space-between; align-items: center;">
              <span>Teljes Cikk Szövege (Formázható Szövegszerkesztő) *</span>
              <span style="font-size: 0.8rem; font-weight: 400; color: var(--gray-500);">Kijelölve használja a formázó gombokat!</span>
            </label>

            <!-- HIDDEN FILE INPUT FOR INLINE EDITOR IMAGES -->
            <input type="file" id="editor-image-file-input" accept="image/*" style="display: none;" />

            <!-- WYSIWYG TOOLBAR -->
            <div class="editor-toolbar" style="background: var(--gray-100); border: 1px solid var(--gray-300); border-bottom: none; border-radius: var(--radius-md) var(--radius-md) 0 0; padding: 0.6rem 0.8rem; display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center;">
              <button type="button" class="editor-btn" data-cmd="bold" title="Félkövér (Ctrl+B)"><i class="fa-solid fa-bold"></i></button>
              <button type="button" class="editor-btn" data-cmd="italic" title="Dőlt (Ctrl+I)"><i class="fa-solid fa-italic"></i></button>
              <button type="button" class="editor-btn" data-cmd="underline" title="Aláhúzott (Ctrl+U)"><i class="fa-solid fa-underline"></i></button>
              <button type="button" class="editor-btn" data-cmd="strikeThrough" title="Áthúzott"><i class="fa-solid fa-strikethrough"></i></button>
              <div style="width: 1px; height: 22px; background: var(--gray-300); margin: 0 0.3rem;"></div>

              <button type="button" class="editor-btn" data-cmd="formatBlock" data-val="<h2>" title="Főcím (H2)"><i class="fa-solid fa-heading"></i> 2</button>
              <button type="button" class="editor-btn" data-cmd="formatBlock" data-val="<h3>" title="Alcím (H3)"><i class="fa-solid fa-heading"></i> 3</button>
              <button type="button" class="editor-btn" data-cmd="formatBlock" data-val="<p>" title="Normál paragrafus"><i class="fa-solid fa-paragraph"></i></button>
              <div style="width: 1px; height: 22px; background: var(--gray-300); margin: 0 0.3rem;"></div>

              <button type="button" class="editor-btn" data-cmd="insertUnorderedList" title="Felsorolás (Pontok)"><i class="fa-solid fa-list-ul"></i></button>
              <button type="button" class="editor-btn" data-cmd="insertOrderedList" title="Számozott lista"><i class="fa-solid fa-list-ol"></i></button>
              <div style="width: 1px; height: 22px; background: var(--gray-300); margin: 0 0.3rem;"></div>

              <button type="button" class="editor-btn" data-cmd="createLink" title="Link beszúrása"><i class="fa-solid fa-link"></i> Link</button>
              <button type="button" class="editor-btn" id="editor-insert-img-btn" style="background: #e6f4ea; border-color: var(--primary); color: var(--primary); font-weight: 700;" title="Kép feltöltése / beszúrása a cikkbe"><i class="fa-solid fa-image"></i> + Kép feltöltése</button>
              <button type="button" class="editor-btn" data-cmd="removeFormat" title="Formázás törlése"><i class="fa-solid fa-remove-format"></i></button>
            </div>

            <!-- EDITABLE WYSIWYG AREA -->
            <div id="post-content-editor" contenteditable="true" class="form-control" style="min-height: 280px; max-height: 550px; overflow-y: auto; background: #ffffff; border-radius: 0 0 var(--radius-md) var(--radius-md); padding: 1.2rem; line-height: 1.7;" placeholder="Írja vagy illessze ide a cikk szövegét...">
              ${editingPost ? editingPost.content : ''}
            </div>

            <!-- HIDDEN TEXTAREA FOR FORM SUBMISSION -->
            <textarea id="post-content" style="display: none;">${editingPost ? editingPost.content : ''}</textarea>
          </div>

          <div style="display: flex; gap: 1rem; margin-top: 2rem;">
            <button type="submit" class="btn btn-primary" style="padding: 0.9rem 2.2rem; font-size: 1rem;">
              <i class="fa-solid fa-floppy-disk"></i> ${editingPost ? 'Módosítások Mentése' : 'Cikk Közzététele'}
            </button>
            ${editingPost ? `
              <button type="button" class="btn btn-outline" id="cancel-edit-btn" style="padding: 0.9rem 1.8rem;">
                Mégse
              </button>
            ` : ''}
          </div>
        </form>
      </div>


      <!-- BOTTOM: TABLE OF EXISTING POSTS -->
      <div class="admin-card" style="padding: 2.2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <h3 style="font-size: 1.5rem;">
            <i class="fa-solid fa-list-check" style="color: var(--primary);"></i> Eddigi Bejegyzések (${posts.length} cikk)
          </h3>
        </div>

        <div class="admin-table-container" style="overflow-x: auto;">
          <table class="admin-table" style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background: var(--gray-100); text-align: left;">
                <th style="padding: 0.8rem; border-bottom: 2px solid var(--gray-200);">Kép</th>
                <th style="padding: 0.8rem; border-bottom: 2px solid var(--gray-200);">Cím & Kategória</th>
                <th style="padding: 0.8rem; border-bottom: 2px solid var(--gray-200);">Szerző & Dátum</th>
                <th style="padding: 0.8rem; border-bottom: 2px solid var(--gray-200); text-align: right;">Műveletek</th>
              </tr>
            </thead>
            <tbody>
              ${posts.length === 0 ? `
                <tr>
                  <td colspan="4" style="text-align: center; color: var(--gray-500); padding: 2rem;">Nincs közzétett bejegyzés.</td>
                </tr>
              ` : posts.map(post => `
                <tr style="border-bottom: 1px solid var(--gray-200);">
                  <td style="width: 70px; padding: 0.8rem;">
                    <img src="${post.image}" alt="" style="width: 54px; height: 40px; object-fit: cover; border-radius: var(--radius-sm);" />
                  </td>
                  <td style="padding: 0.8rem;">
                    <div style="font-weight: 700; color: var(--dark); font-size: 0.95rem;">${post.title}</div>
                    <span class="blog-category" style="font-size: 0.7rem; display: inline-block; margin-top: 0.2rem;">${post.category}</span>
                  </td>
                  <td style="padding: 0.8rem; font-size: 0.85rem;">
                    <div style="font-weight: 600;">${post.author}</div>
                    <div style="color: var(--gray-500);">${post.date}</div>
                  </td>
                  <td style="text-align: right; padding: 0.8rem; white-space: nowrap;">
                    <button class="action-btn action-btn-edit edit-post-btn" data-id="${post.id}" style="margin-right: 0.4rem; padding: 0.4rem 0.8rem; font-size: 0.82rem;">
                      <i class="fa-solid fa-pen"></i> Szerkesztés
                    </button>
                    <button class="action-btn action-btn-delete delete-post-btn" data-id="${post.id}" style="padding: 0.4rem 0.8rem; font-size: 0.82rem;">
                      <i class="fa-solid fa-trash"></i> Törlés
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}
