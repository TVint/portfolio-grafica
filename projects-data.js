/**
 * NICOLA VIANELLO — SELECTED WORKS & ARCHIVE MONOGRAPH (PORTFOLIO A + B)
 * Curatorial Data Architecture, Itten Chromatic System & Smart-Slicing Coordinates
 * Total Curated Works: 25 (integrating all 27 boards A-01..A-17 & B-01..B-10)
 */

window.PORTFOLIO_CATEGORIES = [
  {
    id: 'all',
    code: '00',
    shortLabel: 'ALL // 25',
    fullLabel: '00 // ARCHIVIO INTEGRALE (A + B)',
    description: 'Sequenza curatoriale completa ad alternanza ritmica (alta densità visiva ↔ respiro minimale)',
    accent: '#E5FF00'
  },
  {
    id: 'brand',
    code: '01',
    shortLabel: '01 // BRAND',
    fullLabel: '01 // BRAND & VISUAL IDENTITY',
    description: 'Loghi, sistemi coordinati, musica, musei, ospitalità lagunare e superfici d’interni',
    accent: '#3AA694'
  },
  {
    id: 'editorial',
    code: '02',
    shortLabel: '02 // EDITORIAL',
    fullLabel: '02 // EDITORIAL, ZINE & GLITCH ART',
    description: 'Magazine indipendenti, sperimentazione 8-bit, databending, tipografia storica e ricerca cromatica',
    accent: '#E63B19'
  },
  {
    id: 'packaging',
    code: '03',
    shortLabel: '03 // PACKAGING',
    fullLabel: '03 // PACKAGING & LABEL SYSTEMS',
    description: 'Sistemi vitivinicoli DOCG, collezioni astronomiche, food packaging artigianale e fustelle',
    accent: '#D4AF37'
  },
  {
    id: 'poster',
    code: '04',
    shortLabel: '04 // POSTER',
    fullLabel: '04 // POSTER & CULTURAL CAMPAIGNS',
    description: 'Manifesti museali veneziani, infografiche culturali, festival musicali e mappe pieghevoli',
    accent: '#FF2400'
  },
  {
    id: 'digital',
    code: '05',
    shortLabel: '05 // DIGITAL & UI',
    fullLabel: '05 // DIGITAL, UI & MOTION',
    description: 'Web design, interfacce dark-luxury per l’orologeria, e-commerce, totem interattivi e architettura',
    accent: '#38BDF8'
  }
];

