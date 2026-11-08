/**
 * NICOLA VIANELLO — INTERACTIVE CURATORIAL PORTFOLIO ENGINE (app.js)
 * Vanilla ES6 + Lenis Smooth Scroll + GSAP (Core, ScrollTrigger, Flip)
 */

(function () {
  'use strict';

  const categories = window.PORTFOLIO_CATEGORIES || [];
  const projects = window.PORTFOLIO_DATA || [];

  let lenis = null;
  let activeCategory = 'all';
  let scrollVelocity = 0;

  // =========================================================================
  // 1. RENDERING DELLE BARRE DI FILTRO E DOCK LATERALE "THUMB-INDEX"
  // =========================================================================
  function getCategoryCount(catId) {
    if (catId === 'all') return projects.length;
    return projects.filter((p) => p.category === catId).length;
  }

  function renderCategoryNavs() {
    const heroFilterBar = document.getElementById('hero-filter-bar');
    const dockTabs = document.getElementById('dock-tabs');

    if (heroFilterBar) {
      heroFilterBar.innerHTML = categories
        .map((cat) => {
          const count = getCategoryCount(cat.id);
          return `
            <button class="filter-pill-btn ${cat.id === 'all' ? 'active' : ''}"
                    data-filter="${cat.id}"
                    role="tab"
                    aria-selected="${cat.id === 'all'}">
              <div class="pill-top">
                <span>${cat.code} // SYS</span>
                <span>[${count}]</span>
              </div>
              <div class="pill-title">${cat.shortLabel.replace(/^\d+\s*\/\/\s*/, '')}</div>
            </button>
          `;
        })
        .join('');
    }

    if (dockTabs) {
      dockTabs.innerHTML = categories
        .map((cat) => {
          const count = getCategoryCount(cat.id);
          return `
            <button class="dock-tab ${cat.id === 'all' ? 'active' : ''}"
                    data-filter="${cat.id}"
                    style="--tab-accent: ${cat.accent}"
                    title="${cat.fullLabel} (${count} progetti)">
              <span>${cat.shortLabel} (${count})</span>
            </button>
          `;
        })
        .join('');
    }
  }

  // =========================================================================
  // 2. RENDERING DELL'INDICE RAGIONATO INTERATTIVO (25 PROGETTI A + B)
  // =========================================================================
  function getMockupBadgeLabel(type) {
    const map = {
      'poster-3d': '3D POSTER FRAME',
      'brand-bento': 'COTTON DEBOSS + BENTO',
      'browser-kiosk': 'DARK GLASS UI + TOTEM',
      'editorial-spread': '3D BOOK SPREAD',
      'packaging-lineup': 'HORIZONTAL PIN LINEUP'
    };
    return map[type] || 'SMART-SLICE';
  }

  function renderIndexTable() {
    const container = document.getElementById('index-rows-container');
    if (!container) return;

    container.innerHTML = projects
      .map((p) => {
        const previewPos = p.slices && p.slices[0] ? p.slices[0].pos : '50% 20%';
        return `
          <div class="index-row"
               data-id="${p.id}"
               data-category="${p.category}"
               data-preview-src="${p.primaryImage}"
               data-preview-pos="${previewPos}"
               data-preview-code="${p.code}"
               data-preview-cat="${p.categoryLabel}"
               data-preview-c1="${p.itten.primary}"
               data-preview-c2="${p.itten.secondary}"
               data-preview-contrast="${p.itten.contrastType}"
               style="--row-bg: ${p.itten.bg}; --row-text: ${p.itten.text}; --row-accent: ${p.itten.accent};">
            <span class="col-seq">${p.sequenceNum}</span>
            <span class="col-code">${p.code}</span>
            <div class="col-title">
              <strong>${p.title}</strong>
              <small>${p.subtitle}</small>
            </div>
            <span class="col-cat">${p.categoryLabel}</span>
            <div class="col-itten">
              <span class="swatch-dot" style="background:${p.itten.primary}"></span>
              <span class="swatch-dot" style="background:${p.itten.secondary}"></span>
              <span>${p.itten.primaryName}</span>
            </div>
            <div class="col-mockup">
              <span>${getMockupBadgeLabel(p.mockupType)}</span>
            </div>
            <span class="col-action">ESPLORA →</span>
          </div>
        `;
      })
      .join('');
  }

  // =========================================================================
  // 3. GENERAZIONE DEI COMPONENTI CHIRURGICI (SMART-SLICES & 3D CSS MOCKUPS)
  // =========================================================================

  /**
   * Crea una singola finestra di ritaglio (.viewport-slice)
   */
  function buildSliceHTML(project, slice, index, extraClass = '') {
    const pos = slice.pos || '50% 50%';
    const scale = slice.scale || 1;
    const aspect = slice.aspect || '16 / 10';
    const speed = slice.speed || 1.0;

    return `
      <figure class="viewport-slice ${extraClass}"
              data-project-id="${project.id}"
              data-slice-src="${slice.src}"
              data-slice-pos="${pos}"
              data-speed="${speed}"
              style="--slice-pos: ${pos}; --slice-scale: ${scale};">
        <div class="slice-media-frame" style="aspect-ratio: ${aspect};">
          <img src="${slice.src}" alt="${project.title} — ${slice.label}" loading="lazy">
        </div>
        <figcaption class="slice-caption-bar">
          <span>${slice.label}</span>
          <span class="slice-zoom-badge">[ FULL BOARD ↗ ]</span>
        </figcaption>
      </figure>
    `;
  }

  /**
   * Generatore Onda Sonora SVG Reattiva per progetti Musica/Techno (MOTM, Blue Bee)
   */
  function buildSoundwaveHTML(project) {
    if (project.specialInteraction !== 'soundwave-reactive') return '';
    const barsCount = 48;
    let rects = '';
    for (let i = 0; i < barsCount; i++) {
      const x = (i / barsCount) * 100;
      const baseH = 18 + Math.sin(i * 0.45) * 12 + (i % 3) * 4;
      rects += `<rect class="wave-bar" data-idx="${i}" x="${x}%" y="${50 - baseH / 2}%" width="1.1%" height="${baseH}%" rx="1"></rect>`;
    }

    return `
      <div class="soundwave-bar" data-soundwave="${project.id}">
        <div class="soundwave-meta">
          <span>◈ AUDIO-VISUAL TELEMETRY // SCROLL-REACTIVE SYNTH WAVEFORM</span>
        </div>
        <svg class="soundwave-svg" viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true">
          ${rects}
        </svg>
        <div class="soundwave-meta">
          <span>FREQ: 128 BPM // ANALOG SAW</span>
        </div>
      </div>
    `;
  }

  /**
   * ARCHETIPO 1: POSTER FRAME 3D INTERATTIVO + STICKY HERO (FASE 3 + FASE 4)
   */
  function buildPoster3DLayout(project) {
    const heroSlice = project.slices[0];
    const detailSlices = project.slices.slice(1);

    return `
      <div class="venetian-sticky-layout">
        <!-- Colonna Sticky Hero con Poster Frame 3D in puro CSS -->
        <div class="sticky-hero-col">
          <div class="poster-3d-stage">
            <div class="poster-3d-card tilt-3d-target"
                 data-project-id="${project.id}"
                 data-slice-src="${heroSlice.src}"
                 data-slice-pos="${heroSlice.pos}">
              <div class="metal-clip clip-left"></div>
              <div class="metal-clip clip-right"></div>
              <div class="poster-paper-overlay"></div>
              <div class="poster-glare"></div>

              <div class="slice-media-frame" style="aspect-ratio: ${heroSlice.aspect || '3 / 4.1'};">
                <img src="${heroSlice.src}"
                     alt="${project.title} Poster 3D"
                     style="--slice-pos: ${heroSlice.pos}; --slice-scale: ${heroSlice.scale || 1};"
                     loading="lazy">
              </div>

              <div class="slice-caption-bar">
                <span>${heroSlice.label}</span>
                <span class="slice-zoom-badge">[ 3D TILT + LIGHTBOX ↗ ]</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Colonna Destra: Esplosi e Dettagli con Parallasse Differenziato -->
        <div class="scrolling-details-col">
          ${detailSlices.map((s, idx) => buildSliceHTML(project, s, idx + 1)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * ARCHETIPO 2: BRAND SYSTEM BENTO SHOWCASE (Biglietto Carta Cotone Deboss + Brand Guidelines Card Live)
   */
  function buildBrandBentoLayout(project) {
    const heroSlice = project.slices[0];
    const spans = ['slice-span-7', 'slice-span-5', 'slice-span-6', 'slice-span-6'];

    return `
      <div class="brand-bento-layout">
        <!-- Riga Chirurgica in Codice: Biglietto Carta Cotone 600g + Brand Guidelines Card -->
        <div class="brand-surgical-row">
          <!-- Mockup 1: Biglietto da Visita in Carta Cotone con Effetto Deboss -->
          <div class="cotton-card-showcase">
            <div class="guidelines-header" style="color: currentColor; border-color: rgba(128,128,128,0.3);">
              <span>MOCKUP IN CODICE 01 // CARTA COTONE 600G DEBOSS</span>
              <span>3D TILT ACTIVE</span>
            </div>

            <div class="cotton-card-stage">
              <div class="cotton-business-card tilt-3d-target"
                   data-project-id="${project.id}"
                   data-slice-src="${project.primaryImage}"
                   data-slice-pos="${heroSlice.pos}">
                <div class="cotton-card-top">
                  <span>${project.code} // OFFICIAL IDENTITY</span>
                  <span>FEDRIGONI COTTON 600GSM</span>
                </div>

                <div class="cotton-logo-deboss">
                  <img src="${heroSlice.src}"
                       alt="${project.title} Logo Deboss"
                       style="object-position: ${heroSlice.pos};">
                </div>

                <div class="cotton-card-bottom">
                  <div>
                    <div class="cotton-deboss-title">${project.title}</div>
                    <span style="font-size:8.5px; color:#555;">${project.client}</span>
                  </div>
                  <span style="font-weight:600; color:${project.itten.primary};">NICOLA VIANELLO STUDIO</span>
                </div>
              </div>
            </div>

            <div style="font-family: var(--font-mono); font-size: 10px; opacity: 0.75; margin-top: 12px;">
              Simulazione CSS3 di impressione tipografica a secco (Letterpress Deboss) su fibra di cotone naturale.
            </div>
          </div>

          <!-- Mockup 2: Brand Guidelines Card Generata in Codice (Pantone Swatches + Live Type) -->
          <div class="brand-guidelines-card">
            <div class="guidelines-header">
              <span>MOCKUP IN CODICE 02 // BRAND GUIDELINES SPECIMEN</span>
              <span style="color: var(--project-accent);">${project.code} SYSTEM</span>
            </div>

            <div class="pantone-swatches-row">
              <div class="pantone-chip">
                <div class="pantone-color-block" style="background: ${project.itten.primary};"></div>
                <div class="pantone-meta">
                  <strong>PANTONE PRIMARY</strong>
                  <span>${project.itten.primary} // ${project.itten.primaryName.slice(0, 16)}</span>
                </div>
              </div>
              <div class="pantone-chip">
                <div class="pantone-color-block" style="background: ${project.itten.secondary};"></div>
                <div class="pantone-meta">
                  <strong>ITTEN COMPLEMENT</strong>
                  <span>${project.itten.secondary} // ${project.itten.secondaryName.slice(0, 16)}</span>
                </div>
              </div>
              <div class="pantone-chip">
                <div class="pantone-color-block" style="background: ${project.itten.bg};"></div>
                <div class="pantone-meta">
                  <strong>SURFACE FIELD</strong>
                  <span>${project.itten.bg} // AMBIENT BASE</span>
                </div>
              </div>
            </div>

            <div class="live-type-specimen">
              <div class="specimen-glyph">Aa</div>
              <div class="specimen-details">
                <div><strong>GERARCHIA TIPOGRAFICA:</strong> ${project.fonts.pairingName}</div>
                <div class="specimen-alphabet">ABCDEFGHIJKLMNOPQRSTUVWXYZ // 0123456789</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bento Grid Asimmetrica delle Viewport Slices -->
        <div class="bento-slices-grid">
          ${project.slices
            .map((s, idx) => buildSliceHTML(project, s, idx, spans[idx % spans.length]))
            .join('')}
        </div>
      </div>
    `;
  }

  /**
   * ARCHETIPO 3: MINIMAL DARK GLASS BROWSER FRAME + 3D TOTEM KIOSK (Digital / Web UI)
   */
  function buildBrowserKioskLayout(project) {
    const heroSlice = project.slices[0];
    const totemSlice = project.slices[project.slices.length - 1];
    const slug = project.id.replace(/-/g, '');
    const spans = ['slice-span-6', 'slice-span-6', 'slice-span-6', 'slice-span-6'];

    return `
      <div class="digital-showcase-wrapper">
        <div class="digital-showcase-grid">
          <!-- Minimal Dark Glass Browser Frame con Auto-Scroll all'Hover -->
          <div class="dark-glass-browser"
               data-project-id="${project.id}"
               data-slice-src="${project.primaryImage}"
               data-slice-pos="50% 0%">
            <div class="browser-toolbar">
              <div class="browser-dots">
                <span></span><span></span><span></span>
              </div>
              <div class="browser-url-bar">https://www.${slug}.com // interactive-showcase</div>
              <div class="browser-status">● 1440PX // AUTO-SCROLL HOVER</div>
            </div>
            <div class="browser-viewport">
              <img src="${project.primaryImage}" alt="${project.title} Full Web Layout" loading="lazy">
              <div class="browser-hover-pill">PASSA IL MOUSE PER SCORRERE IL SITO // CLICCA PER PAN &amp; ZOOM ↗</div>
            </div>
          </div>

          <!-- Totem Kiosk 3D Inclinato nello Spazio -->
          <div class="totem-kiosk-stage">
            <div class="totem-kiosk-3d"
                 data-project-id="${project.id}"
                 data-slice-src="${totemSlice.src}"
                 data-slice-pos="${totemSlice.pos}">
              <img src="${totemSlice.src}" alt="${project.title} Totem Kiosk View" loading="lazy">
              <div class="slice-caption-bar" style="position:absolute; bottom:0; left:0; right:0;">
                <span>3D KIOSK / MOBILE TOTEM</span>
                <span class="slice-zoom-badge">[ ZOOM ↗ ]</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Finestre di Approfondimento Smart-Slicing -->
        <div class="bento-slices-grid">
          ${project.slices
            .map((s, idx) => buildSliceHTML(project, s, idx, spans[idx % spans.length]))
            .join('')}
        </div>
      </div>
    `;
  }

  /**
   * ARCHETIPO 4: EDITORIAL BOOK SPREAD 3D (Spine-Shadow + Apertura Pagina Prospettica)
   */
  function buildEditorialSpreadLayout(project) {
    const leftSlice = project.slices[0];
    const rightSlice = project.slices[1] || project.slices[0];
    const remaining = project.slices.slice(2);

    return `
      <div class="editorial-layout-wrapper">
        <!-- Doppia Pagina Aperta 3D con Ombra di Rilegatura Centrale (Spine-Shadow) -->
        <div class="editorial-spread-stage">
          <div class="book-spread-3d">
            <div class="book-page-left">
              ${buildSliceHTML(project, leftSlice, 0)}
            </div>
            <div class="book-page-right">
              ${buildSliceHTML(project, rightSlice, 1)}
            </div>
          </div>
        </div>

        <!-- Ulteriori Tavole e Dettagli Macro -->
        <div class="bento-slices-grid">
          ${remaining
            .map((s, idx) => buildSliceHTML(project, s, idx + 2, 'slice-span-6'))
            .join('')}
        </div>
      </div>
    `;
  }

  /**
   * ARCHETIPO 5: PACKAGING & WINE LINEUP — HORIZONTAL SCROLL PIN SHOWCASE
   */
  function buildPackagingPinLayout(project) {
    return `
      <div class="packaging-pin-wrapper" data-pin-section="${project.id}">
        <div class="packaging-track-controls">
          <span>↔ GALLERIA ORIZZONTALE DI LINEA // SCORRI O USA I CONTROLLI PER ESPLORARE LE VARIANTI</span>
          <div class="track-nav-btns">
            <button class="track-btn" data-track-dir="-1" data-target-track="track-${project.id}">← PREC</button>
            <button class="track-btn" data-track-dir="1" data-target-track="track-${project.id}">SUCC →</button>
          </div>
        </div>

        <div class="horizontal-pin-track" id="track-${project.id}">
          ${project.slices
            .map(
              (s, idx) => `
              <div class="horizontal-pin-card">
                ${buildSliceHTML(project, s, idx)}
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 4. RENDERING DELLO STREAM COMPLETO DEI 25 PROGETTI
  // =========================================================================
  function renderProjectsStream() {
    const stream = document.getElementById('projects-stream');
    if (!stream) return;

    stream.innerHTML = projects
      .map((p) => {
        let archetypeHTML = '';
        if (p.mockupType === 'poster-3d') {
          archetypeHTML = buildPoster3DLayout(p);
        } else if (p.mockupType === 'brand-bento') {
          archetypeHTML = buildBrandBentoLayout(p);
        } else if (p.mockupType === 'browser-kiosk') {
          archetypeHTML = buildBrowserKioskLayout(p);
        } else if (p.mockupType === 'editorial-spread') {
          archetypeHTML = buildEditorialSpreadLayout(p);
        } else if (p.mockupType === 'packaging-lineup') {
          archetypeHTML = buildPackagingPinLayout(p);
        } else {
          archetypeHTML = buildPoster3DLayout(p);
        }

        const soundwaveHTML = buildSoundwaveHTML(p);
        const interactionClass = `interaction-${p.specialInteraction || 'standard'}`;
        const scrambleAttr =
          p.specialInteraction === 'glitch-rgb' || p.specialInteraction === 'soundwave-reactive'
            ? `data-scramble="${p.title}"`
            : '';

        return `
          <article class="project-section ${interactionClass}"
                   id="project-${p.id}"
                   data-id="${p.id}"
                   data-code="${p.code}"
                   data-category="${p.category}"
                   data-bg="${p.itten.bg}"
                   data-text="${p.itten.text}"
                   data-accent="${p.itten.accent}"
                   data-c1="${p.itten.primary}"
                   data-c2="${p.itten.secondary}"
                   data-contrast="${p.itten.contrastType}"
                   style="--project-font-display: ${p.fonts.display};
                          --project-font-body: ${p.fonts.body};
                          --project-accent: ${p.itten.accent};
                          background-color: ${p.itten.bg};
                          color: ${p.itten.text};">
            <div class="section-container">
              <!-- Running Header Architettonico -->
              <div class="project-running-head">
                <div class="head-left">
                  <span class="seq-pill">OPERA ${p.sequenceNum} / 25</span>
                  <span>COD. ARCHIVIO: ${p.code}</span>
                  <span>${p.categoryLabel}</span>
                </div>
                <div class="head-right">
                  <span>TYPOGRAPHY: ${p.fonts.pairingName}</span>
                  <span> // ${p.year}</span>
                </div>
              </div>

              <!-- Intro: Titolo Monumentale + Scheda Curatoriale + Griglia di Itten -->
              <div class="project-intro-grid">
                <div class="project-title-col">
                  <div class="project-itten-badge">
                    <span class="swatch-dot" style="background: ${p.itten.primary};"></span>
                    <span class="swatch-dot" style="background: ${p.itten.secondary};"></span>
                    <span>${p.itten.contrastType}</span>
                  </div>
                  <h2 class="project-display-title" ${scrambleAttr}>${p.title}</h2>
                  <p class="project-subtitle">${p.subtitle}</p>
                </div>

                <div class="project-curatorial-panel">
                  <p class="project-copy">${p.curatorialCopy}</p>

                  <div class="project-specs-grid">
                    ${p.specs
                      .map(
                        (sp) => `
                        <div class="spec-cell">
                          <span>${sp.label}</span>
                          <strong>${sp.value}</strong>
                        </div>
                      `
                      )
                      .join('')}
                  </div>

                  <div class="itten-director-note">
                    <div>
                      <strong style="font-family:var(--font-mono); font-size:10.5px; color:var(--project-accent); display:block; margin-bottom:2px;">
                        NOTA CROMATICA DI ITTEN //
                      </strong>
                      <span>${p.itten.note}</span>
                    </div>
                    <button class="btn-fullboard"
                            data-open-lightbox="${p.id}"
                            data-slice-src="${p.primaryImage}"
                            data-slice-pos="50% 0%">
                      <span>TAVOLA INTEGRALE [PAN/ZOOM]</span>
                      <span>↗</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Eventuale Visualizzatore Onda Sonora Reattivo -->
              ${soundwaveHTML}

              <!-- Layout Specifico con Smart-Slicing e Mockup 3D in Codice -->
              ${archetypeHTML}
            </div>
          </article>
        `;
      })
      .join('');
  }

  // =========================================================================
  // 5. LENIS SMOOTH SCROLL + GSAP SCROLLTRIGGER CHAMELEON ENGINE
  // =========================================================================
  function initSmoothScrollAndGSAP() {
    gsap.registerPlugin(ScrollTrigger, Flip);

    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });

      lenis.on('scroll', (e) => {
        ScrollTrigger.update();
        scrollVelocity = Math.min(Math.abs(e.velocity || 0), 40);
        updateSoundwavesOnScroll(scrollVelocity);
        updateDockProgress(e.progress || 0);
      });

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      window.addEventListener('scroll', () => {
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        const prog = docH > 0 ? window.scrollY / docH : 0;
        updateDockProgress(prog);
      });
    }

    initChameleonScrollTriggers();
    initParallaxAndBookAnimations();
  }

  function updateDockProgress(progress) {
    const bar = document.getElementById('dock-progress-bar');
    if (bar) {
      bar.style.height = `${(progress * 100).toFixed(1)}%`;
    }
  }

  /**
   * Aggiorna il tema Chameleon globale e la barra HUD di Itten
   */
  function activateSectionTheme(el) {
    if (!el) return;
    const bg = el.getAttribute('data-bg') || '#0D0D0D';
    const text = el.getAttribute('data-text') || '#FFFFFF';
    const accent = el.getAttribute('data-accent') || '#E5FF00';
    const code = el.getAttribute('data-code') || 'ARCHIVE';
    const c1 = el.getAttribute('data-c1') || accent;
    const c2 = el.getAttribute('data-c2') || bg;
    const contrast = el.getAttribute('data-contrast') || 'SISTEMA CROMATICO DI ITTEN';
    const cat = el.getAttribute('data-category');

    const root = document.documentElement;
    root.style.setProperty('--active-bg', bg);
    root.style.setProperty('--active-text', text);
    root.style.setProperty('--active-accent', accent);

    const hudCode = document.getElementById('hud-project-code');
    const hudS1 = document.getElementById('hud-swatch-1');
    const hudS2 = document.getElementById('hud-swatch-2');
    const hudContrast = document.getElementById('hud-itten-contrast');

    if (hudCode) hudCode.textContent = code;
    if (hudS1) hudS1.style.backgroundColor = c1;
    if (hudS2) hudS2.style.backgroundColor = c2;
    if (hudContrast) hudContrast.textContent = contrast;

    // Evidenzia la tacca corrispondente nella Dock se siamo in vista 'all'
    if (cat && activeCategory === 'all') {
      document.querySelectorAll('.dock-tab').forEach((tab) => {
        const isMatch = tab.getAttribute('data-filter') === cat;
        tab.classList.toggle('active', isMatch);
      });
    }
  }

  function initChameleonScrollTriggers() {
    const sections = document.querySelectorAll('#hero, #curatorial-index, .project-section, #colophon');
    sections.forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => activateSectionTheme(sec),
        onEnterBack: () => activateSectionTheme(sec)
      });
    });

    // Text Scramble quando i titoli entrano nella viewport
    document.querySelectorAll('[data-scramble]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => scrambleTextElement(el)
      });
    });
  }

  function initParallaxAndBookAnimations() {
    // Apertura prospettica delle doppie pagine editoriali (.book-spread-3d)
    document.querySelectorAll('.book-spread-3d').forEach((spread) => {
      const leftPage = spread.querySelector('.book-page-left');
      const rightPage = spread.querySelector('.book-page-right');
      if (leftPage && rightPage) {
        gsap.fromTo(
          leftPage,
          { rotateY: 18, opacity: 0.85 },
          {
            rotateY: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: spread,
              start: 'top 85%',
              end: 'top 35%',
              scrub: true
            }
          }
        );
        gsap.fromTo(
          rightPage,
          { rotateY: -18, opacity: 0.85 },
          {
            rotateY: 0,
            opacity: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: spread,
              start: 'top 85%',
              end: 'top 35%',
              scrub: true
            }
          }
        );
      }
    });

    // Parallasse differenziato sulle finestre .viewport-slice
    document.querySelectorAll('.viewport-slice').forEach((slice) => {
      const speed = parseFloat(slice.getAttribute('data-speed') || '1');
      if (Math.abs(speed - 1) > 0.02 && !slice.closest('.horizontal-pin-track')) {
        const yOffset = (1 - speed) * 140;
        gsap.fromTo(
          slice,
          { y: -yOffset * 0.5 },
          {
            y: yOffset * 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: slice,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );
      }
    });

    // Horizontal Scroll Pin per le sezioni Packaging / Wine (La Caneva, Edonè, Bottega Sicula)
    ScrollTrigger.matchMedia({
      '(min-width: 901px)': function () {
        document.querySelectorAll('.packaging-pin-wrapper').forEach((wrapper) => {
          const track = wrapper.querySelector('.horizontal-pin-track');
          if (!track) return;

          const getScrollAmount = () => {
            const totalW = track.scrollWidth;
            const viewW = wrapper.clientWidth;
            return Math.max(0, totalW - viewW + 24);
          };

          gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: wrapper,
              start: 'top 16%',
              end: () => `+=${Math.max(420, getScrollAmount())}`,
              pin: true,
              scrub: 0.75,
              invalidateOnRefresh: true
            }
          });
        });
      }
    });
  }

  // =========================================================================
  // 6. MICRO-INTERAZIONI TEMATICHE: TEXT SCRAMBLE, SOUNDWAVE, TILT 3D
  // =========================================================================
  const SCRAMBLE_CHARS = '01/#%&*+=<>[]_—█▒░';

  function scrambleTextElement(el) {
    if (!el || el.dataset.scrambling === 'true') return;
    const original = el.getAttribute('data-scramble') || el.textContent;
    el.dataset.scrambling = 'true';

    let iteration = 0;
    const maxIterations = original.length;
    const interval = setInterval(() => {
      el.textContent = original
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (index < iteration) return original[index];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join('');

      iteration += 0.6;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        el.textContent = original;
        el.dataset.scrambling = 'false';
      }
    }, 28);
  }

  function updateSoundwavesOnScroll(velocity) {
    const bars = document.querySelectorAll('.soundwave-svg .wave-bar');
    if (!bars.length) return;
    const time = performance.now() * 0.006;
    const boost = 1 + velocity * 0.12;

    bars.forEach((bar) => {
      const idx = parseInt(bar.getAttribute('data-idx') || '0', 10);
      const scaleY = Math.max(0.25, Math.min(2.6, (0.6 + Math.sin(time + idx * 0.55) * 0.5) * boost));
      bar.style.transform = `scaleY(${scaleY.toFixed(2)})`;
    });
  }

  /**
   * Effetto Tilt 3D (perspective + rotateX/rotateY) e Glare dinamico
   */
  function init3DTiltMockups() {
    document.addEventListener('mousemove', (e) => {
      const target = e.target.closest('.tilt-3d-target');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;

      const rotateY = (relX - 0.5) * 16;
      const rotateX = (0.5 - relY) * 16;

      target.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      target.style.setProperty('--glare-x', `${(relX * 100).toFixed(1)}%`);
      target.style.setProperty('--glare-y', `${(relY * 100).toFixed(1)}%`);
    });

    document.querySelectorAll('.tilt-3d-target').forEach((card) => {
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Hover Text Scramble sui titoli glitch/soundwave
    document.querySelectorAll('[data-scramble]').forEach((el) => {
      el.addEventListener('mouseenter', () => scrambleTextElement(el));
    });
  }

  // =========================================================================
  // 7. ANTEPRIMA FLOTTANTE DELL'INDICE & CURSORE MAGNETICO
  // =========================================================================
  function initCursorAndIndexPreview() {
    const cursor = document.getElementById('custom-cursor');
    const preview = document.getElementById('index-floating-preview');
    const previewImg = document.getElementById('preview-img');
    const previewCode = document.getElementById('preview-code');
    const previewCat = document.getElementById('preview-cat');
    const dot1 = document.getElementById('preview-itten-dot-1');
    const dot2 = document.getElementById('preview-itten-dot-2');
    const previewLabel = document.getElementById('preview-itten-label');

    window.addEventListener('mousemove', (e) => {
      if (cursor) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.14,
          ease: 'power2.out'
        });
      }
      if (preview && preview.classList.contains('visible')) {
        const xPos = Math.min(window.innerWidth - 340, e.clientX + 28);
        const yPos = Math.min(window.innerHeight - 160, Math.max(160, e.clientY));
        gsap.to(preview, {
          x: xPos,
          y: yPos,
          duration: 0.28,
          ease: 'power3.out'
        });
      }
    });

    // Espansione cursore sugli elementi cliccabili / zoomabili
    document.addEventListener('mouseover', (e) => {
      if (!cursor) return;
      const zoomable = e.target.closest(
        '.viewport-slice, .poster-3d-card, .cotton-business-card, .dark-glass-browser, .totem-kiosk-3d'
      );
      cursor.classList.toggle('is-expanded', Boolean(zoomable));
    });

    // Righe dell'Indice Ragionato
    const rows = document.querySelectorAll('.index-row');
    rows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        if (!preview) return;
        const src = row.getAttribute('data-preview-src');
        const pos = row.getAttribute('data-preview-pos') || '50% 20%';
        if (previewImg) {
          previewImg.src = src;
          previewImg.style.objectPosition = pos;
        }
        if (previewCode) previewCode.textContent = row.getAttribute('data-preview-code');
        if (previewCat) previewCat.textContent = row.getAttribute('data-preview-cat');
        if (dot1) dot1.style.backgroundColor = row.getAttribute('data-preview-c1');
        if (dot2) dot2.style.backgroundColor = row.getAttribute('data-preview-c2');
        if (previewLabel) previewLabel.textContent = row.getAttribute('data-preview-contrast');
        preview.classList.add('visible');
      });

      row.addEventListener('mouseleave', () => {
        if (preview) preview.classList.remove('visible');
      });

      row.addEventListener('click', () => {
        if (preview) preview.classList.remove('visible');
        const projId = row.getAttribute('data-id');
        const targetEl = document.getElementById(`project-${projId}`);
        if (targetEl) {
          scrollToElement(targetEl);
        }
      });
    });
  }

  // =========================================================================
  // 8. FILTRI DI CATEGORIA CON GSAP FLIP
  // =========================================================================
  function filterPortfolioByCategory(catId) {
    activeCategory = catId;

    // Aggiorna stato pulsanti Hero e Dock
    document.querySelectorAll('[data-filter]').forEach((btn) => {
      const isMatch = btn.getAttribute('data-filter') === catId;
      btn.classList.toggle('active', isMatch);
      if (btn.hasAttribute('aria-selected')) {
        btn.setAttribute('aria-selected', String(isMatch));
      }
    });

    const rows = gsap.utils.toArray('.index-row');
    const sections = gsap.utils.toArray('.project-section');

    // Stato GSAP Flip sulle righe dell'indice
    const rowState = typeof Flip !== 'undefined' ? Flip.getState(rows) : null;

    let visibleCount = 0;
    rows.forEach((row) => {
      const match = catId === 'all' || row.getAttribute('data-category') === catId;
      row.style.display = match ? 'grid' : 'none';
      if (match) visibleCount++;
    });

    sections.forEach((sec) => {
      const match = catId === 'all' || sec.getAttribute('data-category') === catId;
      sec.style.display = match ? 'block' : 'none';
    });

    const badge = document.getElementById('active-filter-count');
    if (badge) {
      badge.textContent = `MOSTRANDO ${visibleCount} / ${projects.length} PROGETTI`;
    }

    if (rowState) {
      Flip.from(rowState, {
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.015,
        simple: true
      });
    }

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }

  // =========================================================================
  // 9. FULL-BOARD HIGH-RESOLUTION LIGHTBOX (PAN & ZOOM LIBERO)
  // =========================================================================
  const lbState = {
    isOpen: false,
    scale: 1,
    x: 0,
    y: 0,
    isDragging: false,
    startX: 0,
    startY: 0
  };

  function applyLightboxTransform() {
    const stage = document.getElementById('lb-stage');
    const readout = document.getElementById('lb-zoom-readout');
    if (stage) {
      stage.style.transform = `translate3d(${lbState.x}px, ${lbState.y}px, 0) scale(${lbState.scale})`;
    }
    if (readout) {
      readout.textContent = `${Math.round(lbState.scale * 100)}%`;
    }
  }

  function jumpToBoardPercentage(pct) {
    const img = document.getElementById('lb-image');
    const viewport = document.getElementById('lb-viewport');
    if (!img || !viewport) return;

    const imgH = img.offsetHeight * lbState.scale;
    const viewH = viewport.clientHeight;
    const maxScroll = Math.max(0, imgH - viewH + 80);
    lbState.x = 0;
    lbState.y = -maxScroll * pct;
    applyLightboxTransform();
  }

  function openLightbox(projectId, imageSrc, slicePosString) {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('lightbox-modal');
    const lbImg = document.getElementById('lb-image');
    const lbCode = document.getElementById('lb-code');
    const lbTitle = document.getElementById('lb-title');
    const lbCat = document.getElementById('lb-cat');
    const lbCopy = document.getElementById('lb-copy');
    const lbS1 = document.getElementById('lb-swatch-primary');
    const lbS2 = document.getElementById('lb-swatch-secondary');
    const lbContrastType = document.getElementById('lb-contrast-type');
    const lbContrastNote = document.getElementById('lb-contrast-note');
    const lbSlicesList = document.getElementById('lb-slices-list');

    if (lbCode) lbCode.textContent = project.code;
    if (lbTitle) lbTitle.textContent = project.title;
    if (lbCat) lbCat.textContent = project.categoryLabel;
    if (lbCopy) lbCopy.textContent = project.curatorialCopy;
    if (lbS1) lbS1.style.backgroundColor = project.itten.primary;
    if (lbS2) lbS2.style.backgroundColor = project.itten.secondary;
    if (lbContrastType) lbContrastType.textContent = project.itten.contrastType;
    if (lbContrastNote) lbContrastNote.textContent = project.itten.note;

    // Popola i pulsanti rapidi dei ritagli nella sidebar
    if (lbSlicesList) {
      lbSlicesList.innerHTML = project.slices
        .map((s) => {
          const yMatch = (s.pos || '50% 0%').match(/(\d+(?:\.\d+)?)%\s*$/);
          const yPct = yMatch ? parseFloat(yMatch[1]) / 100 : 0;
          return `
            <button class="lb-slice-jump-btn"
                    data-jump-src="${s.src}"
                    data-jump-pct="${yPct}">
              ${s.label}
            </button>
          `;
        })
        .join('');
    }

    lbState.scale = 1;
    lbState.x = 0;
    lbState.y = 0;

    // Calcola la percentuale verticale iniziale dalla stringa object-position (es. "50% 60%")
    let initialPct = 0;
    if (slicePosString) {
      const match = slicePosString.match(/(\d+(?:\.\d+)?)%\s*$/);
      if (match) initialPct = parseFloat(match[1]) / 100;
    }

    if (lbImg) {
      lbImg.onload = () => {
        jumpToBoardPercentage(initialPct);
      };
      lbImg.src = imageSrc || project.primaryImage;
    }

    if (modal) {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
    }
    lbState.isOpen = true;
    if (lenis) lenis.stop();
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
    lbState.isOpen = false;
    if (lenis) lenis.start();
  }

  function initLightboxEvents() {
    const viewport = document.getElementById('lb-viewport');
    const closeBtn = document.getElementById('lb-close-btn');
    const backdrop = document.getElementById('lightbox-backdrop');

    // Apertura cliccando su qualsiasi .viewport-slice o mockup 3D
    document.addEventListener('click', (e) => {
      const sliceTrigger = e.target.closest(
        '.viewport-slice, .poster-3d-card, .cotton-business-card, .dark-glass-browser, .totem-kiosk-3d, [data-open-lightbox]'
      );
      if (sliceTrigger) {
        const projId =
          sliceTrigger.getAttribute('data-project-id') ||
          sliceTrigger.getAttribute('data-open-lightbox');
        const src = sliceTrigger.getAttribute('data-slice-src');
        const pos = sliceTrigger.getAttribute('data-slice-pos');
        if (projId) {
          openLightbox(projId, src, pos);
        }
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lbState.isOpen) {
        closeLightbox();
      }
    });

    // Zoom Controls
    const zoomIn = document.getElementById('lb-zoom-in');
    const zoomOut = document.getElementById('lb-zoom-out');
    const zoomFit = document.getElementById('lb-zoom-fit');
    const zoomReset = document.getElementById('lb-zoom-reset');

    if (zoomIn) {
      zoomIn.addEventListener('click', () => {
        lbState.scale = Math.min(4, lbState.scale + 0.35);
        applyLightboxTransform();
      });
    }
    if (zoomOut) {
      zoomOut.addEventListener('click', () => {
        lbState.scale = Math.max(0.4, lbState.scale - 0.35);
        applyLightboxTransform();
      });
    }
    if (zoomFit) {
      zoomFit.addEventListener('click', () => {
        lbState.scale = 1;
        lbState.x = 0;
        applyLightboxTransform();
      });
    }
    if (zoomReset) {
      zoomReset.addEventListener('click', () => {
        lbState.scale = 1;
        lbState.x = 0;
        lbState.y = 0;
        applyLightboxTransform();
      });
    }

    // Pulsanti di salto rapido (TOP / MID / BOTTOM)
    document.querySelectorAll('[data-lb-jump]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const pct = parseFloat(btn.getAttribute('data-lb-jump') || '0');
        jumpToBoardPercentage(pct);
      });
    });

    // Salto rapido dalla lista delle slices nella sidebar del Lightbox
    const slicesList = document.getElementById('lb-slices-list');
    if (slicesList) {
      slicesList.addEventListener('click', (e) => {
        const btn = e.target.closest('.lb-slice-jump-btn');
        if (!btn) return;
        const src = btn.getAttribute('data-jump-src');
        const pct = parseFloat(btn.getAttribute('data-jump-pct') || '0');
        const lbImg = document.getElementById('lb-image');
        if (lbImg && src && !lbImg.src.endsWith(encodeURI(src))) {
          lbImg.onload = () => jumpToBoardPercentage(pct);
          lbImg.src = src;
        } else {
          jumpToBoardPercentage(pct);
        }
      });
    }

    // Pan & Wheel Zoom nel Canvas Lightbox
    if (viewport) {
      viewport.addEventListener('mousedown', (e) => {
        lbState.isDragging = true;
        lbState.startX = e.clientX - lbState.x;
        lbState.startY = e.clientY - lbState.y;
        viewport.classList.add('dragging');
      });

      window.addEventListener('mousemove', (e) => {
        if (!lbState.isDragging) return;
        lbState.x = e.clientX - lbState.startX;
        lbState.y = e.clientY - lbState.startY;
        applyLightboxTransform();
      });

      window.addEventListener('mouseup', () => {
        lbState.isDragging = false;
        viewport.classList.remove('dragging');
      });

      viewport.addEventListener(
        'wheel',
        (e) => {
          e.preventDefault();
          if (e.ctrlKey || e.metaKey) {
            const delta = e.deltaY < 0 ? 0.18 : -0.18;
            lbState.scale = Math.max(0.4, Math.min(4, lbState.scale + delta));
          } else {
            lbState.y -= e.deltaY * 0.85;
            lbState.x -= e.deltaX * 0.85;
          }
          applyLightboxTransform();
        },
        { passive: false }
      );
    }
  }

  // =========================================================================
  // 10. NAVIGAZIONE GENERALE, GRIGLIA SVIZZERA & CONTROLLI TRACK ORIZZONTALI
  // =========================================================================
  function scrollToElement(target) {
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -50, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function initGlobalUIEvents() {
    // Pulsanti scroll-to
    document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const sel = btn.getAttribute('data-scroll-to');
        const target = document.querySelector(sel);
        scrollToElement(target);
      });
    });

    // Pulsanti filtro categoria (Hero + Dock Laterale)
    document.addEventListener('click', (e) => {
      const filterBtn = e.target.closest('[data-filter]');
      if (filterBtn) {
        const catId = filterBtn.getAttribute('data-filter');
        filterPortfolioByCategory(catId);
      }

      // Controlli frecce per le gallerie orizzontali Packaging / Wine
      const trackBtn = e.target.closest('[data-track-dir]');
      if (trackBtn) {
        const dir = parseInt(trackBtn.getAttribute('data-track-dir') || '1', 10);
        const trackId = trackBtn.getAttribute('data-target-track');
        const track = document.getElementById(trackId);
        if (window.innerWidth > 900 && lenis) {
          lenis.scrollTo(window.scrollY + dir * 420, { duration: 0.7 });
        } else if (track) {
          track.scrollBy({ left: dir * 420, behavior: 'smooth' });
        }
      }
    });

    // Toggle Griglia Architettonica Svizzera
    const gridBtn = document.getElementById('toggle-grid-overlay');
    const gridOverlay = document.getElementById('swiss-grid-overlay');
    if (gridBtn && gridOverlay) {
      gridBtn.addEventListener('click', () => {
        gridOverlay.classList.toggle('visible');
        gridBtn.classList.toggle('active');
      });
    }
  }

  // =========================================================================
  // BOOTSTRAP APPLICAZIONE
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    renderCategoryNavs();
    renderIndexTable();
    renderProjectsStream();

    initSmoothScrollAndGSAP();
    init3DTiltMockups();
    initCursorAndIndexPreview();
    initLightboxEvents();
    initGlobalUIEvents();

    document.body.classList.remove('loading');
  });
})();
