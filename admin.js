/**
 * NICOLA VIANELLO — STUDIO CURATORIAL CMS ENGINE (admin.js)
 * Complete Project Editor, Visual Smart-Slicing Picker, Itten Harmony Calculator,
 * Drag-and-Drop Image Uploader & One-Click GitHub Publisher.
 */

(function () {
  'use strict';

  // Costanti e Mappature
  const CATEGORY_LABELS = {
    brand: '01 // BRAND & VISUAL IDENTITY',
    editorial: '02 // EDITORIAL, ZINE & GLITCH ART',
    packaging: '03 // PACKAGING & LABEL SYSTEMS',
    poster: '04 // POSTER & CULTURAL CAMPAIGNS',
    digital: '05 // DIGITAL, UI & MOTION'
  };

  const FONT_PRESETS = {
    'syne-mono': {
      display: "'Syne', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne ExtraBold + IBM Plex Mono'
    },
    'syne-inter': {
      display: "'Syne', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne Bold + Inter'
    },
    'syne-space': {
      display: "'Syne', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne Bold + Space Grotesk'
    },
    'unbounded-mono': {
      display: "'Unbounded', sans-serif",
      body: "'IBM Plex Mono', monospace",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Unbounded Black + IBM Plex Mono'
    },
    'unbounded-space': {
      display: "'Unbounded', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Unbounded Bold + Space Grotesk'
    },
    'cormorant-space': {
      display: "'Cormorant Garamond', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond + Space Grotesk'
    },
    'cormorant-mono': {
      display: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond + IBM Plex Mono'
    },
    'cormorant-inter': {
      display: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond + Inter'
    },
    'playfair-inter': {
      display: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display + Inter'
    },
    'playfair-space': {
      display: "'Playfair Display', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display + Space Grotesk'
    },
    'space-inter': {
      display: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Space Grotesk + Inter'
    },
    'space-mono': {
      display: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Space Grotesk + IBM Plex Mono'
    }
  };

  // Stato Globale del CMS
  let apiBase = '';
  let serverOnline = false;
  let categories = JSON.parse(JSON.stringify(window.PORTFOLIO_CATEGORIES || []));
  let projects = JSON.parse(JSON.stringify(window.PORTFOLIO_DATA || []));
  let workspaceImages = [];

  let activeProjectIndex = 0;
  let activeSliceIndex = 0;
  let searchQuery = '';
  let filterCat = 'all';
  let hasUnsavedChanges = false;

  // =========================================================================
  // 1. INIZIALIZZAZIONE E CONNESSIONE AL BACKEND PYTHON (server.py)
  // =========================================================================
  async function detectBackendAndLoad() {
    const badge = document.getElementById('server-status-badge');
    const candidates = ['', 'http://localhost:8080', 'http://127.0.0.1:8080'];

    for (const base of candidates) {
      try {
        const res = await fetch(`${base}/api/status`, { cache: 'no-store' });
        if (res.ok) {
          const info = await res.json();
          if (info && info.ok) {
            apiBase = base;
            serverOnline = true;
            break;
          }
        }
      } catch (_) {
        // continua col prossimo candidato
      }
    }

    if (serverOnline) {
      if (badge) {
        badge.textContent = '● SERVER PYTHON ATTIVO (SALVATAGGIO DIRETTO)';
        badge.className = 'status-badge online';
      }
      try {
        const res = await fetch(`${apiBase}/api/projects`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.categories) && data.categories.length) {
            categories = data.categories;
          }
          if (Array.isArray(data.projects) && data.projects.length) {
            projects = data.projects;
          }
          if (Array.isArray(data.images)) {
            workspaceImages = data.images;
          }
        }
      } catch (err) {
        console.warn('Errore caricamento /api/projects:', err);
      }
    } else {
      if (badge) {
        badge.textContent = '● MODALITÀ LOCALE (AVVIA SERVER O ESPORTA .JS)';
        badge.className = 'status-badge offline';
      }
      // Costruisci elenco immagini dai progetti esistenti
      const imgSet = new Set();
      projects.forEach((p) => {
        if (p.primaryImage) imgSet.add(p.primaryImage);
        if (p.secondaryImage) imgSet.add(p.secondaryImage);
        (p.slices || []).forEach((s) => {
          if (s.src) imgSet.add(s.src);
        });
      });
      workspaceImages = Array.from(imgSet)
        .sort()
        .map((name) => ({ name, sizeKB: '—', modified: '' }));
    }

    populateCategoryFilterDropdown();
    renderProjectSidebar();
    selectProject(0);
    renderMediaLibraryGrid();
  }

  function showToast(msg, isError = false) {
    const toast = document.getElementById('cms-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.borderLeftColor = isError ? '#EF4444' : '#E5FF00';
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3600);
  }

  function markUnsaved() {
    hasUnsavedChanges = true;
    const saveBtn = document.getElementById('btn-save-all');
    if (saveBtn) {
      saveBtn.innerHTML = '<span>💾 SALVA MODIFICHE *</span>';
    }
    // Salva copia istantanea in localStorage per anteprima live immediata
    try {
      localStorage.setItem('NV_CMS_PREVIEW_DATA', JSON.stringify(projects));
    } catch (_) {}
  }

  // =========================================================================
  // 2. SIDEBAR LISTA PROGETTI & RICERCA
  // =========================================================================
  function populateCategoryFilterDropdown() {
    const sel = document.getElementById('cms-cat-filter');
    if (!sel) return;
    sel.innerHTML = categories
      .map((c) => {
        const count =
          c.id === 'all'
            ? projects.length
            : projects.filter((p) => p.category === c.id).length;
        return `<option value="${c.id}">${c.fullLabel} (${count})</option>`;
      })
      .join('');
    sel.value = filterCat;
  }

  function reindexSequences() {
    projects.forEach((p, idx) => {
      p.sequenceNum = String(idx + 1).padStart(2, '0');
    });
  }

  function renderProjectSidebar() {
    reindexSequences();
    const listEl = document.getElementById('cms-project-list');
    const countEl = document.getElementById('sidebar-total-count');
    if (countEl) countEl.textContent = `${projects.length} PROGETTI`;
    if (!listEl) return;

    const q = searchQuery.trim().toLowerCase();

    listEl.innerHTML = projects
      .map((p, idx) => {
        const matchesCat = filterCat === 'all' || p.category === filterCat;
        const matchesQuery =
          !q ||
          (p.title || '').toLowerCase().includes(q) ||
          (p.code || '').toLowerCase().includes(q) ||
          (p.subtitle || '').toLowerCase().includes(q) ||
          (p.client || '').toLowerCase().includes(q);

        if (!matchesCat || !matchesQuery) return '';

        const thumbPos = p.slices && p.slices[0] ? p.slices[0].pos : '50% 20%';
        const isActive = idx === activeProjectIndex;

        return `
          <div class="cms-proj-item ${isActive ? 'active' : ''}" data-idx="${idx}">
            <div class="proj-thumb">
              <img src="${p.primaryImage}" alt="${p.title}" style="object-position: ${thumbPos};" loading="lazy">
            </div>
            <div class="proj-info">
              <div class="proj-info-top">
                <span>#${p.sequenceNum}</span>
                <span class="code">${p.code}</span>
                <span>${p.category.toUpperCase()}</span>
              </div>
              <strong>${p.title}</strong>
            </div>
            <div class="proj-swatches">
              <span style="background: ${p.itten?.primary || '#FF2400'};"></span>
              <span style="background: ${p.itten?.secondary || '#092622'};"></span>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // =========================================================================
  // 3. CARICAMENTO DEL PROGETTO NELL'EDITOR CENTRALE
  // =========================================================================
  function getActiveProject() {
    return projects[activeProjectIndex];
  }

  function selectProject(idx) {
    if (idx < 0 || idx >= projects.length) idx = 0;
    activeProjectIndex = idx;
    activeSliceIndex = 0;

    const p = getActiveProject();
    if (!p) return;

    // Intestazione
    setText('ed-header-seq', `SEQ. ${p.sequenceNum}`);
    setText('ed-header-code', p.code);
    setText('ed-header-title', p.title);

    // Tab 1: Identità & Testi
    setVal('inp-code', p.code || '');
    setVal('inp-id', p.id || '');
    setVal('inp-category', p.category || 'poster');
    setVal('inp-title', p.title || '');
    setVal('inp-subtitle', p.subtitle || '');
    setVal('inp-year', p.year || '');
    setVal('inp-client', p.client || '');
    setVal('inp-density', p.density || 'high');
    setVal('inp-curatorial-copy', p.curatorialCopy || '');
    updateWordCount(p.curatorialCopy || '');

    renderSpecsEditor(p);

    // Tab 2: Immagini & Slices
    populateImageSelectDropdowns(p.primaryImage);
    renderSlicesEditor(p);

    // Tab 3: Palette di Itten
    const itten = p.itten || {};
    setColorPair('col-primary-picker', 'inp-color-primary', itten.primary || '#FF2400');
    setVal('inp-primary-name', itten.primaryName || '');
    setColorPair('col-secondary-picker', 'inp-color-secondary', itten.secondary || '#092622');
    setVal('inp-secondary-name', itten.secondaryName || '');
    setColorPair('col-bg-picker', 'inp-color-bg', itten.bg || '#0D0D0D');
    setColorPair('col-text-picker', 'inp-color-text', itten.text || '#FFFFFF');
    setColorPair('col-accent-picker', 'inp-color-accent', itten.accent || '#E5FF00');
    setVal('inp-contrast-type', itten.contrastType || '');
    setVal('inp-itten-note', itten.note || '');

    const extBar = document.getElementById('extracted-palette-bar');
    if (extBar) extBar.hidden = true;

    // Tab 4: Mockup 3D, Font & Interazione
    const radios = document.querySelectorAll('input[name="mockupType"]');
    radios.forEach((r) => {
      r.checked = r.value === (p.mockupType || 'poster-3d');
    });

    setVal('inp-special-interaction', p.specialInteraction || 'venetian-sticky');
    matchFontPresetDropdown(p.fonts);

    // Aggiorna Sidebar, Inspector Smart-Slicing e Mini Card Live
    renderProjectSidebar();
    updateVisualSlicerInspector();
    updateLiveSectionPreviewCard();
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  }

  function setColorPair(pickerId, textId, hex) {
    const cleanHex = normalizeHex(hex);
    setVal(pickerId, cleanHex);
    setVal(textId, hex);
  }

  function normalizeHex(hex) {
    if (!hex || typeof hex !== 'string') return '#000000';
    let h = hex.trim();
    if (!h.startsWith('#')) h = '#' + h;
    if (/^#[0-9A-Fa-f]{3}$/.test(h)) {
      h = '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
    }
    return /^#[0-9A-Fa-f]{6}$/.test(h) ? h : '#000000';
  }

  function updateWordCount(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const badge = document.getElementById('word-count-badge');
    if (badge) {
      badge.textContent = `${words} parole (Target: 30–45 parole)`;
      badge.style.color = words >= 22 && words <= 55 ? '#10B981' : '#F59E0B';
    }
  }

  function matchFontPresetDropdown(fontsObj) {
    const sel = document.getElementById('inp-font-preset');
    if (!sel || !fontsObj) return;
    for (const [key, preset] of Object.entries(FONT_PRESETS)) {
      if (
        preset.pairingName.toLowerCase() === (fontsObj.pairingName || '').toLowerCase() ||
        (preset.display === fontsObj.display && preset.body === fontsObj.body)
      ) {
        sel.value = key;
        return;
      }
    }
  }

  // =========================================================================
  // 4. EDITOR SPECIFICHE TECNICHE (META-GRID)
  // =========================================================================
  function renderSpecsEditor(project) {
    const container = document.getElementById('specs-editor-list');
    if (!container) return;
    if (!Array.isArray(project.specs)) project.specs = [];

    container.innerHTML = project.specs
      .map(
        (sp, i) => `
        <div class="spec-edit-row" data-spec-idx="${i}">
          <input type="text" class="inp-spec-label" value="${escapeAttr(sp.label)}" placeholder="ETICHETTA">
          <input type="text" class="inp-spec-val" value="${escapeAttr(sp.value)}" placeholder="Valore specifica">
          <button type="button" class="cms-mini-btn danger btn-remove-spec" title="Rimuovi voce">✕</button>
        </div>
      `
      )
      .join('');
  }

  function escapeAttr(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  // =========================================================================
  // 5. EDITOR DELLE FINESTRE DI RITAGLIO (.VIEWPORT-SLICE) & VISUAL PICKER
  // =========================================================================
  function populateImageSelectDropdowns(selectedPrimary) {
    const primarySel = document.getElementById('inp-primary-image');
    if (!primarySel) return;

    const names = workspaceImages.map((img) => img.name);
    if (selectedPrimary && !names.includes(selectedPrimary)) {
      names.unshift(selectedPrimary);
    }

    primarySel.innerHTML = names
      .map((name) => `<option value="${escapeAttr(name)}">${name}</option>`)
      .join('');
    if (selectedPrimary) primarySel.value = selectedPrimary;
  }

  function renderSlicesEditor(project) {
    const container = document.getElementById('slices-editor-container');
    const countSpan = document.getElementById('tab-slices-count');
    if (!Array.isArray(project.slices)) project.slices = [];
    if (countSpan) countSpan.textContent = String(project.slices.length);
    if (!container) return;

    const allImgNames = workspaceImages.map((i) => i.name);

    container.innerHTML = project.slices
      .map((s, idx) => {
        const isCurrent = idx === activeSliceIndex;
        const imgOptions = Array.from(new Set([s.src, project.primaryImage, ...allImgNames]))
          .filter(Boolean)
          .map(
            (name) =>
              `<option value="${escapeAttr(name)}" ${name === s.src ? 'selected' : ''}>${name}</option>`
          )
          .join('');

        return `
          <div class="slice-editor-card ${isCurrent ? 'active-slice' : ''}" data-slice-idx="${idx}">
            <div class="slice-card-top">
              <span class="slice-badge">FINESTRA #0${idx + 1} ${isCurrent ? '— [ATTIVA NEL MIRINO A DESTRA]' : ''}</span>
              <div class="inline-btn-row">
                <button type="button" class="cms-mini-btn btn-select-slice">🎯 PUNTA NEL MIRINO</button>
                <button type="button" class="cms-mini-btn danger btn-delete-slice" title="Elimina questa finestra">✕</button>
              </div>
            </div>

            <div class="slice-card-grid">
              <div>
                <label>FILE TAVOLA</label>
                <select class="sl-inp-src">${imgOptions}</select>
              </div>
              <div>
                <label>DIDASCALIA TECNICA (LABEL)</label>
                <input type="text" class="sl-inp-label" value="${escapeAttr(s.label)}">
              </div>
              <div>
                <label>POSIZIONE (X% Y%)</label>
                <input type="text" class="sl-inp-pos" value="${escapeAttr(s.pos || '50% 50%')}">
              </div>
              <div>
                <label>ZOOM (SCALE)</label>
                <input type="number" class="sl-inp-scale" step="0.02" min="1" max="2.5" value="${s.scale || 1.02}">
              </div>
              <div>
                <label>ASPECT RATIO</label>
                <select class="sl-inp-aspect">
                  ${['16 / 10', '16 / 9', '16 / 11', '16 / 7', '3 / 4.2', '4 / 5', '4 / 3', '1 / 1', '1 / 1.15']
                    .map(
                      (ar) =>
                        `<option value="${ar}" ${(s.aspect || '16 / 10') === ar ? 'selected' : ''}>${ar}</option>`
                    )
                    .join('')}
                </select>
              </div>
              <div>
                <label>PARALLASSE</label>
                <input type="number" class="sl-inp-speed" step="0.02" min="0.8" max="1.25" value="${s.speed || 1.0}">
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  /**
   * Aggiorna il Mirino Smart-Slicing sulla Colonna 3 (Destra)
   */
  function updateVisualSlicerInspector() {
    const p = getActiveProject();
    if (!p || !Array.isArray(p.slices) || !p.slices.length) return;
    if (activeSliceIndex >= p.slices.length) activeSliceIndex = 0;

    const slice = p.slices[activeSliceIndex];
    const src = slice.src || p.primaryImage;
    const pos = slice.pos || '50% 50%';
    const scale = parseFloat(slice.scale || 1.02);
    const aspect = slice.aspect || '16 / 10';

    setText('inspector-slice-title', `FINESTRA #0${activeSliceIndex + 1} // ${src}`);
    setText('inspector-coord-readout', pos);

    const boardImg = document.getElementById('picker-board-img');
    const liveImg = document.getElementById('live-slice-img');
    const liveBox = document.getElementById('live-slice-box');
    const liveCap = document.getElementById('live-slice-caption');
    const crosshair = document.getElementById('picker-crosshair');
    const zoomSlider = document.getElementById('inspector-zoom-slider');
    const zoomVal = document.getElementById('inspector-zoom-val');

    if (boardImg && boardImg.getAttribute('src') !== src) {
      boardImg.src = src;
    }
    if (liveImg) {
      if (liveImg.getAttribute('src') !== src) liveImg.src = src;
      liveImg.style.objectPosition = pos;
      liveImg.style.transform = `scale(${scale})`;
    }
    if (liveBox) {
      liveBox.style.aspectRatio = aspect;
    }
    if (liveCap) {
      liveCap.textContent = slice.label || '';
    }
    if (zoomSlider) zoomSlider.value = String(scale);
    if (zoomVal) zoomVal.textContent = `${scale.toFixed(2)}x`;

    // Posiziona il mirino giallo sulle coordinate X% Y%
    if (crosshair) {
      const parts = pos.trim().split(/\s+/);
      const xPct = parts[0] && parts[0].endsWith('%') ? parts[0] : '50%';
      const yPct = parts[1] && parts[1].endsWith('%') ? parts[1] : '50%';
      crosshair.style.left = xPct;
      crosshair.style.top = yPct;
    }
  }

  /**
   * Aggiorna la Mini Card di Anteprima Atmosfera & Itten sulla Colonna 3
   */
  function updateLiveSectionPreviewCard() {
    const p = getActiveProject();
    if (!p) return;

    const card = document.getElementById('live-section-mini-card');
    if (!card) return;

    card.style.backgroundColor = p.itten?.bg || '#0D0D0D';
    card.style.color = p.itten?.text || '#FFFFFF';
    card.style.fontFamily = p.fonts?.body || "'Inter', sans-serif";

    setText('preview-archetype-tag', (p.mockupType || 'poster-3d').toUpperCase());
    setText('mini-seq-code', `OPERA ${p.sequenceNum} // ${p.code}`);
    setText('mini-cat', p.categoryLabel || '');
    setText('mini-contrast-text', p.itten?.contrastType || '');

    const d1 = document.getElementById('mini-dot-1');
    const d2 = document.getElementById('mini-dot-2');
    if (d1) d1.style.backgroundColor = p.itten?.primary || '#FF2400';
    if (d2) d2.style.backgroundColor = p.itten?.secondary || '#092622';

    const titleEl = document.getElementById('mini-title');
    if (titleEl) {
      titleEl.textContent = p.title || '';
      titleEl.style.fontFamily = p.fonts?.display || "'Syne', sans-serif";
    }
    setText('mini-subtitle', p.subtitle || '');
    setText('mini-copy', p.curatorialCopy || '');
  }

  // =========================================================================
  // 6. CALCOLATORE DI ITTEN & ESTRAZIONE PALETTE DALLA TAVOLA (<canvas>)
  // =========================================================================
  function hexToHsl(hex) {
    const clean = normalizeHex(hex).slice(1);
    const r = parseInt(clean.slice(0, 2), 16) / 255;
    const g = parseInt(clean.slice(2, 4), 16) / 255;
    const b = parseInt(clean.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function hslToHex(h, s, l) {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0,
      g = 0,
      b = 0;

    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];

    const toHex = (v) =>
      Math.round((v + m) * 255)
        .toString(16)
        .padStart(2, '0')
        .toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  function autoCalculateIttenHarmony() {
    const p = getActiveProject();
    if (!p) return;

    const primaryHex = normalizeHex(p.itten.primary || '#FF2400');
    const hsl = hexToHsl(primaryHex);

    // Calcola il complementare di Itten (+180 gradi) e una versione profonda per lo sfondo
    const compH = (hsl.h + 180) % 360;
    const secondaryHex = hslToHex(compH, Math.max(45, hsl.s * 0.75), 24);
    const bgHex = hslToHex(compH, Math.max(38, hsl.s * 0.65), 11);

    p.itten.primary = primaryHex;
    p.itten.secondary = secondaryHex;
    p.itten.bg = bgHex;
    p.itten.text = '#F4F6F8';
    p.itten.accent = primaryHex;
    p.itten.contrastType = `Contrasto dei Complementari (${primaryHex} ↔ ${secondaryHex})`;
    p.itten.note = `Lo sfondo complementare profondo (${bgHex}) applica la legge di induzione simultanea di Johannes Itten per esaltare la luminosità cromatica del tono dominante (${primaryHex}).`;

    selectProject(activeProjectIndex);
    markUnsaved();
    showToast('Armonia complementare di Itten calcolata automaticamente!');
  }

  function extractPaletteFromCurrentImage() {
    const p = getActiveProject();
    if (!p) return;

    const img = document.getElementById('picker-board-img');
    const canvas = document.getElementById('palette-canvas');
    if (!img || !canvas || !img.complete) {
      showToast('Attendi il caricamento dell’immagine per estrarre i colori.', true);
      return;
    }

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const buckets = {};
    for (let i = 0; i < data.length; i += 16) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Scarta bianchi e neri quasi puri per trovare le tinte cromatiche chiave
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      if (max < 30 || min > 235) continue;

      const qr = Math.round(r / 32) * 32;
      const qg = Math.round(g / 32) * 32;
      const qb = Math.round(b / 32) * 32;
      const key = `${qr},${qg},${qb}`;
      buckets[key] = (buckets[key] || 0) + (1 + (max - min) / 50);
    }

    const sorted = Object.entries(buckets)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([rgb]) => {
        const [r, g, b] = rgb.split(',').map((n) => Math.min(255, parseInt(n, 10)));
        return (
          '#' +
          [r, g, b].map((x) => x.toString(16).padStart(2, '0').toUpperCase()).join('')
        );
      });

    const bar = document.getElementById('extracted-palette-bar');
    const swatchesEl = document.getElementById('extracted-swatches');
    if (bar && swatchesEl && sorted.length) {
      bar.hidden = false;
      swatchesEl.innerHTML = sorted
        .map(
          (hex) => `
          <button type="button" class="extracted-swatch-btn" data-extracted-hex="${hex}">
            <span class="box" style="background:${hex}"></span>
            <span>${hex}</span>
          </button>
        `
        )
        .join('');
    }
  }

  // =========================================================================
  // 7. UPLOAD IMMAGINI & LIBRERIA MEDIA
  // =========================================================================
  async function uploadFilesToServer(fileList, assignToActiveProject = false) {
    if (!fileList || !fileList.length) return;

    for (const file of Array.from(fileList)) {
      const reader = new FileReader();
      await new Promise((resolve) => {
        reader.onload = async (e) => {
          const dataUrl = e.target.result;
          if (serverOnline) {
            try {
              const res = await fetch(`${apiBase}/api/upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  filename: file.name,
                  data: dataUrl,
                  overwrite: true
                })
              });
              const out = await res.json();
              if (out.ok) {
                workspaceImages = out.images || workspaceImages;
                if (assignToActiveProject) {
                  const p = getActiveProject();
                  if (p) {
                    p.primaryImage = out.filename;
                    p.slices.forEach((s) => {
                      s.src = out.filename;
                    });
                    markUnsaved();
                  }
                }
                showToast(`Immagine "${out.filename}" caricata nella cartella!`);
              } else {
                showToast(`Errore upload: ${out.error}`, true);
              }
            } catch (err) {
              showToast(`Errore di rete durante l'upload: ${err.message}`, true);
            }
          } else {
            // Modalità locale senza server: registra il nome file
            workspaceImages.push({ name: file.name, sizeKB: Math.round(file.size / 1024) });
            if (assignToActiveProject) {
              const p = getActiveProject();
              if (p) {
                p.primaryImage = file.name;
                p.slices.forEach((s) => (s.src = file.name));
                markUnsaved();
              }
            }
            showToast(
              `File "${file.name}" associato! (Copia il file nella cartella GRAFICA o avvia Avvia-Admin.command)`
            );
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    selectProject(activeProjectIndex);
    renderMediaLibraryGrid();
  }

  function renderMediaLibraryGrid() {
    const grid = document.getElementById('media-library-grid');
    if (!grid) return;

    grid.innerHTML = workspaceImages
      .map(
        (img) => `
        <div class="media-item-card">
          <div class="media-item-thumb">
            <img src="${img.name}" alt="${img.name}" loading="lazy">
          </div>
          <div class="media-item-meta">
            <strong title="${escapeAttr(img.name)}">${img.name}</strong>
            <span style="color:var(--cms-muted);">${img.sizeKB ? img.sizeKB + ' KB' : ''}</span>
            <button type="button" class="cms-mini-btn accent" data-use-image="${escapeAttr(img.name)}">
              ✓ USA NEL PROGETTO ATTIVO
            </button>
          </div>
        </div>
      `
      )
      .join('');
  }

  // =========================================================================
  // 8. SALVATAGGIO SU DISCO, ESPORTAZIONE .JS & PUSH GITHUB
  // =========================================================================
  function buildProjectsDataJSString() {
    reindexSequences();
    const header =
      `/**\n` +
      ` * NICOLA VIANELLO — SELECTED WORKS & ARCHIVE MONOGRAPH (PORTFOLIO A + B)\n` +
      ` * Updated via Studio Curatorial CMS on ${new Date().toISOString()}\n` +
      ` * Total Curated Works: ${projects.length}\n` +
      ` */\n\n`;
    return (
      header +
      `window.PORTFOLIO_CATEGORIES = ${JSON.stringify(categories, null, 2)};\n\n` +
      `window.PORTFOLIO_DATA = ${JSON.stringify(projects, null, 2)};\n`
    );
  }

  async function saveAllProjects() {
    reindexSequences();
    if (serverOnline) {
      try {
        const res = await fetch(`${apiBase}/api/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categories, projects })
        });
        const out = await res.json();
        if (out.ok) {
          hasUnsavedChanges = false;
          const saveBtn = document.getElementById('btn-save-all');
          if (saveBtn) saveBtn.innerHTML = '<span>💾 SALVA MODIFICHE</span>';
          localStorage.removeItem('NV_CMS_PREVIEW_DATA');
          showToast(`✓ ${out.message} (Backup creato in /backups)`);
          return true;
        } else {
          showToast(`Errore salvataggio: ${out.error}`, true);
          return false;
        }
      } catch (err) {
        showToast(`Errore connessione al server: ${err.message}`, true);
        return false;
      }
    } else {
      // Scarica direttamente projects-data.js
      downloadProjectsDataJS();
      showToast('File projects-data.js generato e scaricato! Sostituiscilo nella cartella GRAFICA.');
      return true;
    }
  }

  function downloadProjectsDataJS() {
    const content = buildProjectsDataJSString();
    const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'projects-data.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function pushToGitHub() {
    if (!serverOnline) {
      showToast('Per pubblicare automaticamente su GitHub, avvia il server con Avvia-Admin.command!', true);
      return;
    }

    const btn = document.getElementById('btn-git-push');
    if (btn) btn.innerHTML = '<span>⏳ PUSH IN CORSO...</span>';

    // Prima salva le modifiche su disco
    await saveAllProjects();

    try {
      const res = await fetch(`${apiBase}/api/git-sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `CMS Update: ${projects.length} curated projects`
        })
      });
      const out = await res.json();
      if (out.ok) {
        showToast(`☁ ${out.message}`);
      } else {
        showToast(`Errore Git: ${out.error}`, true);
      }
    } catch (err) {
      showToast(`Errore durante il push GitHub: ${err.message}`, true);
    } finally {
      if (btn) btn.innerHTML = '<span>☁ PUBBLICA SU GITHUB</span>';
    }
  }

  // =========================================================================
  // 9. EVENT LISTENERS E INTERATTIVITÀ LIVE DELL'EDITOR
  // =========================================================================
  function bindEvents() {
    // 1. Ricerca e Filtro Categoria nella Topbar
    const searchInp = document.getElementById('cms-search-input');
    const catFilter = document.getElementById('cms-cat-filter');
    if (searchInp) {
      searchInp.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProjectSidebar();
      });
    }
    if (catFilter) {
      catFilter.addEventListener('change', (e) => {
        filterCat = e.target.value;
        renderProjectSidebar();
      });
    }

    // 2. Selezione progetto nella Sidebar
    const listEl = document.getElementById('cms-project-list');
    if (listEl) {
      listEl.addEventListener('click', (e) => {
        const item = e.target.closest('.cms-proj-item');
        if (item) {
          selectProject(parseInt(item.getAttribute('data-idx'), 10));
        }
      });
    }

    // 3. Navigazione Tabs dell'Editor
    document.querySelectorAll('.editor-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');
        document.querySelectorAll('.editor-tab').forEach((t) => t.classList.toggle('active', t === tab));
        document.querySelectorAll('.editor-panel').forEach((panel) => {
          panel.classList.toggle('active', panel.id === targetId);
        });
      });
    });

    // 4. Binding Campi Tab 01 (Identità & Testi)
    const bindField = (id, callback) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          const p = getActiveProject();
          if (!p) return;
          callback(p, el.value);
          markUnsaved();
          updateLiveSectionPreviewCard();
        });
      }
    };

    bindField('inp-code', (p, val) => {
      p.code = val;
      setText('ed-header-code', val);
      renderProjectSidebar();
    });
    bindField('inp-id', (p, val) => {
      p.id = val.toLowerCase().replace(/[^a-z0-9-_]/g, '-');
    });
    bindField('inp-category', (p, val) => {
      p.category = val;
      p.categoryLabel = CATEGORY_LABELS[val] || '04 // POSTER & CULTURAL CAMPAIGNS';
      populateCategoryFilterDropdown();
      renderProjectSidebar();
    });
    bindField('inp-title', (p, val) => {
      p.title = val;
      setText('ed-header-title', val);
      renderProjectSidebar();
    });
    bindField('inp-subtitle', (p, val) => {
      p.subtitle = val;
    });
    bindField('inp-year', (p, val) => {
      p.year = val;
    });
    bindField('inp-client', (p, val) => {
      p.client = val;
    });
    bindField('inp-density', (p, val) => {
      p.density = val;
    });
    bindField('inp-curatorial-copy', (p, val) => {
      p.curatorialCopy = val;
      updateWordCount(val);
    });

    // Specifiche Tecniche (Meta-Grid)
    const specsContainer = document.getElementById('specs-editor-list');
    if (specsContainer) {
      specsContainer.addEventListener('input', (e) => {
        const row = e.target.closest('.spec-edit-row');
        const p = getActiveProject();
        if (!row || !p) return;
        const idx = parseInt(row.getAttribute('data-spec-idx'), 10);
        if (p.specs[idx]) {
          p.specs[idx].label = row.querySelector('.inp-spec-label').value;
          p.specs[idx].value = row.querySelector('.inp-spec-val').value;
          markUnsaved();
        }
      });

      specsContainer.addEventListener('click', (e) => {
        const delBtn = e.target.closest('.btn-remove-spec');
        if (delBtn) {
          const row = delBtn.closest('.spec-edit-row');
          const p = getActiveProject();
          if (row && p) {
            const idx = parseInt(row.getAttribute('data-spec-idx'), 10);
            p.specs.splice(idx, 1);
            renderSpecsEditor(p);
            markUnsaved();
          }
        }
      });
    }

    const addSpecBtn = document.getElementById('btn-add-spec');
    if (addSpecBtn) {
      addSpecBtn.addEventListener('click', () => {
        const p = getActiveProject();
        if (!p) return;
        p.specs.push({ label: 'SPECIFICA', value: 'Dettaglio tecnico' });
        renderSpecsEditor(p);
        markUnsaved();
      });
    }

    // 5. Binding Tab 02 (Immagini & Smart-Slicing)
    const primarySel = document.getElementById('inp-primary-image');
    if (primarySel) {
      primarySel.addEventListener('change', () => {
        const p = getActiveProject();
        if (!p) return;
        const oldPrimary = p.primaryImage;
        p.primaryImage = primarySel.value;
        p.slices.forEach((s) => {
          if (!s.src || s.src === oldPrimary) s.src = p.primaryImage;
        });
        renderSlicesEditor(p);
        renderProjectSidebar();
        updateVisualSlicerInspector();
        markUnsaved();
      });
    }

    // Auto-Slice 3 o 4 finestre
    const generateAutoSlices = (count) => {
      const p = getActiveProject();
      if (!p) return;
      const positions =
        count === 3
          ? ['50% 12%', '50% 50%', '50% 88%']
          : ['50% 10%', '50% 38%', '50% 66%', '50% 92%'];
      p.slices = positions.map((pos, idx) => ({
        src: p.primaryImage,
        pos,
        scale: 1.02,
        aspect: idx === 0 ? '16 / 10' : '16 / 9',
        role: idx === 0 ? 'hero' : 'detail',
        speed: idx % 2 === 0 ? 1.0 : 1.1,
        label: `0${idx + 1} // SEZIONE TAVOLA (${pos})`
      }));
      activeSliceIndex = 0;
      renderSlicesEditor(p);
      updateVisualSlicerInspector();
      markUnsaved();
      showToast(`Generate ${count} finestre di ritaglio distribuite sulla tavola!`);
    };

    document.getElementById('btn-auto-slice-3')?.addEventListener('click', () => generateAutoSlices(3));
    document.getElementById('btn-auto-slice-4')?.addEventListener('click', () => generateAutoSlices(4));

    document.getElementById('btn-add-slice')?.addEventListener('click', () => {
      const p = getActiveProject();
      if (!p) return;
      const nextNum = p.slices.length + 1;
      p.slices.push({
        src: p.primaryImage,
        pos: '50% 50%',
        scale: 1.04,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: `0${nextNum} // DETTAGLIO OPERA`
      });
      activeSliceIndex = p.slices.length - 1;
      renderSlicesEditor(p);
      updateVisualSlicerInspector();
      markUnsaved();
    });

    const slicesContainer = document.getElementById('slices-editor-container');
    if (slicesContainer) {
      slicesContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.slice-editor-card');
        if (!card) return;
        const idx = parseInt(card.getAttribute('data-slice-idx'), 10);
        const p = getActiveProject();

        if (e.target.closest('.btn-delete-slice')) {
          if (p.slices.length <= 1) {
            showToast('Ogni progetto deve avere almeno 1 finestra di ritaglio.', true);
            return;
          }
          p.slices.splice(idx, 1);
          activeSliceIndex = Math.max(0, activeSliceIndex - 1);
          renderSlicesEditor(p);
          updateVisualSlicerInspector();
          markUnsaved();
          return;
        }

        if (activeSliceIndex !== idx) {
          activeSliceIndex = idx;
          renderSlicesEditor(p);
          updateVisualSlicerInspector();
        }
      });

      slicesContainer.addEventListener('input', (e) => {
        const card = e.target.closest('.slice-editor-card');
        const p = getActiveProject();
        if (!card || !p) return;
        const idx = parseInt(card.getAttribute('data-slice-idx'), 10);
        const s = p.slices[idx];
        if (!s) return;

        s.src = card.querySelector('.sl-inp-src').value;
        s.label = card.querySelector('.sl-inp-label').value;
        s.pos = card.querySelector('.sl-inp-pos').value;
        s.scale = parseFloat(card.querySelector('.sl-inp-scale').value || '1');
        s.aspect = card.querySelector('.sl-inp-aspect').value;
        s.speed = parseFloat(card.querySelector('.sl-inp-speed').value || '1');

        activeSliceIndex = idx;
        updateVisualSlicerInspector();
        renderProjectSidebar();
        markUnsaved();
      });
    }

    // 6. Mirino Visuale Interattivo sulla Tavola Completa (Click & Drag)
    const pickerWrap = document.getElementById('fullboard-picker-wrap');
    const boardImg = document.getElementById('picker-board-img');
    let isPickingCoord = false;

    const updateSliceCoordFromMouse = (e) => {
      const p = getActiveProject();
      if (!p || !p.slices[activeSliceIndex] || !boardImg) return;

      const rect = boardImg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const relX = Math.max(0, Math.min(100, Math.round(((e.clientX - rect.left) / rect.width) * 100)));
      const relY = Math.max(0, Math.min(100, Math.round(((e.clientY - rect.top) / rect.height) * 100)));

      const newPos = `${relX}% ${relY}%`;
      p.slices[activeSliceIndex].pos = newPos;

      // Aggiorna l'input della card corrispondente
      const activeCard = document.querySelector(`.slice-editor-card[data-slice-idx="${activeSliceIndex}"] .sl-inp-pos`);
      if (activeCard) activeCard.value = newPos;

      updateVisualSlicerInspector();
      if (activeSliceIndex === 0) renderProjectSidebar();
      markUnsaved();
    };

    if (pickerWrap) {
      pickerWrap.addEventListener('mousedown', (e) => {
        isPickingCoord = true;
        updateSliceCoordFromMouse(e);
      });
      window.addEventListener('mousemove', (e) => {
        if (isPickingCoord) updateSliceCoordFromMouse(e);
      });
      window.addEventListener('mouseup', () => {
        isPickingCoord = false;
      });
    }

    // Slider Zoom nell'Inspector
    const zoomSlider = document.getElementById('inspector-zoom-slider');
    if (zoomSlider) {
      zoomSlider.addEventListener('input', () => {
        const p = getActiveProject();
        if (!p || !p.slices[activeSliceIndex]) return;
        const val = parseFloat(zoomSlider.value);
        p.slices[activeSliceIndex].scale = val;

        const scaleInp = document.querySelector(
          `.slice-editor-card[data-slice-idx="${activeSliceIndex}"] .sl-inp-scale`
        );
        if (scaleInp) scaleInp.value = String(val);
        updateVisualSlicerInspector();
        markUnsaved();
      });
    }

    // 7. Binding Tab 03 (Palette & Itten)
    const bindColorSync = (pickerId, textId, fieldKey) => {
      const picker = document.getElementById(pickerId);
      const text = document.getElementById(textId);
      if (picker) {
        picker.addEventListener('input', () => {
          const p = getActiveProject();
          if (!p) return;
          p.itten[fieldKey] = picker.value.toUpperCase();
          if (text) text.value = p.itten[fieldKey];
          updateLiveSectionPreviewCard();
          renderProjectSidebar();
          markUnsaved();
        });
      }
      if (text) {
        text.addEventListener('input', () => {
          const p = getActiveProject();
          if (!p) return;
          p.itten[fieldKey] = text.value;
          if (/^#[0-9A-Fa-f]{6}$/.test(text.value.trim())) {
            if (picker) picker.value = text.value.trim();
          }
          updateLiveSectionPreviewCard();
          renderProjectSidebar();
          markUnsaved();
        });
      }
    };

    bindColorSync('col-primary-picker', 'inp-color-primary', 'primary');
    bindColorSync('col-secondary-picker', 'inp-color-secondary', 'secondary');
    bindColorSync('col-bg-picker', 'inp-color-bg', 'bg');
    bindColorSync('col-text-picker', 'inp-color-text', 'text');
    bindColorSync('col-accent-picker', 'inp-color-accent', 'accent');

    bindField('inp-primary-name', (p, val) => {
      p.itten.primaryName = val;
    });
    bindField('inp-secondary-name', (p, val) => {
      p.itten.secondaryName = val;
    });
    bindField('inp-contrast-type', (p, val) => {
      p.itten.contrastType = val;
    });
    bindField('inp-itten-note', (p, val) => {
      p.itten.note = val;
    });

    document.querySelectorAll('[data-set-bg]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = getActiveProject();
        if (!p) return;
        p.itten.bg = btn.getAttribute('data-set-bg');
        p.itten.text = btn.getAttribute('data-set-text');
        setColorPair('col-bg-picker', 'inp-color-bg', p.itten.bg);
        setColorPair('col-text-picker', 'inp-color-text', p.itten.text);
        updateLiveSectionPreviewCard();
        markUnsaved();
      });
    });

    document.getElementById('btn-bg-from-secondary')?.addEventListener('click', () => {
      const p = getActiveProject();
      if (!p) return;
      p.itten.bg = p.itten.secondary;
      p.itten.text = '#F5F6F8';
      setColorPair('col-bg-picker', 'inp-color-bg', p.itten.bg);
      setColorPair('col-text-picker', 'inp-color-text', p.itten.text);
      updateLiveSectionPreviewCard();
      markUnsaved();
    });

    document.querySelectorAll('[data-contrast-preset]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const p = getActiveProject();
        if (!p) return;
        const base = chip.getAttribute('data-contrast-preset');
        p.itten.contrastType = `${base} (${p.itten.primaryName || p.itten.primary} ↔ ${
          p.itten.secondaryName || p.itten.secondary
        })`;
        setVal('inp-contrast-type', p.itten.contrastType);
        updateLiveSectionPreviewCard();
        markUnsaved();
      });
    });

    document.getElementById('btn-auto-itten')?.addEventListener('click', autoCalculateIttenHarmony);
    document.getElementById('btn-extract-palette')?.addEventListener('click', extractPaletteFromCurrentImage);

    document.getElementById('extracted-swatches')?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-extracted-hex]');
      if (!btn) return;
      const hex = btn.getAttribute('data-extracted-hex');
      const p = getActiveProject();
      if (p && hex) {
        p.itten.primary = hex;
        p.itten.accent = hex;
        setColorPair('col-primary-picker', 'inp-color-primary', hex);
        setColorPair('col-accent-picker', 'inp-color-accent', hex);
        autoCalculateIttenHarmony();
      }
    });

    // 8. Binding Tab 04 (Mockup 3D, Font & Interazione)
    document.querySelectorAll('input[name="mockupType"]').forEach((radio) => {
      radio.addEventListener('change', () => {
        const p = getActiveProject();
        if (p && radio.checked) {
          p.mockupType = radio.value;
          updateLiveSectionPreviewCard();
          markUnsaved();
        }
      });
    });

    const fontSel = document.getElementById('inp-font-preset');
    if (fontSel) {
      fontSel.addEventListener('change', () => {
        const p = getActiveProject();
        const preset = FONT_PRESETS[fontSel.value];
        if (p && preset) {
          p.fonts = { ...preset };
          updateLiveSectionPreviewCard();
          markUnsaved();
        }
      });
    }

    bindField('inp-special-interaction', (p, val) => {
      p.specialInteraction = val;
    });

    // 9. Azioni Sequenza Progetto (Nuovo, Duplica, Elimina, Su, Giù)
    document.getElementById('btn-new-project')?.addEventListener('click', () => {
      const nextCodeNum = projects.length + 1;
      const defaultImg = workspaceImages[0]?.name || 'Portfolio A-01.jpg';
      const newProj = {
        id: `nuovo-progetto-${nextCodeNum}`,
        code: `C-${String(nextCodeNum).padStart(2, '0')}`,
        sequenceNum: String(nextCodeNum).padStart(2, '0'),
        title: 'NUOVO PROGETTO',
        subtitle: 'Sottotitolo e Ambito Progettuale',
        category: 'brand',
        categoryLabel: CATEGORY_LABELS.brand,
        year: `${new Date().getFullYear()} // SELECTED WORK`,
        client: 'Committente / Ricerca',
        density: 'high',
        mockupType: 'poster-3d',
        specialInteraction: 'venetian-sticky',
        fonts: { ...FONT_PRESETS['syne-mono'] },
        itten: {
          bg: '#0E1318',
          bgAlt: '#FFFFFF',
          text: '#F4F6F8',
          primary: '#E5FF00',
          secondary: '#12263A',
          accent: '#E5FF00',
          primaryName: 'Signal Yellow',
          secondaryName: 'Deep Prussian Blue',
          contrastType: 'Contrasto di Quantità & Luminosità',
          note: 'Contrasto progettato sulla Griglia di Itten per massimizzare l’impatto visivo della tavola.'
        },
        specs: [
          { label: 'FORMATO', value: 'Sistema Coordinato' },
          { label: 'TECNICA', value: 'Vettoriale & Editoriale' },
          { label: 'FOCUS', value: 'Art Direction' },
          { label: 'ANNO', value: String(new Date().getFullYear()) }
        ],
        curatorialCopy:
          'Inserisci qui il testo curatoriale del progetto (circa 30-45 parole). Descrivi la genesi del segno, il sistema cromatico e le applicazioni fisiche o digitali.',
        primaryImage: defaultImg,
        slices: [
          {
            src: defaultImg,
            pos: '50% 12%',
            scale: 1.02,
            aspect: '16 / 10',
            role: 'hero',
            speed: 1.0,
            label: '01 // VISTA PRINCIPALE DELL’OPERA'
          },
          {
            src: defaultImg,
            pos: '50% 52%',
            scale: 1.04,
            aspect: '16 / 9',
            role: 'detail',
            speed: 1.1,
            label: '02 // DETTAGLIO COSTRUTTIVO E APPLICAZIONE'
          },
          {
            src: defaultImg,
            pos: '50% 88%',
            scale: 1.02,
            aspect: '16 / 10',
            role: 'detail',
            speed: 0.94,
            label: '03 // DECLINAZIONE FINALE'
          }
        ]
      };

      projects.unshift(newProj);
      filterCat = 'all';
      populateCategoryFilterDropdown();
      selectProject(0);
      markUnsaved();
      showToast('Nuovo progetto creato in cima alla sequenza!');
    });

    document.getElementById('btn-duplicate-project')?.addEventListener('click', () => {
      const p = getActiveProject();
      if (!p) return;
      const clone = JSON.parse(JSON.stringify(p));
      clone.id = `${p.id}-copy`;
      clone.code = `${p.code}-BIS`;
      clone.title = `${p.title} (COPIA)`;
      projects.splice(activeProjectIndex + 1, 0, clone);
      populateCategoryFilterDropdown();
      selectProject(activeProjectIndex + 1);
      markUnsaved();
      showToast('Progetto duplicato!');
    });

    document.getElementById('btn-delete-project')?.addEventListener('click', () => {
      if (projects.length <= 1) {
        showToast('Non puoi eliminare l’ultimo progetto rimasto.', true);
        return;
      }
      const p = getActiveProject();
      if (!confirm(`Sei sicuro di voler eliminare "${p.title}" (${p.code})?`)) return;
      projects.splice(activeProjectIndex, 1);
      populateCategoryFilterDropdown();
      selectProject(Math.max(0, activeProjectIndex - 1));
      markUnsaved();
      showToast('Progetto eliminato. Premi Salva Modifiche per confermare su disco.');
    });

    document.getElementById('btn-move-up')?.addEventListener('click', () => {
      if (activeProjectIndex <= 0) return;
      const tmp = projects[activeProjectIndex - 1];
      projects[activeProjectIndex - 1] = projects[activeProjectIndex];
      projects[activeProjectIndex] = tmp;
      selectProject(activeProjectIndex - 1);
      markUnsaved();
    });

    document.getElementById('btn-move-down')?.addEventListener('click', () => {
      if (activeProjectIndex >= projects.length - 1) return;
      const tmp = projects[activeProjectIndex + 1];
      projects[activeProjectIndex + 1] = projects[activeProjectIndex];
      projects[activeProjectIndex] = tmp;
      selectProject(activeProjectIndex + 1);
      markUnsaved();
    });

    // 10. Upload Immagini e Modal Libreria Media
    document.getElementById('inp-quick-upload')?.addEventListener('change', (e) => {
      uploadFilesToServer(e.target.files, true);
      e.target.value = '';
    });

    document.getElementById('inp-multi-upload')?.addEventListener('change', (e) => {
      uploadFilesToServer(e.target.files, false);
      e.target.value = '';
    });

    const dropzone = document.getElementById('upload-dropzone');
    if (dropzone) {
      dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
      dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
      dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files?.length) {
          uploadFilesToServer(e.dataTransfer.files, false);
        }
      });
    }

    const mediaModal = document.getElementById('media-modal');
    document.getElementById('btn-open-media')?.addEventListener('click', () => {
      renderMediaLibraryGrid();
      mediaModal?.classList.add('open');
    });
    document.getElementById('btn-close-media')?.addEventListener('click', () => {
      mediaModal?.classList.remove('open');
    });
    document.getElementById('media-modal-backdrop')?.addEventListener('click', () => {
      mediaModal?.classList.remove('open');
    });

    document.getElementById('media-library-grid')?.addEventListener('click', (e) => {
      const useBtn = e.target.closest('[data-use-image]');
      if (!useBtn) return;
      const imgName = useBtn.getAttribute('data-use-image');
      const p = getActiveProject();
      if (p && imgName) {
        p.primaryImage = imgName;
        p.slices.forEach((s) => (s.src = imgName));
        selectProject(activeProjectIndex);
        markUnsaved();
        mediaModal?.classList.remove('open');
        showToast(`Immagine "${imgName}" applicata a ${p.title}!`);
      }
    });

    // 11. Salvataggio, Esportazione e GitHub Push
    document.getElementById('btn-save-all')?.addEventListener('click', saveAllProjects);
    document.getElementById('btn-export-js')?.addEventListener('click', downloadProjectsDataJS);
    document.getElementById('btn-git-push')?.addEventListener('click', pushToGitHub);

    // Scorciatoia da tastiera Cmd+S / Ctrl+S
    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        saveAllProjects();
      }
    });
  }

  // Avvio al DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    detectBackendAndLoad();
  });
})();