window.PORTFOLIO_DATA = [
  // =========================================================================
  // 01. ANATOMY OF RED (Portfolio A-01) — HIGH DENSITY / SURGICAL OPENING
  // =========================================================================
  {
    id: 'anatomy-of-red',
    code: 'A-01',
    sequenceNum: '01',
    title: 'ANATOMY OF RED',
    subtitle: 'Psicologia Percettiva & Incisione Calcografica in Bicromia',
    category: 'poster',
    categoryLabel: '04 // POSTER & CULTURAL CAMPAIGNS',
    year: '2016 // ARCHIVE R&D',
    client: 'Ricerca Personale — Venezia',
    density: 'high',
    mockupType: 'poster-3d',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Syne', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne ExtraBold + IBM Plex Mono'
    },
    itten: {
      bg: '#092622',
      bgAlt: '#FFFFFF',
      text: '#F4F6F5',
      primary: '#FF2400',
      secondary: '#092622',
      accent: '#FF2400',
      primaryName: 'PANTONE Bright Red U',
      secondaryName: 'Deep Petrol Green',
      contrastType: 'Contrasto dei Complementari (Rosso Fuoco ↔ Verde Petrolio)',
      note: 'Lo sfondo Verde Petrolio profondo (#092622) innesca per induzione simultanea la massima luminosità retinica del PANTONE Bright Red U (#FF2400).'
    },
    specs: [
      { label: 'FORMATO', value: 'A3 Bicromia Specifica' },
      { label: 'TECNICA', value: 'Incisione Bitmap + Swiss Type' },
      { label: 'FOCUS', value: 'Fisiologia & Psicologia Colore' },
      { label: 'STAMPA', value: 'Nero Calcografico + Rosso Puro' }
    ],
    curatorialCopy: 'Indagine visiva sulla risonanza viscerale della lunghezza d’onda del rosso. Tavole anatomiche calcografiche vengono sezionate da innesti tipografici svizzeri in PANTONE Bright Red U, associando a cervello, cuore, viscere e muscoli le tensioni primarie di attenzione, forza, eros, ansia e velocità.',
    primaryImage: 'Portfolio A-01.jpg',
    slices: [
      {
        src: 'Portfolio A-01.jpg',
        pos: '50% 4%',
        scale: 1.02,
        aspect: '3 / 4.2',
        role: 'hero',
        speed: 1.0,
        label: '01 // TAVOLA ANATOMICA INTEGRALE — SEZIONE CEREBRALE E MUSCOLARE'
      },
      {
        src: 'Portfolio A-01.jpg',
        pos: '50% 24.5%',
        scale: 1.12,
        aspect: '16 / 7',
        role: 'detail',
        speed: 1.12,
        label: '02 // TRITTICO ORGANI: PASSION / LOVE / ENERGY'
      },
      {
        src: 'Portfolio A-01.jpg',
        pos: '50% 60%',
        scale: 1.06,
        aspect: '4 / 4.5',
        role: 'mockup',
        speed: 0.94,
        label: '03 // INSTALLAZIONE MANIFESTO CON MOLLETTE METALLICHE'
      },
      {
        src: 'Portfolio A-01.jpg',
        pos: '50% 84%',
        scale: 1.08,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // TIRATURA TIPOGRAFICA SU CARTA USOMANO'
      }
    ]
  },

  // =========================================================================
  // 02. GRANPREMIO MONOPOSTO (Portfolio B-05) — SLEEK DARK LUXURY UI
  // =========================================================================
  {
    id: 'granpremio-monoposto',
    code: 'B-05',
    sequenceNum: '02',
    title: 'GRANPREMIO MONOPOSTO',
    subtitle: 'Automatic Watch for Speed Lovers — Brand & Dark Web UI',
    category: 'digital',
    categoryLabel: '05 // DIGITAL, UI & MOTION',
    year: '2018 // HOROLOGY & UI',
    client: 'Granpremio Timepieces',
    density: 'minimal',
    mockupType: 'browser-kiosk',
    specialInteraction: 'ui-showcase',
    fonts: {
      display: "'Unbounded', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Unbounded Bold + Space Grotesk'
    },
    itten: {
      bg: '#0B0D10',
      bgAlt: '#14181F',
      text: '#F5F5F7',
      primary: '#E84C15',
      secondary: '#1B2A3A',
      accent: '#E84C15',
      primaryName: 'Racing Papaya Orange',
      secondaryName: 'Carbon Steel Blue',
      contrastType: 'Contrasto Caldo-Freddo & Qualità (Arancio Corsa ↔ Nero/Blu Acciaio)',
      note: 'Il fondo Carbonio profondo con sottotono Blu Acciaio valorizza gli accenti Arancio Tachimetro tipici delle monoposto storiche anni ’60.'
    },
    specs: [
      { label: 'SETTORE', value: 'Orologeria Automatica Racing' },
      { label: 'OUTPUT', value: 'Monogramma GP + Landing UI' },
      { label: 'MOOD', value: 'Cockpit Vintage & Tachimetro' },
      { label: 'INTERFACCIA', value: 'Dark-Mode E-Commerce Showcase' }
    ],
    curatorialCopy: 'Direzione artistica e interfaccia digitale per un cronografo automatico ispirato alle monoposto d’epoca. Il layout alterna macro-fotografia meccanica del quadrante e del cinturino rally traforato a una UI nero carbonio scandita da accenti arancio corsa e griglie telemetriche.',
    primaryImage: 'Portfolio B-05.jpg',
    slices: [
      {
        src: 'Portfolio B-05.jpg',
        pos: '50% 34%',
        scale: 1.0,
        aspect: '16 / 11',
        role: 'hero',
        speed: 1.0,
        label: '01 // DARK WEB UI — HERO & MOVIMENTO ROTORE'
      },
      {
        src: 'Portfolio B-05.jpg',
        pos: '50% 4%',
        scale: 1.05,
        aspect: '16 / 9',
        role: 'detail',
        speed: 1.14,
        label: '02 // MACRO QUADRANTE & MONOGRAMMA METALLICO GP'
      },
      {
        src: 'Portfolio B-05.jpg',
        pos: '50% 17%',
        scale: 1.04,
        aspect: '16 / 9',
        role: 'detail',
        speed: 0.92,
        label: '03 // AUTOMOTIVE STORYTELLING — COCKPIT & DRIVING GLOVES'
      },
      {
        src: 'Portfolio B-05.jpg',
        pos: '50% 72%',
        scale: 1.02,
        aspect: '16 / 11',
        role: 'spread',
        speed: 1.06,
        label: '04 // CHECKERBOARD FEATURE GRID & CINTURINO RALLY'
      }
    ]
  },

  // =========================================================================
  // 03. ZZZ MAG (Portfolio A-07) — HIGH DENSITY GLITCH & 8-BIT ZINE
  // =========================================================================
  {
    id: 'zzz-mag',
    code: 'A-07',
    sequenceNum: '03',
    title: 'ZZZ MAG',
    subtitle: 'Magazine Indipendente di Grafica, Elettronica 8-Bit & Rumore',
    category: 'editorial',
    categoryLabel: '02 // EDITORIAL, ZINE & GLITCH ART',
    year: '2016 // INDEPENDENT ZINE',
    client: 'Progetto Editoriale Autoprodotto',
    density: 'high',
    mockupType: 'editorial-spread',
    specialInteraction: 'glitch-rgb',
    fonts: {
      display: "'Unbounded', sans-serif",
      body: "'IBM Plex Mono', monospace",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Unbounded Black + IBM Plex Mono'
    },
    itten: {
      bg: '#0A1628',
      bgAlt: '#111E34',
      text: '#EDF2F7',
      primary: '#E63B19',
      secondary: '#00F0FF',
      accent: '#E63B19',
      primaryName: 'Circuitbent Orange-Red',
      secondaryName: 'Deep Oscilloscope Navy',
      contrastType: 'Contrasto Caldo-Freddo & Simultaneo (Arancio Circuito ↔ Ottanio Notte)',
      note: 'La tensione tra il Blu Notte profondo e l’Arancio Circuito simula i fosfori dei monitor CRT e le piste in rame dei sintetizzatori modificati.'
    },
    specs: [
      { label: 'SEZIONI', value: '.08 8-Bit / .16 Circuitbent / .24 Glitch' },
      { label: 'INFOGRAFICA', value: 'Console Timeline (1972—1994)' },
      { label: 'CURATELA', value: 'Testi, Ricerche, Databending' },
      { label: 'FORMATO', value: 'Brossura Editoriale Sperimentale' }
    ],
    curatorialCopy: 'Pubblicazione indipendente interamente scritta, ricercata e disegnata attorno all’estetica dell’errore digitale. Esplora la scena musicale chiptune 8-bit, la pratica del circuit bending su giocattoli sonori a basso voltaggio e il databending di file immagine aperti come codice grezzo.',
    primaryImage: 'Portfolio A-07.jpg',
    slices: [
      {
        src: 'Portfolio A-07.jpg',
        pos: '50% 47%',
        scale: 1.04,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // SPREAD .24 DATABENDING — CORRUZIONE RAW DEL CODICE IMMAGINE'
      },
      {
        src: 'Portfolio A-07.jpg',
        pos: '50% 58%',
        scale: 1.04,
        aspect: '16 / 10',
        role: 'spread',
        speed: 1.15,
        label: '02 // SPREAD .16 CIRCUITBENT — PISTE PCB & DISTRUZIONE CREATIVA'
      },
      {
        src: 'Portfolio A-07.jpg',
        pos: '50% 19%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 0.92,
        label: '03 // INFOGRAFICA CONSOLE (1972-1994) & GLITCH CAT ARTWORK'
      },
      {
        src: 'Portfolio A-07.jpg',
        pos: '50% 94%',
        scale: 1.05,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.08,
        label: '04 // MACRO FOTOGRAFICHE DEL VOLUME STAMPATO'
      }
    ]
  },

  // =========================================================================
  // 04. MR BAMBOO (Portfolio B-08) — MINIMALIST BRAND SYNTHESIS + 3D CSS MOCKUP
  // =========================================================================
  {
    id: 'mr-bamboo',
    code: 'B-08',
    sequenceNum: '04',
    title: 'MR BAMBOO',
    subtitle: 'Save The Planet — Eco Mascot Synthesis & Sustainable Identity',
    category: 'brand',
    categoryLabel: '01 // BRAND & VISUAL IDENTITY',
    year: '2018 // ECO BRANDING',
    client: 'Mr Bamboo Eco Products',
    density: 'minimal',
    mockupType: 'brand-bento',
    specialInteraction: 'brand-system',
    fonts: {
      display: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Space Grotesk Bold + Inter'
    },
    itten: {
      bg: '#F4F1EA',
      bgAlt: '#E7E2D6',
      text: '#111613',
      primary: '#1B4332',
      secondary: '#D97736',
      accent: '#2D6A4F',
      primaryName: 'Bamboo Forest Green',
      secondaryName: 'Raw Cotton & Terracotta',
      contrastType: 'Contrasto Chiaro-Scuro & Naturale (Nero Inchiostro / Verde Foresta ↔ Carta Cotone)',
      note: 'Il segno monocromatico puro acquisisce fisicità tattile attraverso il sistema di mockup in carta cotone pressata a secco (deboss) e accenti botanici.'
    },
    specs: [
      { label: 'SEGNO', value: 'Sintesi Iconica Monolinea / Silouhette' },
      { label: 'APPLICAZIONE', value: 'Carta Cotone 600g + Deboss' },
      { label: 'PAYOFF', value: 'Save The Planet' },
      { label: 'FOCUS', value: 'Sostenibilità & Packaging Plastic-Free' }
    ],
    curatorialCopy: 'Purezza semiotica applicata alla sostenibilità ambientale. Il fusto segmentato di una canna di bambù si trasforma con un minimo intervento in negativo in un carattere sorridente ed empatico, progettato per funzionare a fuoco su legno, carta cotone non sbiancata e packaging biodegradabile.',
    primaryImage: 'Portfolio B-08.jpg',
    slices: [
      {
        src: 'Portfolio B-08.jpg',
        pos: '50% 50%',
        scale: 1.0,
        aspect: '1 / 1.15',
        role: 'hero',
        speed: 1.0,
        label: '01 // MASTER LOGOMARK — SINTESI VETTORIALE PURA'
      },
      {
        src: 'Portfolio B-08.jpg',
        pos: '50% 34%',
        scale: 1.75,
        aspect: '4 / 3',
        role: 'detail',
        speed: 1.12,
        label: '02 // DETTAGLIO COSTRUTTIVO: NODI E GERMOGLI ASIMMETRICI'
      },
      {
        src: 'Portfolio B-08.jpg',
        pos: '50% 70%',
        scale: 1.85,
        aspect: '16 / 7',
        role: 'detail',
        speed: 0.94,
        label: '03 // LETTERING CONDENSATO ORGANICO & PAYOFF ECOLOGICO'
      }
    ]
  },

  // =========================================================================
  // 05. EDONÈ VALDOBBIADENE (Portfolio B-04) — HORIZONTAL WINE PIN
  // =========================================================================
  {
    id: 'edone-valdobbiadene',
    code: 'B-04',
    sequenceNum: '05',
    title: 'EDONÈ VALDOBBIADENE',
    subtitle: 'Superiore di Cartizze DOCG — Luxury Wine Packaging & Serigraphy',
    category: 'packaging',
    categoryLabel: '03 // PACKAGING & LABEL SYSTEMS',
    year: '2018 // WINE LUXURY',
    client: 'Edonè — Valdobbiadene (TV)',
    density: 'high',
    mockupType: 'packaging-lineup',
    specialInteraction: 'horizontal-pin',
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond + IBM Plex Mono'
    },
    itten: {
      bg: '#0E0F12',
      bgAlt: '#17191E',
      text: '#F5F2EB',
      primary: '#D4AF37',
      secondary: '#1E3F66',
      accent: '#D4AF37',
      primaryName: 'Cartizze Gold Foil',
      secondaryName: 'Valdobbiadene Cobalt Blue',
      contrastType: 'Contrasto di Luminosità & Caldo-Freddo (Oro Lamine ↔ Blu Cobalto su Nero)',
      note: 'Dal buio assoluto della cantina (Dark Still-Life) alla luce cristallina del perlage: l’oro caldo dialoga col blu reale delle fasce DOCG.'
    },
    specs: [
      { label: 'DENOMINAZIONE', value: 'Valdobbiadene DOCG & Cartizze' },
      { label: 'NOBILITAZIONI', value: 'Vetro Nero Opaco + Serigrafia Oro/Argento' },
      { label: 'ART SERIES', value: 'Trittico Rubino, Smeraldo, Cobalto' },
      { label: 'DELIVERABLES', value: 'Bottiglie, Cofanetto, Calice, Web UI' }
    ],
    curatorialCopy: 'Sistema di packaging d’alta gamma per le bollicine Edonè di Valdobbiadene. Il progetto spazia dalla cuvée nera opaca con rilievi sul vetro e cofanetto monolitico, alla linea classica con sigillo blu reale, fino alla collezione speciale serigrafata su vetri colorati rubino, smeraldo e cobalto.',
    primaryImage: 'Portfolio B-04.jpg',
    slices: [
      {
        src: 'Portfolio B-04.jpg',
        pos: '50% 9%',
        scale: 1.02,
        aspect: '4 / 5',
        role: 'hero',
        speed: 1.0,
        label: '01 // CUVÉE NERA OPACA & COFANETTO MONOLITICO'
      },
      {
        src: 'Portfolio B-04.jpg',
        pos: '50% 20%',
        scale: 1.04,
        aspect: '4 / 5',
        role: 'detail',
        speed: 1.1,
        label: '02 // ART DIRECTION STILL-LIFE TRA FUMO E GEOMETRIE DI LUCE'
      },
      {
        src: 'Portfolio B-04.jpg',
        pos: '50% 56%',
        scale: 1.04,
        aspect: '4 / 5',
        role: 'detail',
        speed: 0.95,
        label: '03 // LINEA CLASSICA DOCG — SIGILLO BLU REALE SU VETRO CHIARO'
      },
      {
        src: 'Portfolio B-04.jpg',
        pos: '50% 65%',
        scale: 1.08,
        aspect: '16 / 9',
        role: 'wide',
        speed: 1.05,
        label: '04 // COLLEZIONE SERIGRAFATA: RUBINO, SMERALDO & COBALTO'
      },
      {
        src: 'Portfolio B-04.jpg',
        pos: '50% 82%',
        scale: 1.04,
        aspect: '4 / 5',
        role: 'detail',
        speed: 1.12,
        label: '05 // GAMMA COMPLETA RISERVA & SUPERIORE DI CARTIZZE'
      }
    ]
  },

  // =========================================================================
  // 06. 99ª COLLETTIVA BLM VENEZIA (Portfolio A-06 + A-17) — VENETIAN STICKY
  // =========================================================================
  {
    id: 'blm-99-venezia',
    code: 'A-06',
    sequenceNum: '06',
    title: '99ª COLLETTIVA BLM',
    subtitle: 'Fondazione Bevilacqua La Masa — Piazza San Marco, Venezia',
    category: 'poster',
    categoryLabel: '04 // POSTER & CULTURAL CAMPAIGNS',
    year: '2015—2016 // VENEZIA',
    client: 'Comune di Venezia — Bevilacqua La Masa',
    density: 'minimal',
    mockupType: 'poster-3d',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond Bold + Space Grotesk'
    },
    itten: {
      bg: '#E5FF00',
      bgAlt: '#FFFFFF',
      text: '#0D0D0D',
      primary: '#0D0D0D',
      secondary: '#E5FF00',
      accent: '#0D0D0D',
      primaryName: 'Venetian Xylographic Black',
      secondaryName: 'Acid Signal Yellow',
      contrastType: 'Contrasto di Quantità & Luminosità (Nero Xilografico ↔ Giallo Acido #E5FF00)',
      note: 'La campitura piena in Giallo Acido Segnale crea uno stacco brutalista contemporaneo che esalta il rigore storico delle incisioni veneziane in bianco e nero.'
    },
    specs: [
      { label: 'ISTITUZIONE', value: 'Fondazione Bevilacqua La Masa' },
      { label: 'SEDE', value: 'Galleria di Piazza San Marco' },
      { label: 'DISCIPLINE', value: 'Pittura, Scultura, Architettura, Musica' },
      { label: 'TAVOLE', value: 'Portfolio A-06 + Macro A-17' }
    ],
    curatorialCopy: 'Manifesto per la 99ª Collettiva Giovani Artisti a Venezia. I caratteri monumentali dell’acronimo BLM 99 diventano architetture abitate da innesti calcografici che celebrano l’anima anacronistica della Serenissima: la cupola della Salute, il Campanile di San Marco, il Bucintoro e il violoncello barocco.',
    primaryImage: 'Portfolio A-06.jpg',
    secondaryImage: 'Portfolio A-17.jpg',
    slices: [
      {
        src: 'Portfolio A-06.jpg',
        pos: '50% 13%',
        scale: 1.0,
        aspect: '3 / 4.3',
        role: 'hero',
        speed: 1.0,
        label: '01 // MANIFESTO UFFICIALE BLM 99 — GALLERIA DI PIAZZA SAN MARCO'
      },
      {
        src: 'Portfolio A-06.jpg',
        pos: '50% 41%',
        scale: 1.04,
        aspect: '16 / 8',
        role: 'detail',
        speed: 1.12,
        label: '02 // LOGOTIPO ORIZZONTALE & GENESI STORICO-ARTISTICA'
      },
      {
        src: 'Portfolio A-17.jpg',
        pos: '50% 20%',
        scale: 1.02,
        aspect: '4 / 4.5',
        role: 'mockup',
        speed: 0.93,
        label: '03 // STAMPA PIEGATA IN QUARTI SU PATTERN CALCOGRAFICO (TAVOLA A-17)'
      },
      {
        src: 'Portfolio A-17.jpg',
        pos: '50% 84%',
        scale: 1.05,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.08,
        label: '04 // MACRO TIPOGRAFICO: SANTA MARIA DELLA SALUTE E MERLETTO 99'
      }
    ]
  },

  // =========================================================================
  // 07. BRIDGMAN JESOLO (Portfolio B-02) — DUAL-ECOSYSTEM SURF WEB UI
  // =========================================================================
  {
    id: 'bridgman-jesolo',
    code: 'B-02',
    sequenceNum: '07',
    title: 'BRIDGMAN BEACH STYLE',
    subtitle: 'Water Sport Center & Surf Style Shop — Dual-Ecosystem Web UI',
    category: 'digital',
    categoryLabel: '05 // DIGITAL, UI & MOTION',
    year: '2018 // WEB & DIGITAL UI',
    client: 'Bridgman — Jesolo Lido (VE)',
    density: 'high',
    mockupType: 'browser-kiosk',
    specialInteraction: 'ui-showcase',
    fonts: {
      display: "'Syne', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne Bold + Space Grotesk'
    },
    itten: {
      bg: '#133B54',
      bgAlt: '#0D293B',
      text: '#F0F9FF',
      primary: '#7CE8DF',
      secondary: '#F3C6A5',
      accent: '#7CE8DF',
      primaryName: 'Adriatic Surf Aqua',
      secondaryName: 'California Sand Peach',
      contrastType: 'Contrasto Caldo-Freddo Split-Screen (Acquamarina Surf ↔ Pesca Sabbiato)',
      note: 'L’architettura dell’informazione usa la coppia Caldo-Freddo di Itten per dividere istantaneamente i due mondi: Scuola Nautica (Freddo) e Streetwear Shop (Caldo).'
    },
    specs: [
      { label: 'ARCHITETTURA', value: 'Split-Portal (Center vs Shop)' },
      { label: 'ILLUSTRAZIONI', value: 'Iconografia Line-Art Custom' },
      { label: 'RESPONSIVE', value: 'Desktop iMac + Mobile System' },
      { label: 'LOCALITÀ', value: 'Piazza Brescia & Via Bafile, Jesolo' }
    ],
    curatorialCopy: 'Piattaforma digitale per lo storico hub surfistico di Jesolo Lido. Il progetto risolve la doppia anima del brand — centro sportivo sull’arenile e concept store in Via Bafile — attraverso un’interfaccia bipartita che oppone il turchese acquatico al pesca californiano, corredata da icone vettoriali su misura.',
    primaryImage: 'Portfolio B-02.jpg',
    slices: [
      {
        src: 'Portfolio B-02.jpg',
        pos: '50% 31%',
        scale: 1.0,
        aspect: '16 / 11',
        role: 'hero',
        speed: 1.0,
        label: '01 // DESKTOP UI — WATER SPORT CENTER & LISTINO SCUOLA SURF'
      },
      {
        src: 'Portfolio B-02.jpg',
        pos: '50% 56%',
        scale: 1.0,
        aspect: '16 / 11',
        role: 'spread',
        speed: 1.12,
        label: '02 // DESKTOP UI — SURF & STYLE SHOP (VIA BAFILE 9)'
      },
      {
        src: 'Portfolio B-02.jpg',
        pos: '50% 12%',
        scale: 1.04,
        aspect: '16 / 9',
        role: 'detail',
        speed: 0.94,
        label: '03 // DUAL-ECOSYSTEM CONCEPT & DISPLAY MOCKUPS'
      },
      {
        src: 'Portfolio B-02.jpg',
        pos: '50% 76%',
        scale: 1.04,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // MOBILE UI ADAPTATION & CUSTOM VECTOR MAP'
      }
    ]
  },

  // =========================================================================
  // 08. M.O.T.M. — MUSEUM OF TECHNO MUSIC (Portfolio A-09) — SOUNDWAVE + BRAND
  // =========================================================================
  {
    id: 'motm-berlin',
    code: 'A-09',
    sequenceNum: '08',
    title: 'M.O.T.M. BERLIN',
    subtitle: 'Museum of Techno Music — Brand Identity, Spatial & Interactive UI',
    category: 'brand',
    categoryLabel: '01 // BRAND & VISUAL IDENTITY',
    year: '2016 // CULTURAL BRANDING',
    client: 'MOTM — Krapfen Straße, Berlin',
    density: 'high',
    mockupType: 'brand-bento',
    specialInteraction: 'soundwave-reactive',
    fonts: {
      display: "'Unbounded', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Unbounded Regular + IBM Plex Mono'
    },
    itten: {
      bg: '#121616',
      bgAlt: '#1B2222',
      text: '#E6F2F0',
      primary: '#3AA694',
      secondary: '#D94E34',
      accent: '#3AA694',
      primaryName: 'Synth Waveform Teal',
      secondaryName: 'Industrial Rust Coral',
      contrastType: 'Contrasto dei Complementari (Verde Acqua Techno ↔ Corallo Ruggine)',
      note: 'Il Verde Acqua sintetico su fondo antracite industriale berlinese trova il suo contrappunto termico nel Corallo Ruggine complementare.'
    },
    specs: [
      { label: 'LOCATION', value: 'Krapfen Straße 420, Berlin' },
      { label: 'PIONEERS', value: 'Derrick May, K. Saunderson, J. Atkins' },
      { label: 'ECOSISTEMA', value: 'Stationery, Facciata, Totem, Web UI' },
      { label: 'LOGOMARK', value: 'Onda Quadra / Dente di Sega Modulare' }
    ],
    curatorialCopy: 'Identità visiva globale per il Museo della Musica Techno a Berlino. Il monogramma MOTM trasforma le forme d’onda dei sintetizzatori analogici in un sistema segnaletico modulare, declinato su coordinato cartaceo, galleria fotografica dei pionieri di Detroit, portale architettonico, totem di wayfinding e sito web.',
    primaryImage: 'Portfolio A-09.jpg',
    slices: [
      {
        src: 'Portfolio A-09.jpg',
        pos: '50% 66%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // ALLESTIMENTO ARCHITETTONICO MONUMENTALE & ONDE LUMINOSE'
      },
      {
        src: 'Portfolio A-09.jpg',
        pos: '50% 13%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.12,
        label: '02 // CORPORATE STATIONERY & PATTERN BIGLIETTI DA VISITA'
      },
      {
        src: 'Portfolio A-09.jpg',
        pos: '50% 42%',
        scale: 1.02,
        aspect: '16 / 8',
        role: 'wide',
        speed: 0.94,
        label: '03 // BELLEVILLE THREE DETROIT: DERRICK MAY, KEVIN SAUNDERSON, JUAN ATKINS'
      },
      {
        src: 'Portfolio A-09.jpg',
        pos: '50% 92%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'mockup',
        speed: 1.08,
        label: '04 // TOTEM INTERATTIVO DI WAYFINDING & INTERFACCIA WEB'
      }
    ]
  },

  // =========================================================================
  // 09. MIRUKU WALLPAPERS (Portfolio B-07) — INTERIOR SURFACES & BRAND
  // =========================================================================
  {
    id: 'miruku-surfaces',
    code: 'B-07',
    sequenceNum: '09',
    title: 'MIRUKU SURFACES',
    subtitle: 'Enrich Your Space — Architectural Wallpapers & Venetian Textures',
    category: 'brand',
    categoryLabel: '01 // BRAND & VISUAL IDENTITY',
    year: '2018 // INTERIOR BRANDING',
    client: 'Miruku Interior Design',
    density: 'minimal',
    mockupType: 'brand-bento',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond Light + Inter'
    },
    itten: {
      bg: '#1B2A32',
      bgAlt: '#F6F5F0',
      text: '#EAECEF',
      primary: '#4BA3A6',
      secondary: '#C97A3E',
      accent: '#4BA3A6',
      primaryName: 'Venetian Lagoon Riflessi',
      secondaryName: 'Tribal Ochre & Terracotta',
      contrastType: 'Contrasto Caldo-Freddo & Qualità (Blu Nebbia Lagunare ↔ Ocra Terracotta)',
      note: 'Le collezioni oppongono il calore geometrico delle terre bruciate alla quiete plumbea e liquida delle collezioni veneziane Laguna e Riflessi.'
    },
    specs: [
      { label: 'COLLEZIONI', value: 'Geometrica, Laguna, Riflessi, Marmo' },
      { label: 'PAYOFF', value: 'Enrich Your Space' },
      { label: 'SETTORE', value: 'Rivestimenti Materici & Carta da Parati' },
      { label: 'DIREZIONE', value: 'Naming, Logotipo, Catalogo Ambientato' }
    ],
    curatorialCopy: 'Identità di marca e direzione editoriale per un atelier di superfici e carte da parati d’autore. Il catalogo mette in dialogo pattern geometrici primordiali dai toni ocra con texture pittoriche ispirate alla nebbia immobile della laguna veneziana ("Laguna") e alle rifrazioni liquide dell’acqua ("Riflessi").',
    primaryImage: 'Portfolio B-07.jpg',
    slices: [
      {
        src: 'Portfolio B-07.jpg',
        pos: '50% 21%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // AMBIENTAZIONE LIVING — PATTERN GEOMETRICO TERRE CALDE'
      },
      {
        src: 'Portfolio B-07.jpg',
        pos: '50% 44%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.12,
        label: '02 // COLLEZIONE "LAGUNA" — ATMOSFERA PLUMBEA NELLA NEBBIA'
      },
      {
        src: 'Portfolio B-07.jpg',
        pos: '50% 66%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 0.93,
        label: '03 // COLLEZIONE "RIFLESSI" — LUCE LIQUIDA ED ETEREA'
      },
      {
        src: 'Portfolio B-07.jpg',
        pos: '50% 88%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // SUPERFICI VENATE SABBIA & MANIFESTO DEL BRAND'
      }
    ]
  },

  // =========================================================================
  // 10. LA CANEVA WINE LABELS (Portfolio A-04) — HORIZONTAL SCROLL PIN
  // =========================================================================
  {
    id: 'la-caneva-wine',
    code: 'A-04',
    sequenceNum: '10',
    title: 'LA CANEVA WINE SYSTEM',
    subtitle: 'Serie Astronomica, Chimico-Periodica & Spumanti d’Artista',
    category: 'packaging',
    categoryLabel: '03 // PACKAGING & LABEL SYSTEMS',
    year: '2016—2017 // WINE PACKAGING',
    client: 'La Caneva di Giancarlo — Ceggia (VE)',
    density: 'high',
    mockupType: 'packaging-lineup',
    specialInteraction: 'horizontal-pin',
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display + Space Grotesk'
    },
    itten: {
      bg: '#1E2D26',
      bgAlt: '#141F1A',
      text: '#EBF0EC',
      primary: '#D4AF37',
      secondary: '#9E2A2B',
      accent: '#D4AF37',
      primaryName: 'Planetary Gold & Sage',
      secondaryName: 'Raboso Carmine Red',
      contrastType: 'Armonia Analoga & Accento Complementare (Verde Salvia / Oro / Rosso Rubino)',
      note: 'Il Verde Salvia profondo richiama il vetro borgognotta e i filari veneti, lasciando emergere i globi planetari raster e gli scudetti pittorici.'
    },
    specs: [
      { label: 'SERIE 01', value: 'Pianeti (Mercurio, Venere, Marte, Giove...)' },
      { label: 'SERIE 02', value: 'Tavola Chimica degli Elementi' },
      { label: 'SERIE 03', value: 'Spumanti Scudetto (Van Gogh, Mucha)' },
      { label: 'CANTINA', value: 'La Caneva di Giancarlo — Ceggia (VE)' }
    ],
    curatorialCopy: 'Architettura di prodotto articolata in tre collezioni per la cantina La Caneva. La prima associa a ogni vitigno veneto un pianeta del sistema solare con composizione tipografica svizzera; la seconda codifica le bottiglie come elementi chimici; la terza incornicia capolavori di Van Gogh e Mucha in fustelle a scudetto.',
    primaryImage: 'Portfolio A-04.jpg',
    slices: [
      {
        src: 'Portfolio A-04.jpg',
        pos: '50% 25%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // MACRO SERIE ASTRONOMICA: MERCURIO, VENERE, MARTE, GIOVE, SATURNO'
      },
      {
        src: 'Portfolio A-04.jpg',
        pos: '50% 13%',
        scale: 1.04,
        aspect: '16 / 7',
        role: 'wide',
        speed: 1.12,
        label: '02 // LINEUP COMPLETA DEGLI 8 PIANETI (ROSSI, ROSATI E BIANCHI)'
      },
      {
        src: 'Portfolio A-04.jpg',
        pos: '50% 56%',
        scale: 1.04,
        aspect: '4 / 3',
        role: 'detail',
        speed: 0.94,
        label: '03 // DETTAGLIO ETICHETTA "MERCURIO" — RABOSO DEL PIAVE'
      },
      {
        src: 'Portfolio A-04.jpg',
        pos: '50% 45%',
        scale: 1.02,
        aspect: '4 / 4',
        role: 'detail',
        speed: 1.05,
        label: '04 // DITTICO "LUNA" & "TERRA" SU FONDO NEUTRO'
      },
      {
        src: 'Portfolio A-04.jpg',
        pos: '50% 88%',
        scale: 1.02,
        aspect: '4 / 5',
        role: 'detail',
        speed: 1.1,
        label: '05 // LINEA SPUMANTI "SCUDETTO" CON CITAZIONI D’ARTE (VAN GOGH & MUCHA)'
      }
    ]
  },

  // =========================================================================
  // 11. LIVINGSTONE STARMAP (Portfolio B-06) — CARTOGRAPHIC WATCH UI
  // =========================================================================
  {
    id: 'livingstone-starmap',
    code: 'B-06',
    sequenceNum: '11',
    title: 'LIVINGSTONE STARMAP',
    subtitle: 'Solar Compass Watch & Stellar Map — E-Commerce UI & Infographics',
    category: 'digital',
    categoryLabel: '05 // DIGITAL, UI & MOTION',
    year: '2018 // E-COMMERCE & BRAND',
    client: 'Livingstone Timepieces',
    density: 'minimal',
    mockupType: 'browser-kiosk',
    specialInteraction: 'ui-showcase',
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display + Inter'
    },
    itten: {
      bg: '#F5F2EB',
      bgAlt: '#EAE5D9',
      text: '#1E2631',
      primary: '#B49768',
      secondary: '#253447',
      accent: '#B49768',
      primaryName: 'Compass Brass Gold',
      secondaryName: 'Astronomical Night Slate',
      contrastType: 'Contrasto Chiaro-Scuro & Caldo-Freddo (Ottone Caldo ↔ Blu Ardesia su Carta)',
      note: 'La palette evoca le carte nautiche antiche e gli strumenti di navigazione in ottone satinato contrapposti al blu profondo della volta celeste.'
    },
    specs: [
      { label: 'INNOVAZIONE', value: 'Funzione Bussola Solare Integrata' },
      { label: 'FONDELLO', value: 'Mappa Stellare Incisa su Acciaio 316L' },
      { label: 'ASSET', value: 'Logo, Diagrammi Tecnici, Landing Page' },
      { label: 'MATERIALI', value: 'Vetro K1 + Pelle Conciata in Toscana' }
    ],
    curatorialCopy: 'Identità visiva e piattaforma di lancio per Livingstone Starmap, orologio-bussola pensato per l’esplorazione ("Machines to Explore"). L’interfaccia web unisce fotografia su mappe tecniche, diagrammi vettoriali che spiegano l’orientamento solare in tre step e focus sul fondello inciso con le costellazioni.',
    primaryImage: 'Portfolio B-06.jpg',
    slices: [
      {
        src: 'Portfolio B-06.jpg',
        pos: '50% 44%',
        scale: 1.0,
        aspect: '16 / 11',
        role: 'hero',
        speed: 1.0,
        label: '01 // INFOGRAFICA TECNICA INTERATTIVA & BUSSOLA SOLARE IN 3 STEP'
      },
      {
        src: 'Portfolio B-06.jpg',
        pos: '50% 13%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'detail',
        speed: 1.12,
        label: '02 // ART DIRECTION SU TAVOLA CARTOGRAFICA TECNICA'
      },
      {
        src: 'Portfolio B-06.jpg',
        pos: '50% 26%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 0.94,
        label: '03 // WEB HERO "FIND YOUR WAY" & LOGOMARK GEOMETRICO'
      },
      {
        src: 'Portfolio B-06.jpg',
        pos: '50% 68%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'spread',
        speed: 1.06,
        label: '04 // FONDELLO INCISO "THE STELLAR MAP" & CINTURINI TOSCANI'
      }
    ]
  },

  // =========================================================================
  // 12. 酒 SAKE INFOGRAPHIC (Portfolio A-12 / A-16) — TECHNICAL CULTURAL POSTER
  // =========================================================================
  {
    id: 'sake-infographic',
    code: 'A-12',
    sequenceNum: '12',
    title: '酒 SAKE — BREWING PROCESS',
    subtitle: 'Architettura Infografica del Processo Produttivo Tradizionale Giapponese',
    category: 'poster',
    categoryLabel: '04 // POSTER & CULTURAL CAMPAIGNS',
    year: '2016 // DATA VISUALIZATION',
    client: 'Ricerca Infografica — Venezia',
    density: 'high',
    mockupType: 'poster-3d',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Syne', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne Bold + IBM Plex Mono'
    },
    itten: {
      bg: '#222426',
      bgAlt: '#191A1C',
      text: '#F4F1EA',
      primary: '#D66853',
      secondary: '#6BB5B8',
      accent: '#D66853',
      primaryName: 'Torii Vermilion Coral',
      secondaryName: 'Spring Water Cyan',
      contrastType: 'Contrasto dei Complementari Attenuati su Antracite (Corallo ↔ Azzurro Acqua)',
      note: 'Su fondo antracite inciso dal pattern tradizionale giapponese Asanoha, il Corallo identifica le trasformazioni termiche/enzimatiche e il Ciano l’acqua sorgiva.'
    },
    specs: [
      { label: 'RISO', value: 'Miyama Nishiki, Yamada Nishiki, Omachi' },
      { label: 'FASI', value: 'Seinmai, Shinshi, Mushimai, Kōji, Moromi' },
      { label: 'PATTERN', value: 'Geometria Tradizionale Asanoha' },
      { label: 'TAVOLE', value: 'Portfolio A-12 / A-16' }
    ],
    curatorialCopy: 'Manifesto infografico che traduce la complessa biochimica della fermentazione del Sake in una macchina visiva lineare. Dal grado di raffinazione del chicco di riso (Seinmai 50%-70%) all’azione dell’Aspergillus Oryzae (Kōji a 30°C) fino alla pressatura Jouso, ogni stadio è codificato da icone isomeriche e ideogrammi.',
    primaryImage: 'Portfolio A-12.jpg',
    slices: [
      {
        src: 'Portfolio A-12.jpg',
        pos: '50% 14%',
        scale: 1.02,
        aspect: '3 / 4.2',
        role: 'hero',
        speed: 1.0,
        label: '01 // MANIFESTO INFOGRAFICO INTEGRALE "酒 SAKE"'
      },
      {
        src: 'Portfolio A-12.jpg',
        pos: '50% 54%',
        scale: 1.04,
        aspect: '4 / 3.5',
        role: 'detail',
        speed: 1.14,
        label: '02 // DETTAGLIO SEINMAI (RAFFINAZIONE 50%-70%) & TAZZA SAKAZUKI'
      },
      {
        src: 'Portfolio A-12.jpg',
        pos: '50% 84%',
        scale: 1.04,
        aspect: '4 / 3.5',
        role: 'detail',
        speed: 0.92,
        label: '03 // FERMENTAZIONE KŌJI, MOROMI E IMBOTTIGLIAMENTO TARUZUME'
      }
    ]
  },

  // =========================================================================
  // 13. BLUE BEE ACOUSTIC BAND (Portfolio A-02) — MUSIC SEMIOTICS & SOUNDWAVE
  // =========================================================================
  {
    id: 'blue-bee-band',
    code: 'A-02',
    sequenceNum: '13',
    title: 'BLUE BEE ACOUSTIC',
    subtitle: 'unStinged Acoustic Band — Semiotic Logo Genesis & Concert Poster',
    category: 'brand',
    categoryLabel: '01 // BRAND & VISUAL IDENTITY',
    year: '2016 // MUSIC IDENTITY',
    client: 'Blue Bee — Sting & Police Tribute',
    density: 'minimal',
    mockupType: 'brand-bento',
    specialInteraction: 'soundwave-reactive',
    fonts: {
      display: "'Syne', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne ExtraBold + Space Grotesk'
    },
    itten: {
      bg: '#1D1128',
      bgAlt: '#130B1B',
      text: '#F7F4FA',
      primary: '#E6D246',
      secondary: '#1D1128',
      accent: '#E6D246',
      primaryName: 'Sting Poster Yellow',
      secondaryName: 'Deep Acoustic Violet',
      contrastType: 'Contrasto dei Complementari Puri (Giallo Acido ↔ Viola Indaco)',
      note: 'La coppia complementare estrema dello spettro di Itten (Giallo/Viola) conferisce al manifesto musicale una vibrazione ottica immediata.'
    },
    specs: [
      { label: 'CONCEPT', value: 'Figure Musicali + Pause = Ape' },
      { label: 'REPERTORIO', value: 'Sting & The Police in Acustico' },
      { label: 'FORMAZIONE', value: 'Voce, Chitarra, Percussioni, Basso' },
      { label: 'OUTPUT', value: 'Marchio, Genesi Semiotica, Locandina' }
    ],
    curatorialCopy: 'Esercizio di sintesi semiotica tra scrittura musicale e zoologia per il progetto acustico tributo a Sting ("unStinged"). L’anatomia dell’ape viene costruita assemblando esclusivamente figure di durata e pause del pentagramma (semiminima, croma, semicroma), diventando icona centrale del manifesto giallo-nero.',
    primaryImage: 'Portfolio A-02.jpg',
    slices: [
      {
        src: 'Portfolio A-02.jpg',
        pos: '50% 72%',
        scale: 1.02,
        aspect: '3 / 4.2',
        role: 'hero',
        speed: 1.0,
        label: '01 // MANIFESTO CONCERTO "STING E POLICE IN ACUSTICO"'
      },
      {
        src: 'Portfolio A-02.jpg',
        pos: '50% 6%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'detail',
        speed: 1.12,
        label: '02 // EQUAZIONE SEMIOTICA: TABELLA VALORI MUSICALI + APE'
      },
      {
        src: 'Portfolio A-02.jpg',
        pos: '50% 27%',
        scale: 1.05,
        aspect: '4 / 3',
        role: 'mockup',
        speed: 0.94,
        label: '03 // LOGOTIPO DEFINITIVO & CALLIGRAFIA "BLUE BEE"'
      }
    ]
  },

  // =========================================================================
  // 14. VERSO ARCHITETTURA (Portfolio B-10) — ARCHITECTURAL WEB UI
  // =========================================================================
  {
    id: 'verso-architettura',
    code: 'B-10',
    sequenceNum: '14',
    title: 'VERSO ARCHITETTURA',
    subtitle: 'Expand Your View — Sistemi e Chiusure Architettoniche Minimali',
    category: 'digital',
    categoryLabel: '05 // DIGITAL, UI & MOTION',
    year: '2018 // ARCHITECTURAL UI',
    client: 'Verso — Jesolo (VE)',
    density: 'minimal',
    mockupType: 'browser-kiosk',
    specialInteraction: 'ui-showcase',
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display Italic + Inter'
    },
    itten: {
      bg: '#F8F7F4',
      bgAlt: '#232325',
      text: '#1D1D1F',
      primary: '#A67B68',
      secondary: '#232325',
      accent: '#A67B68',
      primaryName: 'Oxidized Corten Copper',
      secondaryName: 'Architectural Anthracite',
      contrastType: 'Contrasto di Qualità & Matericità (Rame Corten ↔ Antracite / Bianco Luce)',
      note: 'Il layout amplifica lo spazio bianco come una vetrata a tutta altezza, scandito dai toni materici dell’acciaio Corten e dell’alluminio brunito.'
    },
    specs: [
      { label: 'MATERIALI', value: 'Corten, Verniciato, Inox, Alluminio' },
      { label: 'ISPIRAZIONE', value: 'Oscar Niemeyer Editorial Grid' },
      { label: 'LOGOMARK', value: 'Sezione Profilo Integrata nella "O"' },
      { label: 'OUTPUT', value: 'Brand Identity & Editorial Web Design' }
    ],
    curatorialCopy: 'Identità visiva e interfaccia web per Verso, specialista in chiusure e serramenti architettonici minimali. Il logotipo trasforma la lettera finale in uno spaccato costruttivo in rame corten, mentre il sito adotta un’impaginazione asimmetrica ad ampio respiro che esalta la continuità tra luce interna e paesaggio.',
    primaryImage: 'Portfolio B-10.jpg',
    slices: [
      {
        src: 'Portfolio B-10.jpg',
        pos: '50% 18%',
        scale: 1.0,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // WEB HERO "EXPAND YOUR VIEW" & CITAZIONE DI OSCAR NIEMEYER'
      },
      {
        src: 'Portfolio B-10.jpg',
        pos: '50% 3%',
        scale: 1.02,
        aspect: '16 / 6',
        role: 'detail',
        speed: 1.12,
        label: '02 // LOGOTIPO ARCHITETTONICO SU ANTRACITE E RAME CORTEN'
      },
      {
        src: 'Portfolio B-10.jpg',
        pos: '50% 45%',
        scale: 1.0,
        aspect: '16 / 11',
        role: 'spread',
        speed: 0.94,
        label: '03 // GRIGLIA ASIMMETRICA MATERIALI: ACCIAIO CORTEN & VERNICIATO'
      },
      {
        src: 'Portfolio B-10.jpg',
        pos: '50% 86%',
        scale: 1.0,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // FOCUS "ARCHITETTURA ORIENTATA ALL’INNOVAZIONE"'
      }
    ]
  },

  // =========================================================================
  // 15. JONATHAN MAGAZINE (Portfolio A-11) — EDITORIAL SPREADS
  // =========================================================================
  {
    id: 'jonathan-magazine',
    code: 'A-11',
    sequenceNum: '15',
    title: 'JONATHAN — ISSUE #01',
    subtitle: 'Dimensione Avventura: Senegal, un Insolito Itinerario di Viaggio',
    category: 'editorial',
    categoryLabel: '02 // EDITORIAL, ZINE & GLITCH ART',
    year: '2016 // EDITORIAL DESIGN',
    client: 'Jonathan — Periodico di Viaggio e Cultura',
    density: 'high',
    mockupType: 'editorial-spread',
    specialInteraction: 'book-spread',
    fonts: {
      display: "'Syne', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne Bold + Inter'
    },
    itten: {
      bg: '#2A1820',
      bgAlt: '#F7D6E0',
      text: '#FDF7F9',
      primary: '#E5A4B4',
      secondary: '#4ECDC4',
      accent: '#4ECDC4',
      primaryName: 'Lac Rose Flamingo Pink',
      secondaryName: 'Senegal Coast Turquoise',
      contrastType: 'Contrasto Caldo-Freddo Esotico (Rosa Lago Retba ↔ Turchese Atlantico)',
      note: 'La palette nasce direttamente dalla fotografia di copertina del Lago Rosa (Lac Rose) in Senegal, alternando pagine luminose a spread neri museali.'
    },
    specs: [
      { label: 'NUMERO', value: 'Issue #01 — Marzo 2016 (Senegal)' },
      { label: 'RUBRICHE', value: 'Musica del Mondo, Usi e Costumi, Mappe' },
      { label: 'GRIGLIA', value: 'Svizzera Dinamica a 5 Colonne + Filetti' },
      { label: 'ELEMENTI', value: 'Testata Custom, Sommario, Cartografia' }
    ],
    curatorialCopy: 'Progettazione completa della testata e del primo numero del magazine di esplorazione culturale Jonathan, dedicato al Senegal. Il ritmo editoriale alterna doppie pagine tipografiche ad alto contrasto cromatico (rosa/menta/nero) a reportage fotografici a vivo, schede antropologiche su maschere rituali e mappe tematiche.',
    primaryImage: 'Portfolio A-11.jpg',
    slices: [
      {
        src: 'Portfolio A-11.jpg',
        pos: '50% 24%',
        scale: 1.04,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // DOPPIA PAGINA SOMMARIO & APERTURA "SENEGAL"'
      },
      {
        src: 'Portfolio A-11.jpg',
        pos: '50% 8%',
        scale: 1.02,
        aspect: '4 / 4.5',
        role: 'detail',
        speed: 1.12,
        label: '02 // TESTATA LOGOTIPO & COPERTINA ISSUE #01 (LAGO ROSA)'
      },
      {
        src: 'Portfolio A-11.jpg',
        pos: '50% 50%',
        scale: 1.04,
        aspect: '16 / 10',
        role: 'spread',
        speed: 0.94,
        label: '03 // RUBRICA "USI E COSTUMI" SU FONDO NERO MUSEALE'
      },
      {
        src: 'Portfolio A-11.jpg',
        pos: '50% 65%',
        scale: 1.04,
        aspect: '16 / 10',
        role: 'spread',
        speed: 1.08,
        label: '04 // REPORTAGE FOTOGRAFICO A PIENA PAGINA & CARTOGRAFIA'
      }
    ]
  },

  // =========================================================================
  // 16. BOTTEGA SICULA (Portfolio A-03) — ARTISANAL PACKAGING PIN
  // =========================================================================
  {
    id: 'bottega-sicula',
    code: 'A-03',
    sequenceNum: '16',
    title: 'BOTTEGA SICULA',
    subtitle: 'Tradizione Siciliana di Modica — Pasta Packaging & Botanical Identity',
    category: 'packaging',
    categoryLabel: '03 // PACKAGING & LABEL SYSTEMS',
    year: '2016 // FOOD PACKAGING',
    client: 'Scuola Internazionale di Grafica Venezia',
    density: 'minimal',
    mockupType: 'packaging-lineup',
    specialInteraction: 'horizontal-pin',
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display Bold + Inter'
    },
    itten: {
      bg: '#FAF6EE',
      bgAlt: '#EFE8DA',
      text: '#3D2314',
      primary: '#3D2314',
      secondary: '#E6A817',
      accent: '#C84B31',
      primaryName: 'Modica Cocoa & Carob Brown',
      secondaryName: 'Sicilian Lemon Ochre',
      contrastType: 'Contrasto Chiaro-Scuro & Materico (Terra Cacao ↔ Carta Kraft/Cotone)',
      note: 'Il marrone caldo del cacao e della carruba di Modica dialoga con la carta naturale non patinata e i gialli solari degli agrumi siciliani.'
    },
    specs: [
      { label: 'PRODOTTI', value: 'Pennette Cacao, Tagliatelle Carruba, Paccheri' },
      { label: 'SUPPORTO', value: 'Sacchetto Fustellato con Finestra Laterale' },
      { label: 'ILLUSTRAZIONI', value: 'Tavole Botaniche Ingredienti + Icone' },
      { label: 'ORIGINE', value: 'Specialità Artigianali di Modica' }
    ],
    curatorialCopy: 'Identità di marca e sistema di packaging primario per una bottega di pasta artigianale aromatizzata di Modica. Ogni confezione unisce una fustella superiore ad arco, finestre laterali che lasciano intravedere la trafilatura al bronzo e una mappa botanica illustrata delle proprietà di cacao, carruba e barbabietola.',
    primaryImage: 'Portfolio A-03.jpg',
    slices: [
      {
        src: 'Portfolio A-03.jpg',
        pos: '50% 16%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // TRITTICO PACKAGING PASTA: CACAO, CARRUBA E BARBABIETOLA'
      },
      {
        src: 'Portfolio A-03.jpg',
        pos: '50% 30%',
        scale: 1.04,
        aspect: '16 / 9',
        role: 'detail',
        speed: 1.12,
        label: '02 // CONFRONTO MATERICO: CARTA PURA VS CARTA KRAFT NATURALE'
      },
      {
        src: 'Portfolio A-03.jpg',
        pos: '50% 44%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 0.94,
        label: '03 // MANIFESTO INFOGRAFICO "NATURE / HEALTH / TRADITION" & MONOGRAMMA'
      },
      {
        src: 'Portfolio A-03.jpg',
        pos: '50% 70%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // SISTEMA LOGOTIPO, BADGE CIRCOLARI E DECLINAZIONI'
      }
    ]
  },

  // =========================================================================
  // 17. ALBATROS VENEZIA (Portfolio B-01) — NAUTICAL BRAND IDENTITY
  // =========================================================================
  {
    id: 'albatros-venezia',
    code: 'B-01',
    sequenceNum: '17',
    title: 'ALBATROS VENEZIA',
    subtitle: 'Venice Islands Tours — Historic 1964 Boat Identity & Wayfinding',
    category: 'brand',
    categoryLabel: '01 // BRAND & VISUAL IDENTITY',
    year: '2018 // HOSPITALITY BRANDING',
    client: 'Albatros Venezia — Treporti / Laguna',
    density: 'high',
    mockupType: 'brand-bento',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display + Space Grotesk'
    },
    itten: {
      bg: '#132B4C',
      bgAlt: '#0D1F38',
      text: '#F4F7FB',
      primary: '#E89846',
      secondary: '#132B4C',
      accent: '#E89846',
      primaryName: 'Lagoon Sunset Amber',
      secondaryName: 'Venetian Deep Navy',
      contrastType: 'Contrasto dei Complementari (Blu Laguna Profondo ↔ Ambra Tramonto)',
      note: 'Il Blu Marino istituzionale è acceso dal suo complementare Ambra Dorato, estratto direttamente dai riflessi del tramonto sulla laguna nord di Venezia.'
    },
    specs: [
      { label: 'IMBARCAZIONE', value: 'Barca Storica Veneziana del 1964' },
      { label: 'ITINERARI', value: 'Burano, Torcello, S. Francesco, S. Erasmo' },
      { label: 'LINGUE', value: 'Sistema Editoriale Trilingue (EN / DE / IT)' },
      { label: 'ASSET', value: 'Logotipo, Disegno Tecnico Scafo, Icone, Mappa' }
    ],
    curatorialCopy: 'Identità visiva e comunicazione integrata per un servizio di navigazione lenta nella Laguna di Venezia a bordo di uno scafo storico del 1964. Il logotipo calligrafico integra il volo dell’albatros e l’ancora marinara, accompagnato da disegni tecnici al tratto dell’imbarcazione e da un set di icone custom.',
    primaryImage: 'Portfolio B-01.jpg',
    slices: [
      {
        src: 'Portfolio B-01.jpg',
        pos: '50% 10%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // LOGOTIPO CALLIGRAFICO NAUTICO SU PROFILO TECNICO DELLO SCAFO'
      },
      {
        src: 'Portfolio B-01.jpg',
        pos: '50% 34%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.12,
        label: '02 // ATMOSFERA LAGUNARE AL TRAMONTO DA PRUA'
      },
      {
        src: 'Portfolio B-01.jpg',
        pos: '50% 56%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 0.94,
        label: '03 // STORYTELLING TRILINGUE (EN/DE/IT) & WIREFRAME IMBARCAZIONE'
      },
      {
        src: 'Portfolio B-01.jpg',
        pos: '50% 84%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // SISTEMA ICONOGRAFICO (ISLANDS, BIKE & BOAT, HAPPY HOURS) E MAPPA'
      }
    ]
  },

  // =========================================================================
  // 18. CHOOSE YOUR COLOR (Portfolio A-05) — PANTONE CHROMATIC STUDY
  // =========================================================================
  {
    id: 'choose-your-color',
    code: 'A-05',
    sequenceNum: '18',
    title: 'CHOOSE YOUR COLOR',
    subtitle: 'Pantone Spatial Gradient & Platonic Solids — Chromatic Research',
    category: 'editorial',
    categoryLabel: '02 // EDITORIAL, ZINE & GLITCH ART',
    year: '2016 // CHROMATIC STUDY',
    client: 'Studio Compositivo Pantone',
    density: 'minimal',
    mockupType: 'poster-3d',
    specialInteraction: 'glitch-rgb',
    fonts: {
      display: "'Syne', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Syne ExtraBold + Space Grotesk'
    },
    itten: {
      bg: '#EAE6DF',
      bgAlt: '#141416',
      text: '#161618',
      primary: '#E6007E',
      secondary: '#009688',
      accent: '#E6007E',
      primaryName: 'PANTONE Rhodamine Red',
      secondaryName: 'PANTONE Green & 7458 Cyan',
      contrastType: 'Contrasto Simultaneo & Chiaro-Scuro (Rhodamine ↔ Teal su Warm Gray vs Nero)',
      note: 'La tavola verifica sperimentalmente la legge di Itten sull’interazione tra tre tinte sature sospese su fondo neutro caldo (Warm Gray 2) rispetto al nero assoluto.'
    },
    specs: [
      { label: 'SWATCH 01', value: 'PANTONE Rhodamine Red' },
      { label: 'SWATCH 02', value: 'PANTONE Green & PANTONE 7458' },
      { label: 'BASE', value: 'PANTONE Warm Gray 2 vs Black' },
      { label: 'STILE', value: 'Post-Digital Memphis & 3D Solids' }
    ],
    curatorialCopy: 'Ricerca visiva sulla percezione di profondità tridimensionale generata da nastri sfumati e solidi platonici sospesi di matrice Memphis. Il progetto esplora tre gradi progressivi di densità segnica e analizza la variazione di luminosità percepita dei tre colori Pantone su fondo grigio caldo e su fondo nero.',
    primaryImage: 'Portfolio A-05.jpg',
    slices: [
      {
        src: 'Portfolio A-05.jpg',
        pos: '50% 18%',
        scale: 1.02,
        aspect: '3 / 4.2',
        role: 'hero',
        speed: 1.0,
        label: '01 // COMPOSIZIONE PRINCIPALE CON SOLIDI PLATONICI E NASTRO GRADIENTE'
      },
      {
        src: 'Portfolio A-05.jpg',
        pos: '50% 53%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'wide',
        speed: 1.12,
        label: '02 // TRITTICO DI VARIAZIONE PROGRESSIVA DELLA DENSITÀ SEGNICA'
      },
      {
        src: 'Portfolio A-05.jpg',
        pos: '50% 84%',
        scale: 1.02,
        aspect: '4 / 4.2',
        role: 'mockup',
        speed: 0.94,
        label: '03 // VERIFICA CROMATICA E INQUADRATURA DA GALLERIA'
      }
    ]
  },

  // =========================================================================
  // 19. PEGASUS WATCHES FLORENCE (Portfolio B-09) — HERITAGE WEB UI
  // =========================================================================
  {
    id: 'pegasus-watches',
    code: 'B-09',
    sequenceNum: '19',
    title: 'PEGASUS WATCHES',
    subtitle: 'Florence Artistic Wristwatch — Mythological Storytelling & Web UI',
    category: 'digital',
    categoryLabel: '05 // DIGITAL, UI & MOTION',
    year: '2018 // LUXURY WEB UI',
    client: 'Pegasus Watches — Firenze',
    density: 'high',
    mockupType: 'browser-kiosk',
    specialInteraction: 'ui-showcase',
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond SemiBold + Inter'
    },
    itten: {
      bg: '#161618',
      bgAlt: '#F4F2ED',
      text: '#F2EFE9',
      primary: '#C5A059',
      secondary: '#2C3539',
      accent: '#C5A059',
      primaryName: 'Medici Florentine Gold',
      secondaryName: 'Boboli Stone & Obsidian',
      contrastType: 'Contrasto Chiaro-Scuro & Storico (Oro Mediceo ↔ Pietra Serena / Nero)',
      note: 'Il bicromatismo nero-oro del cronografo dialoga con i bianchi marmorei delle statue di Palazzo Pitti e le carte ingiallite dei manoscritti d’archivio.'
    },
    specs: [
      { label: 'ISPIRAZIONE', value: 'Giardino di Boboli & Palazzo Pitti, Firenze' },
      { label: 'STORYTELLING', value: 'Mito di Pegaso, Bellerofonte e Monte Elicona' },
      { label: 'TECNICA', value: 'Incisioni Storiche + CAD Orologiero + UI' },
      { label: 'PRODOTTO', value: 'Cronografo Acciaio Nero e Oro' }
    ],
    curatorialCopy: 'Identità e web design narrativo per un brand di orologeria fiorentina ispirato alla scultura di Pegaso di Aristodemo Costoli nei Giardini di Boboli. La pagina fonde epistole manoscritte d’archivio e incisioni calcografiche con la fotografia del cronografo nero-oro e disegni tecnici CAD della cassa.',
    primaryImage: 'Portfolio B-09.jpg',
    slices: [
      {
        src: 'Portfolio B-09.jpg',
        pos: '50% 38%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // CRONOGRAFO NERO-ORO & STATUA DI PEGASO NEI GIARDINI DI BOBOLI'
      },
      {
        src: 'Portfolio B-09.jpg',
        pos: '50% 18%',
        scale: 1.02,
        aspect: '4 / 4.2',
        role: 'detail',
        speed: 1.12,
        label: '02 // INCISIONE STORICA D’ARCHIVIO E MANOSCRITTO CALLIGRAFICO'
      },
      {
        src: 'Portfolio B-09.jpg',
        pos: '50% 58%',
        scale: 1.02,
        aspect: '16 / 11',
        role: 'spread',
        speed: 0.94,
        label: '03 // EDITORIAL WEB UI — MITOLOGIA CLASSICA & PRODUCT SHOWCASE'
      },
      {
        src: 'Portfolio B-09.jpg',
        pos: '50% 88%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // ISPIRAZIONE FIORENTINA (CUPOLA DEL BRUNELLESCHI) & SEZIONE CAD'
      }
    ]
  },

  // =========================================================================
  // 20. VIVA LA VIDA — FRIDA & DIEGO (Portfolio A-08) — CULTURAL MANIFESTO
  // =========================================================================
  {
    id: 'viva-la-vida',
    code: 'A-08',
    sequenceNum: '20',
    title: 'VIVA LA VIDA',
    subtitle: 'Frida e Diego, un Amore — Doppia Declinazione Manifesto Teatrale',
    category: 'poster',
    categoryLabel: '04 // POSTER & CULTURAL CAMPAIGNS',
    year: '2017 // CULTURAL EVENT',
    client: 'Biblioteca Comunale di Jesolo — Volta la Carta',
    density: 'high',
    mockupType: 'poster-3d',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display Italic + Space Grotesk'
    },
    itten: {
      bg: '#631015',
      bgAlt: '#FFFFFF',
      text: '#FCEEEF',
      primary: '#D91E2A',
      secondary: '#2E5A36',
      accent: '#F5B700',
      primaryName: 'Frida Carmine Red',
      secondaryName: 'Mexican Agave Green',
      contrastType: 'Contrasto dei Complementari Botanici (Rosso Carminio ↔ Verde Agave)',
      note: 'La rigogliosa corona simmetrica di felci, agavi, calle e dalie oppone il Verde Botanico al Rosso Carminio passionale della scrittura calligrafica.'
    },
    specs: [
      { label: 'EVENTO', value: 'Reading Letterario e Concerto Acustico' },
      { label: 'VARIANTE 01', value: 'Illustrazione Vettoriale & Collage Botanico' },
      { label: 'VARIANTE 02', value: 'Split-Portrait Fotografico B/N + Calligrafia' },
      { label: 'DATA', value: '18 Febbraio 2017 — Jesolo' }
    ],
    curatorialCopy: 'Doppia direzione artistica per lo spettacolo musicale e letterario dedicato al legame tra Frida Kahlo e Diego Rivera. La prima proposta costruisce un’icona frontale simmetrica avvolta da una flora messicana lussureggiante con Diego impresso sulla fronte di Frida; la seconda fonde i due ritratti storici in bianco e nero sotto un gesto calligrafico rosso sangue.',
    primaryImage: 'Portfolio A-08.jpg',
    slices: [
      {
        src: 'Portfolio A-08.jpg',
        pos: '50% 18%',
        scale: 1.02,
        aspect: '3 / 4',
        role: 'hero',
        speed: 1.0,
        label: '01 // VERSIONE I — SIMMETRIA BOTANICA & ILLUSTRAZIONE VETTORIALE'
      },
      {
        src: 'Portfolio A-08.jpg',
        pos: '50% 78%',
        scale: 1.02,
        aspect: '3 / 4',
        role: 'mockup',
        speed: 1.12,
        label: '02 // VERSIONE II — SPLIT-PORTRAIT FOTOGRAFICO DIEGO / FRIDA'
      },
      {
        src: 'Portfolio A-08.jpg',
        pos: '50% 22%',
        scale: 1.65,
        aspect: '16 / 9',
        role: 'detail',
        speed: 0.94,
        label: '03 // DETTAGLIO MACRO: DIEGO NELLA MENTE DI FRIDA E CORONA FLOREALE'
      }
    ]
  },

  // =========================================================================
  // 21. STORIA E CARATTERI (Portfolio A-13) — TYPOGRAPHIC MONOGRAPH
  // =========================================================================
  {
    id: 'storia-e-caratteri',
    code: 'A-13',
    sequenceNum: '21',
    title: 'LA STORIA E I CARATTERI',
    subtitle: 'Classificazione di Aldo Novarese & Evoluzione Storica della Tipografia',
    category: 'editorial',
    categoryLabel: '02 // EDITORIAL, ZINE & GLITCH ART',
    year: '2016 // TYPOGRAPHIC BOOK',
    client: 'Monografia Tipografica — Venezia',
    density: 'minimal',
    mockupType: 'editorial-spread',
    specialInteraction: 'book-spread',
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond + IBM Plex Mono'
    },
    itten: {
      bg: '#141416',
      bgAlt: '#EAE7E1',
      text: '#F0EDE6',
      primary: '#D8D4CC',
      secondary: '#4A6B82',
      accent: '#D8D4CC',
      primaryName: 'Lead Type Silver & Paper',
      secondaryName: 'Gutenberg Ink Black',
      contrastType: 'Contrasto Chiaro-Scuro Puro (Inchiostro Tipografico ↔ Carta Avorio)',
      note: 'Il rigore monocromatico dell’inchiostro nero su carta avorio celebra l’anatomia delle grazie, delle aste e dell’occhio medio dal XV al XX secolo.'
    },
    specs: [
      { label: 'METODO', value: 'Classificazione di Aldo Novarese' },
      { label: 'EPOCE', value: 'XV Gutenberg, XVI Garamond, XVIII Bodoni' },
      { label: 'MODERNO', value: 'XIX Sec. Rockwell, XX Sec. Helvetica' },
      { label: 'CONCEPT', value: 'Glifi Abitati dalle Scoperte Storiche' }
    ],
    curatorialCopy: 'Opuscolo monografico dedicato alla storia della tipografia secondo la classificazione di Aldo Novarese. Ogni secolo è raccontato attraverso un carattere archetipico — dal Fraktur di Gutenberg al Garamond, dal Bodoni all’Helvetica — i cui glifi giganti si intrecciano con le grandi invenzioni scientifiche del proprio tempo.',
    primaryImage: 'Portfolio A-13.jpg',
    slices: [
      {
        src: 'Portfolio A-13.jpg',
        pos: '50% 52%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // SPREAD XX SECOLO — HELVETICA (MAX MIEDINGER) & ERA SPAZIALE'
      },
      {
        src: 'Portfolio A-13.jpg',
        pos: '50% 3%',
        scale: 1.02,
        aspect: '16 / 8',
        role: 'detail',
        speed: 1.12,
        label: '02 // TABELLA TASSONOMICA DI ALDO NOVARESE & ANATOMIA DEL CARATTERE'
      },
      {
        src: 'Portfolio A-13.jpg',
        pos: '50% 36%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'spread',
        speed: 0.94,
        label: '03 // TAVOLE SINOTTICHE: GARAMOND, ROCKWELL, BASKERVILLE E HELVETICA'
      },
      {
        src: 'Portfolio A-13.jpg',
        pos: '50% 86%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.08,
        label: '04 // ESEMPLARE STAMPATO: XV SEC. GUTENBERG FRAKTUR & BODONI'
      }
    ]
  },

  // =========================================================================
  // 22. CILIUM MARIS & FESTA IN CANEVA (Portfolio B-03) — WINE CAMPAIGN
  // =========================================================================
  {
    id: 'cilium-maris-caneva',
    code: 'B-03',
    sequenceNum: '22',
    title: 'CILIUM MARIS & FESTA IN CANEVA',
    subtitle: 'Prosecco Storico e Campagna Evento tra i Filari — Ceggia (VE)',
    category: 'packaging',
    categoryLabel: '03 // PACKAGING & LABEL SYSTEMS',
    year: '2018 // WINE & EVENT',
    client: 'La Caneva di Giancarlo — Ceggia (VE)',
    density: 'minimal',
    mockupType: 'poster-3d',
    specialInteraction: 'horizontal-pin',
    fonts: {
      display: "'Cormorant Garamond', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Cormorant Garamond Italic + Space Grotesk'
    },
    itten: {
      bg: '#1A261E',
      bgAlt: '#F7F6F2',
      text: '#F2F5F3',
      primary: '#E06D2B',
      secondary: '#1D4E6E',
      accent: '#E06D2B',
      primaryName: 'Vineyard Harvest Orange',
      secondaryName: 'Cilium Maris Nautical Blue',
      contrastType: 'Contrasto dei Complementari (Blu Marino Cilium ↔ Arancio Vendemmia)',
      note: 'Il Blu Nautico dell’etichetta Cilium Maris (antico nome romano di Ceggia legata al mare) dialoga con l’Arancio solare del marchio Festa in Caneva.'
    },
    specs: [
      { label: 'ETICHETTA', value: 'Cilium Maris Prosecco (Galeone Calcografico)' },
      { label: 'EVENTO', value: 'Festa in Caneva! (Edizioni Maggio 2018)' },
      { label: 'STORIA', value: 'Centenario Grande Guerra "Oltre il Reticolato"' },
      { label: 'TERRITORIO', value: 'Via Isonzo, Ceggia — Venezia' }
    ],
    curatorialCopy: 'Doppio intervento per la tenuta vitivinicola La Caneva: il marchio per il Prosecco Cilium Maris — che rievoca le radici marinare del territorio con l’incisione di un veliero antico — e l’immagine coordinata per la rassegna annuale Festa in Caneva tra degustazioni nei vigneti, dj-set e rievocazioni storiche.',
    primaryImage: 'Portfolio B-03.jpg',
    slices: [
      {
        src: 'Portfolio B-03.jpg',
        pos: '50% 12%',
        scale: 1.02,
        aspect: '4 / 3.6',
        role: 'hero',
        speed: 1.0,
        label: '01 // MARCHIO "CILIUM MARIS" PROSECCO CON VELIERO CALCOGRAFICO'
      },
      {
        src: 'Portfolio B-03.jpg',
        pos: '50% 38%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'detail',
        speed: 1.12,
        label: '02 // VISUAL ORIZZONTALE "FESTA IN CANEVA!" SUI FILARI AL SOLE'
      },
      {
        src: 'Portfolio B-03.jpg',
        pos: '50% 78%',
        scale: 1.02,
        aspect: '3 / 4',
        role: 'mockup',
        speed: 0.94,
        label: '03 // MANIFESTO PROGRAMMA 4-5-6 MAGGIO 2018 & CENTENARIO STORICO'
      }
    ]
  },

  // =========================================================================
  // 23. STEP BY STEP GUIDE TO LONDON (Portfolio A-14) — INFOGRAPHIC MAP
  // =========================================================================
  {
    id: 'london-guide-map',
    code: 'A-14',
    sequenceNum: '23',
    title: 'GUIDE TO LONDON — THE OLD SMOKE',
    subtitle: 'Mappa Infografica Pieghevole, Tube System & Data Visualization',
    category: 'poster',
    categoryLabel: '04 // POSTER & CULTURAL CAMPAIGNS',
    year: '2016 // INFOGRAPHIC DESIGN',
    client: 'Progetto Editoriale & Infografico',
    density: 'high',
    mockupType: 'poster-3d',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Space Grotesk', sans-serif",
      body: "'Inter', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Space Grotesk Bold + IBM Plex Mono'
    },
    itten: {
      bg: '#162F54',
      bgAlt: '#EEF1F4',
      text: '#F4F7FA',
      primary: '#D64531',
      secondary: '#162F54',
      accent: '#D64531',
      primaryName: 'London Underground Red',
      secondaryName: 'Royal Piccadilly Blue',
      contrastType: 'Contrasto Caldo-Freddo Istituzionale (Rosso Tube ↔ Blu Royal su Grigio Nebbia)',
      note: 'La bicromia iconica della segnaletica londinese (Rosso/Blu) organizza un’altissima densità di dati statistici, mappe vettoriali e pittogrammi senza mai perdere leggibilità.'
    },
    specs: [
      { label: 'FORMATO', value: 'Pieghevole Pocket a Fisarmonica' },
      { label: 'DATI TUBE', value: '249 Miles, 75 Km/h, 426 Escalators' },
      { label: 'CARTOGRAFIA', value: 'Mappa Linee Tube + Monumenti + Aeroporti' },
      { label: 'UTILITY', value: 'Meteo, Cambio Valuta, Oyster, Emergenze' }
    ],
    curatorialCopy: 'Guida tascabile interamente infografica per orientarsi nella metropoli londinese. Progettata per la piega a fisarmonica (con facciate di copertina e retro opportunamente capovolte), condensa in un’unica griglia modulare la mappa ridisegnata della Tube, i collegamenti aeroportuali, la comparativa tariffaria dei trasporti e i pittogrammi dei monumenti.',
    primaryImage: 'Portfolio A-14.jpg',
    slices: [
      {
        src: 'Portfolio A-14.jpg',
        pos: '50% 14%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // COPERTINA "THE OLD SMOKE", METEO ANNUALE & MAPPA INTEGRALE TUBE'
      },
      {
        src: 'Portfolio A-14.jpg',
        pos: '50% 42%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.12,
        label: '02 // GRAFO AEROPORTI, TOP 10 ATTRAZIONI & SKYLINE VETTORIALE'
      },
      {
        src: 'Portfolio A-14.jpg',
        pos: '50% 72%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 0.94,
        label: '03 // DATA VISUALIZATION: STATISTICHE THE TUBE & COMPARATIVA MEZZI'
      },
      {
        src: 'Portfolio A-14.jpg',
        pos: '50% 92%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'detail',
        speed: 1.06,
        label: '04 // OYSTER CARD, CAMBIO VALUTA, ALLOGGI E PANNELLI CAPOVOLTI DI PIEGA'
      }
    ]
  },

  // =========================================================================
  // 24. ONIRICA — SURREALIST COMPOSITING (Portfolio A-15) — GLITCH / R&D
  // =========================================================================
  {
    id: 'onirica-surrealism',
    code: 'A-15',
    sequenceNum: '24',
    title: 'ONIRICA — SURREALIST R&D',
    subtitle: 'Dallo Sketchbook Analogico alla Fotomanipolazione Surrealista',
    category: 'editorial',
    categoryLabel: '02 // EDITORIAL, ZINE & GLITCH ART',
    year: '2015—2016 // VISUAL RESEARCH',
    client: 'Archivio Sperimentale & Matte Painting',
    density: 'high',
    mockupType: 'editorial-spread',
    specialInteraction: 'glitch-rgb',
    fonts: {
      display: "'Unbounded', sans-serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Unbounded + Space Grotesk'
    },
    itten: {
      bg: '#0B1320',
      bgAlt: '#162235',
      text: '#E2E8F0',
      primary: '#38BDF8',
      secondary: '#F59E0B',
      accent: '#38BDF8',
      primaryName: 'Bioluminescent Nebula Cyan',
      secondaryName: 'Desert Dune Amber',
      contrastType: 'Contrasto Caldo-Freddo Visionario (Azzurro Cosmico ↔ Ambra Deserto)',
      note: 'La serie alterna il calore arido delle dune desertiche e delle luci metropolitane al gelo cosmico delle nebulose e delle onde oceaniche.'
    },
    specs: [
      { label: 'METODO', value: 'Dittico Schizzo a Penna → Matte Painting' },
      { label: 'OPERA 01', value: 'Transatlantico nelle Dune & UFO su Detroit' },
      { label: 'OPERA 02', value: 'Gentleman Asteroide & Tigre d’Acqua' },
      { label: 'TECNICA', value: 'Disegno dal Vero + Compositing Multi-Livello' }
    ],
    curatorialCopy: 'Serie di ricerche visive che documentano il passaggio diretto dal taccuino di schizzi a biro alla fotomanipolazione digitale surrealista. Navi che arano il deserto, dischi volanti sospesi sullo skyline notturno riflesso nel fiume, ritratti magrittiani con teste di meteorite e tigri liquide generate dalla schiuma delle onde.',
    primaryImage: 'Portfolio A-15.jpg',
    slices: [
      {
        src: 'Portfolio A-15.jpg',
        pos: '50% 48%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // COMPOSITING NOTTURNO: UFO SULLO SKYLINE E NEBULOSA STELLARE'
      },
      {
        src: 'Portfolio A-15.jpg',
        pos: '50% 6%',
        scale: 1.02,
        aspect: '16 / 8',
        role: 'spread',
        speed: 1.12,
        label: '02 // DITTICO GENESI: SCHIZZO SU TACCUINO VS YACHT TRA LE DUNE'
      },
      {
        src: 'Portfolio A-15.jpg',
        pos: '50% 68%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'detail',
        speed: 0.94,
        label: '03 // OMAGGIO SURREALISTA (GENTLEMAN ASTEROIDE) E STUDI DI CARATTERE'
      },
      {
        src: 'Portfolio A-15.jpg',
        pos: '50% 90%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'detail',
        speed: 1.08,
        label: '04 // MIMETISMO ELEMENTALE: TIGRE D’ACQUA NELLA TEMPESTA'
      }
    ]
  },

  // =========================================================================
  // 25. SPRING FESTIVAL JESOLO (Portfolio A-10) — COORDINATED FESTIVAL
  // =========================================================================
  {
    id: 'spring-festival-jesolo',
    code: 'A-10',
    sequenceNum: '25',
    title: 'SPRING FESTIVAL JESOLO',
    subtitle: 'Festa di Primavera Jesolo Paese — Campagna Coordinata & Erbario Visivo',
    category: 'poster',
    categoryLabel: '04 // POSTER & CULTURAL CAMPAIGNS',
    year: '2017 // EVENT CAMPAIGN',
    client: 'Città di Jesolo & Radio Piterpan',
    density: 'minimal',
    mockupType: 'poster-3d',
    specialInteraction: 'venetian-sticky',
    fonts: {
      display: "'Playfair Display', serif",
      body: "'Space Grotesk', sans-serif",
      mono: "'IBM Plex Mono', monospace",
      pairingName: 'Playfair Display + Space Grotesk'
    },
    itten: {
      bg: '#FFFFFF',
      bgAlt: '#1B2A38',
      text: '#14181C',
      primary: '#C83228',
      secondary: '#3B6E38',
      accent: '#C83228',
      primaryName: 'Poppy Botanical Red',
      secondaryName: 'Herbarium Leaf Green',
      contrastType: 'Contrasto di Saturazione & Complementari su Bianco Puro (Papavero ↔ Verde Erbario)',
      note: 'Il fondo Bianco Galleria esalta la saturazione fotografica di fiori, semi, agrumi e pigne disposti come un erbario scientifico contemporaneo.'
    },
    specs: [
      { label: 'DATE', value: '7 · 8 · 9 Aprile 2017 — Jesolo Paese' },
      { label: 'PARTNER', value: 'Città di Jesolo, Radio Piterpan, Marina Club' },
      { label: 'SERATE', value: 'Friday Rockabilly, Funky Spaghetti, Sunday' },
      { label: 'SISTEMA', value: 'Key Visual + 4 Locandine Serali + Tabella Orari' }
    ],
    curatorialCopy: 'Sistema di identità visiva per la tre giorni del Spring Festival a Jesolo Paese. Una cornice fotografica d’erbario su fondo bianco puro funge da matrice modulare, cambiando codice cromatico e selezione botanica per identificare ciascuna serata musicale e la mappa sinottica delle postazioni gastronomiche.',
    primaryImage: 'Portfolio A-10.jpg',
    slices: [
      {
        src: 'Portfolio A-10.jpg',
        pos: '50% 13%',
        scale: 1.02,
        aspect: '16 / 10',
        role: 'hero',
        speed: 1.0,
        label: '01 // KEY VISUAL PRINCIPALE CON CORNICE D’ERBARIO FOTOGRAFICO'
      },
      {
        src: 'Portfolio A-10.jpg',
        pos: '50% 43%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'spread',
        speed: 1.12,
        label: '02 // DECLINAZIONI SERALI: FRIDAY ROCKABILLY (VERDE) & FUNKY SPAGHETTI (OCRA)'
      },
      {
        src: 'Portfolio A-10.jpg',
        pos: '50% 67%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'spread',
        speed: 0.94,
        label: '03 // DECLINAZIONI SERALI: MARINA CLUB (MONOCROMO) & SUNDAY PITERPAN (ROSSO)'
      },
      {
        src: 'Portfolio A-10.jpg',
        pos: '50% 92%',
        scale: 1.02,
        aspect: '16 / 9',
        role: 'detail',
        speed: 1.06,
        label: '04 // TABELLA SINOTTICA DEL PROGRAMMA MUSICALE & FOOD/DRINK'
      }
    ]
  }
];
