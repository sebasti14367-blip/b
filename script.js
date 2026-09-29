const MAX_LEAVES = 20;
const LEAF_INTERVAL_MS = 500;
const MUSIC_PLAYLIST = [
  'pvzm1.mp3',
  'pvzm2.mp3',
  'pvzm3.mp3',
  'pvzm4.mp3',
  'pvzm5.mp3'
];

const backgroundMusic = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');
const nextMusicButton = document.getElementById('nextMusicButton');

let musicIndex = 0;

function loadCurrentTrack() {
  if (!backgroundMusic || !MUSIC_PLAYLIST.length) {
    return;
  }

  backgroundMusic.src = MUSIC_PLAYLIST[musicIndex];
  backgroundMusic.load();
}

function setMusicButtonState(isPlaying) {
  if (!musicButton) return;

  musicButton.disabled = false;
  musicButton.textContent = isPlaying ? '⏸' : '▶';
  musicButton.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Reproducir música');
  musicButton.title = isPlaying ? 'Pausar música' : 'Reproducir música';
}

function setMusicErrorState(message) {
  if (!musicButton) return;

  musicButton.disabled = false;
  musicButton.textContent = '!';
  musicButton.setAttribute('aria-label', message);
  musicButton.title = message;
}

function goToNextTrack() {
  if (!MUSIC_PLAYLIST.length) return;

  musicIndex = (musicIndex + 1) % MUSIC_PLAYLIST.length;
  loadCurrentTrack();

  backgroundMusic.play().then(() => {
    setMusicButtonState(true);
  }).catch(() => {
    setMusicButtonState(false);
  });
}

if (backgroundMusic && musicButton && MUSIC_PLAYLIST.length) {
  loadCurrentTrack();
  backgroundMusic.volume = 0.35;

  backgroundMusic.addEventListener('error', () => {
    if (MUSIC_PLAYLIST.length > 1) {
      goToNextTrack();
      return;
    }

    setMusicErrorState('Enlace de música no disponible');
  });

  backgroundMusic.addEventListener('ended', () => {
    goToNextTrack();
  });

  musicButton.addEventListener('click', () => {
    if (!backgroundMusic.paused) {
      backgroundMusic.pause();
      setMusicButtonState(false);
      return;
    }

    backgroundMusic.play()
      .then(() => {
        setMusicButtonState(true);
      })
      .catch(() => {
        setMusicErrorState('No se pudo reproducir la música');
      });
  });

  if (nextMusicButton) {
    nextMusicButton.addEventListener('click', () => {
      goToNextTrack();
    });
  }
} else if (musicButton) {
  musicButton.hidden = true;
}

function crearHoja() {
  const container = document.getElementById('hojitas');
  if (!container || container.children.length >= MAX_LEAVES) {
    return;
  }

  const hoja = document.createElement('div');
  hoja.className = 'hojita';
  hoja.textContent = '🍃';

  const startX = Math.random() * 100;
  hoja.style.left = startX + 'vw';

  const duration = Math.random() * 5 + 8;
  hoja.style.animationDuration = duration + 's';

  const drift = (Math.random() * 1600 - 800) + 'px';
  hoja.style.setProperty('--drift', drift);
  hoja.style.fontSize = (Math.random() * 18 + 26) + 'px';
  hoja.style.opacity = (Math.random() * 0.5 + 0.45).toFixed(2);
  hoja.style.transform = 'translate3d(0, -20px, 0)';

  hoja.addEventListener('animationend', () => {
    if (hoja.parentNode) hoja.remove();
  });

  container.appendChild(hoja);
}

let leafInterval = null;

function startLeafFall() {
  if (leafInterval) return;

  leafInterval = setInterval(() => {
    const container = document.getElementById('hojitas');
    if (!container) return;

    if (container.children.length < MAX_LEAVES) {
      crearHoja();
    }
  }, LEAF_INTERVAL_MS);
}

function stopLeafFall() {
  if (leafInterval) {
    clearInterval(leafInterval);
    leafInterval = null;
  }
}

window.addEventListener('load', function () {
  const intro = document.getElementById('intro');

  setTimeout(() => {
    if (intro) {
      intro.style.opacity = '0';
    }

    setTimeout(() => {
      if (intro) {
        intro.remove();
      }

      startLeafFall();
      for (let i = 0; i < 8; i += 1) {
        crearHoja();
      }
    }, 1200);
  }, 2000);
});

const PLANT_CATALOG = [
  {
    name: 'Keñua',
    type: 'cactus',
    image: 'https://i.pinimg.com/1200x/09/de/e4/09dee4712b6e6ae0c99abce3b362f6d8.jpg',
    info: 'Queñua (Polylepis): Se reconoce por sus ramas retorcidas llenas de carácter y su asombrosa corteza rojiza que se descascara como láminas de papel.'
  },
  {
    name: 'Kiswara',
    type: 'flores',
    image: 'https://blog.gustu.bo/wp-content/uploads/2018/07/KISWARA-2-300x375.jpg',
    info: 'Kishuara / Kiswara (Buddleja coriacea): Forma copas densas y redondeadas. Sus hojas son de un verde oscuro intenso y contrastan con llamativos brotes de flores anaranjadas o amarillentas.'
  },
  {
    name: 'Pino radiata',
    type: 'arboles',
    image: 'https://scontent.flpb2-1.fna.fbcdn.net/v/t39.30808-6/491831414_2076103989565690_3114579581037559612_n.jpg?stp=dst-jpg_tt6&cstp=mx954x1227&ctp=s960x960&_nc_cat=108&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=jIAuaGIIDHkQ7kNvwEIaevW&_nc_oc=AdojECE6dDC_4io3CJOzOWe9L_RpCBrtfvSl5hE2rmpC90wzNEiis75q7C4zKTYoJ8U&_nc_zt=23&_nc_ht=scontent.flpb2-1.fna&_nc_gid=9MCB-kszS_1pZ5rXOV-S4A&_nc_ss=7b289&oh=00_AQIl8GtHxx6akBvoHl5d7cjOd5_BunUeQ6IrUnMDirxpJQ&oe=6AB2F4EF',
    info: 'Crece con una silueta triangular muy frondosa y un follaje denso de color verde vivo que tolera los suelos más difíciles.'
  },
  {
    name: 'Ciprés',
    type: 'hierbas',
    image: 'https://i.pinimg.com/736x/e3/90/93/e390934bb26375583836d1775fc9e52f.jpg',
    info: 'Ciprés (Cupressus macrocarpa): Hay variedades de copa ancha y otras muy espigadas y delgadas (como el ciprés italiano). Ambos se ven mucho en plazas, cementerios y jardines institucionales.'
  },
  {
    name: 'Molle',
    type: 'suculentas',
    image: 'https://blog.gustu.bo/wp-content/uploads/2018/10/MOLLE-OTRA-VEZ-1000x500.jpg',
    info: 'Molle (Schinus molle): Un árbol elegante de ramas colgantes (estilo sauce llorón) que destaca por sus pequeños frutos o "pimientas" rosadas.'
  },
  {
    name: 'Tola tola',
    type: 'arbustos',
    image: 'https://giorgetta.ch/images/flora/baccharis_tola_altiplanicola/baccharis_tola_ssp_altplanicola_dsc_7020s.jpg',
    info: 'Tola Tola (Parastrephia quadrangularis): Crece formando densos matorrales verde-amarillentos muy resistentes a la altitud extrema'
  },
  {
    name: 'Lavanda',
    type: 'lavanda',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    info: 'La lavanda necesita sol intenso, un suelo bien drenado y riego moderado para florecer con aroma y color violeta.'
  },
  {
    name: 'Tomates',
    type: 'tomates',
    image: 'https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=900&q=80',
    info: 'Los tomates requieren mucha luz, fertilizante regular y riego constante para producir frutos sanos, sabrosos y abundantes.'
  },
  {
    name: 'Thola',
    type: 'arbustos',
    image: 'bth1/thola.jfif.jpeg',
    info: 'Baccharis incarum / Parastrephia lepidophylla, arbusto nativo resinoso de porte bajo, muy adaptado a ambientes secos y elevados del altiplano.',
    details: {
      luz: 'Sol directo y exposición fuerte.',
      riego: 'Muy bajo; solo en sequías prolongadas.',
      suelo: 'Pedregoso, seco y bien drenado.',
      especial: 'En El Alto, soporta frío y sequía, pero requiere protección frente a vientos fuertes.'
    
  },
  {
    name: 'Chachacoma',
    type: 'arbustos',
    image: 'bth1/chachacoima.jfif.jpeg',
    extraImage: 'bth1/chachacoima.jpg.jpeg',
    info: 'Escallonia resinosa, arbusto tupido o árbol pequeño andino de hojas pequeñas, brillantes y resinosas.',
    details: {
      luz: 'Sol o semisombra brillante.',
      riego: 'Moderado.',
      suelo: 'Suelto, fértil y bien drenado.',
      especial: 'En El Alto, mantener humedad moderada y proteger ejemplares jóvenes del viento.'
    }
  },
  {
    name: 'Chilca',
    type: 'arbustos',
    image: 'bth1/chilca.jfif.jpeg',
    info: 'Baccharis salicifolia, arbusto silvestre de crecimiento rápido y hojas alargadas y flexibles.',
    details: {
      luz: 'Sol directo.',
      riego: 'Moderado.',
      suelo: 'Húmedo, pero bien drenado.',
      especial: 'En El Alto, necesita más humedad que especies netamente secas y proteger ejemplares juveniles.'
    }
  },
  {
    name: 'Distichia',
    type: 'hierbas',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80',
    info: 'Distichia muscoides, planta altoandina que forma cojines compactos y resistentes en zonas húmedas y frías.',
    details: {
      luz: 'Sol directo.',
      riego: 'Alto; requiere humedad constante.',
      suelo: 'Húmedo, orgánico y bien drenado.',
      especial: 'En El Alto, es ideal para zonas húmedas y soporta muy bien las condiciones de altura.'
    }
  },
  {
    name: 'Totora',
    type: 'hierbas',
    image: 'bth1/totora.jfif.jpeg',
    info: 'Typha domingensis / Schoenoplectus californicus, planta acuática de tallos altos con gran capacidad de purificación natural del agua.',
    details: {
      luz: 'Sol directo.',
      riego: 'Muy alto; con disponibilidad permanente de agua.',
      suelo: 'Húmedo, lodoso y rico en materia orgánica.',
      especial: 'En El Alto, requiere controlar su expansión y mantener humedad constante en la zona.'
    }
  },
  {
    name: 'Eucalipto',
    type: 'arboles',
    image: 'bth1/eucalipto.jpg.jpeg',
    info: 'Eucalyptus globulus, árbol de gran porte y follaje aromático que suele distinguirse por su crecimiento vertical y vigoroso.',
    details: {
      luz: 'Sol fuerte y ventilación constante.',
      riego: 'Moderado.',
      suelo: 'Profundo, suelto y bien drenado.',
      especial: 'En El Alto, proteger ejemplares jóvenes de heladas y dejar espacio suficiente para las raíces.'
    }
  },
  {
    name: 'Álamo blanco',
    type: 'arboles',
    image: 'bth1/alamo_blanco.jpg.jpeg',
    info: 'Populus alba, árbol de tronco claro y hojas con el envés plateado, muy utilizado en avenidas y parques.',
    details: {
      luz: 'Sol directo.',
      riego: 'Moderado a alto.',
      suelo: 'Profundo, fértil y húmedo.',
      especial: 'En El Alto, requiere agua durante la estación seca y espacio suficiente para el sistema radicular.'
    }
  },
  {
    name: 'Sauce llorón',
    type: 'arboles',
    image: 'bth1/sauce_lloron.jpg.jpeg',
    info: 'Salix babylonica / Salix humboldtiana, árbol de ramas pendulares y gran necesidad de humedad.',
    details: {
      luz: 'Sol directo.',
      riego: 'Alto.',
      suelo: 'Profundo, fértil y húmedo.',
      especial: 'En El Alto, debe plantarse en zonas con buen acceso al agua y alejado de tuberías o construcciones.'
    }
  },
  {
    name: 'Olmo',
    type: 'arboles',
    image: 'bth1/olmo.jpg.jpeg',
    info: 'Ulmus minor, árbol caducifolio de copa densa y hojas dentadas, ideal para plazas y avenidas.',
    details: {
      luz: 'Sol o semisombra brillante.',
      riego: 'Moderado.',
      suelo: 'Profundo, fértil y drenado.',
      especial: 'En El Alto, vigilar plagas y reforzar riego durante periodos secos.'
    }
  },
  {
    name: 'Olivo silvestre',
    type: 'arboles',
    image: 'bth1/olivo.jfif.jpeg',
    info: 'Elaeagnus angustifolia, árbol pequeño o arbusto de hojas lanceoladas y flores pequeñas perfumadas.',
    details: {
      luz: 'Sol directo.',
      riego: 'Bajo a moderado.',
      suelo: 'Suelto, arenoso y bien drenado.',
      especial: 'En El Alto, es muy resistente a la sequía y al frío, apropiada para sitios difíciles.'
    }
  },
  {
    name: 'Ligustro',
    type: 'arbustos',
    image: 'bth1/ligustro.JPG.jpeg',
    info: 'Ligustrum vulgare, arbusto perenne tupido muy usado como cerca viva y para dar estructura a jardines.',
    details: {
      luz: 'Sol o semisombra.',
      riego: 'Moderado.',
      suelo: 'Fértil, suelto y drenado.',
      especial: 'En El Alto, requiere poda regular y control de crecimiento para mantener su forma.'
    }
  },
  {
    name: 'Geranios',
    type: 'flores',
    image: 'bth1/geranio.jfif.jpeg',
    info: 'Pelargonium spp., plantas ornamentales de flores vistosas en rojos, rosas y blancos, ideales para patios y macetas.',
    details: {
      luz: 'Sol o semisombra brillante.',
      riego: 'Moderado.',
      suelo: 'Ligero, fértil y muy drenado.',
      especial: 'En El Alto, protegerlos durante noches muy frías y evitar exceso de humedad.'
    }
  },
  {
    name: 'Pensamientos',
    type: 'flores',
    image: 'https://blog.gustu.bo/wp-content/uploads/2018/07/KISWARA-2-300x375.jpg',
    info: 'Viola × wittrockiana, flor ornamental de bajo porte con colores combinados y gran resistencia al frío.',
    details: {
      luz: 'Sol suave o semisombra.',
      riego: 'Moderado.',
      suelo: 'Fértil, húmedo y bien drenado.',
      especial: 'En El Alto, mantener humedad moderada y proteger durante heladas extremas.'
    }
  },
  {
    name: 'Margaritas',
    type: 'flores',
    image: 'https://blog.gustu.bo/wp-content/uploads/2018/07/KISWARA-2-300x375.jpg',
    info: 'Bellis perennis / Leucanthemum vulgare, herbáceas de flores blancas y centro amarillo muy comunes en jardines urbanos.',
    details: {
      luz: 'Sol o semisombra.',
      riego: 'Moderado.',
      suelo: 'Fértil, suelto y bien drenado.',
      especial: 'En El Alto, proteger plantas jóvenes y evitar encharcamientos.'
    }
  },
  {
    name: 'Caléndula',
    type: 'flores',
    image: 'https://blog.gustu.bo/wp-content/uploads/2018/07/KISWARA-2-300x375.jpg',
    info: 'Calendula officinalis, planta herbácea de flores amarillas y naranjas muy útil tanto decorativamente como medicinalmente.',
    details: {
      luz: 'Sol directo.',
      riego: 'Moderado.',
      suelo: 'Fértil, ligero y bien drenado.',
      especial: 'En El Alto, retirar flores marchitas y mantener un riego moderado para sostener la floración.'
    }
  },
  {
    name: 'Alhelí',
    type: 'flores',
    image: 'https://blog.gustu.bo/wp-content/uploads/2018/07/KISWARA-2-300x375.jpg',
    info: 'Matthiola incana, planta de tallos leñosos en la base y flores con aroma intenso en tonos violetas, blancas o rosas.',
    details: {
      luz: 'Sol o semisombra.',
      riego: 'Moderado.',
      suelo: 'Fértil, ligero y drenado.',
      especial: 'En El Alto, ubicarla en lugares protegidos del viento y de heladas intensas.'
    }
  }
];

let activePlantType = 'all';
let selectedType = null;

function resetTypeFilter() {
  selectedType = null;
  activePlantType = 'all';

  const typeGrid = document.getElementById('typeGrid');
  const typePreview = document.getElementById('typePreview');

  if (typeGrid) typeGrid.style.display = 'grid';
  if (typePreview) {
    typePreview.style.display = 'none';
    typePreview.innerHTML = '';
  }

  typeCards.forEach((item) => item.classList.remove('active'));
  updateDetail('arboles');
}

function renderPlantCards() {
  const slider = document.getElementById('plantSlider');
  if (!slider) return;

  const filteredPlants = activePlantType === 'all'
    ? PLANT_CATALOG
    : PLANT_CATALOG.filter((plant) => plant.type === activePlantType);

  slider.innerHTML = filteredPlants.map((plant) => {
    const safeImage = plant.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80';
    return `
      <article class="plant-card" data-name="${plant.name}" data-type="${plant.type}" data-info="${plant.info}" data-image="${safeImage}" style="background-image: linear-gradient(rgba(18, 46, 27, 0.15), rgba(18, 46, 27, 0.42)), url('${safeImage}');">
        <div class="plant-info"><strong>${plant.name}</strong></div>
      </article>
    `;
  }).join('');

  const plantCards = document.querySelectorAll('.plant-card');
  plantCards.forEach((card) => {
    card.addEventListener('click', () => {
      const modal = document.getElementById('plantModal');
      const modalImage = document.getElementById('modalPlantImage');
      const modalName = document.getElementById('modalPlantName');
      const modalInfo = document.getElementById('modalPlantInfo');

      if (!modal || !modalImage || !modalName || !modalInfo) return;

      modalName.textContent = card.dataset.name || 'Planta';
      modalImage.src = card.dataset.image || '';
      modalImage.alt = card.dataset.name || 'Planta';
      modalInfo.textContent = card.dataset.info || 'Información no disponible.';
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.transition = 'transform 0.25s ease';
        mainContent.style.transform = 'translateX(74px)';
      }
      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
}

const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.panel');
const homeView = document.getElementById('homeView');
const closeTypeSelector = document.getElementById('closeTypeSelector');

function showHomeView() {
  tabButtons.forEach((btn) => btn.classList.remove('active'));
  panels.forEach((panel) => panel.classList.remove('active'));

  if (homeView) {
    homeView.classList.add('active');
  }
}

function showTab(target) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.panel === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === target);
  });

  if (homeView) {
    homeView.classList.toggle('active', target === 'home');
  }
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.dataset.panel;
    showTab(target);
  });
});

if (closeTypeSelector) {
  closeTypeSelector.addEventListener('click', () => {
    resetTypeFilter();
    showHomeView();
  });
}

const resetTypeSelectionButton = document.getElementById('resetTypeSelection');
if (resetTypeSelectionButton) {
  resetTypeSelectionButton.addEventListener('click', () => {
    resetTypeFilter();
  });
}

renderPlantCards();

const plantModal = document.getElementById('plantModal');
const closePlantModal = document.getElementById('closePlantModal');

if (closePlantModal && plantModal) {
  closePlantModal.addEventListener('click', () => {
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.transition = 'transform 0.25s ease';
      mainContent.style.transform = 'translateX(0)';
    }
    plantModal.classList.add('hidden');
    plantModal.setAttribute('aria-hidden', 'true');
  });
}

const plantData = {
  arboles: {
    title: 'Árboles',
    text: 'Los árboles necesitan luz indirecta, riego moderado y suelo con buen drenaje para crecer sanos.'
  },
  flores: {
    title: 'Flores',
    text: 'Las flores suelen necesitar sol directo, agua constante y atención a la humedad del suelo.'
  },
  cactus: {
    title: 'Cactus',
    text: 'Los cactus son muy resistentes y requieren poca agua, mucho sol y tierra muy seca.'
  },
  arbustos: {
    title: 'Arbustos',
    text: 'Los arbustos prefieren un lugar luminoso y necesitan poda ligera para mantener su forma.'
  },
  suculentas: {
    title: 'Suculentas',
    text: 'Las suculentas almacenan agua y necesitan poca frecuencia de riego, pero mucha luz.'
  },
  hierbas: {
    title: 'Hierbas',
    text: 'Las hierbas necesitan humedad constante, sol y un cuidado regular para crecer aromáticas.'
  },
  lavanda: {
    title: 'Lavanda',
    text: 'La lavanda necesita sol, buen drenaje y riego moderado para florecer con intensidad.'
  },
  tomates: {
    title: 'Tomates',
    text: 'Los tomates necesitan mucha luz, riego constante y nutrientes para producir fruto saludable.'
  },
  bonsai: {
    title: 'Bonsai',
    text: 'Los bonsai requieren poda constante, luz indirecta y un cuidado regular para mantener su forma.'
  },
  orquideas: {
    title: 'Orquídeas',
    text: 'Las orquídeas prefieren luz brillante pero indirecta y un riego cuidadoso para no encharcar.'
  },
  helechos: {
    title: 'Helechos',
    text: 'Los helechos aman la humedad, la sombra parcial y el suelo siempre ligeramente húmedo.'
  },
  medicinales: {
    title: 'Medicinales',
    text: 'Las plantas medicinales necesitan un lugar luminoso, cuidado constante y un suelo bien tratado.'
  },
  frutales: {
    title: 'Frutales',
    text: 'Las plantas frutales requieren más luz, riego regular y nutrientes para producir frutos sanos.'
  },
  bonsai: {
    title: 'Bonsai',
    text: 'Los bonsai necesitan poda constante, luz indirecta y un cuidado más preciso para mantener su forma.'
  },
  hiedras: {
    title: 'Hiedras',
    text: 'Las hiedras prefieren humedad y sombra suave, y necesitan soporte para crecer bien en vertical.'
  },
  jardineria: {
    title: 'Jardinería',
    text: 'La jardinería incluye plantas ornamentales, hierbas y flores que necesitan mantenimiento constante.'
  },
  accesorios: {
    title: 'Accesorios',
    text: 'Los accesorios ayudan a mantener la planta sana con macetas, tierra, guías y herramientas básicas.'
  }
};

const typeCards = document.querySelectorAll('.type-card');
const detailTitle = document.getElementById('detailTitle');
const detailText = document.getElementById('detailText');
const typePreview = document.getElementById('typePreview');
const typeSearch = document.getElementById('typeSearch');
const gallerySearch = document.getElementById('gallerySearch');
const searchInput = document.getElementById('searchInput');
const plantCards = document.querySelectorAll('.plant-card');

function normalizeText(value = '') {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function renderTypePreview(type) {
  if (!typePreview) return;

  const matches = PLANT_CATALOG.filter((plant) => plant.type === type);

  if (!matches.length) {
    typePreview.innerHTML = '';
    typePreview.style.display = 'none';
    return;
  }

  typePreview.innerHTML = matches.map((plant) => `
    <div class="type-preview-item" data-name="${plant.name}" data-type="${plant.type}" data-info="${plant.info}" data-image="${plant.image}" style="background-image: url('${plant.image || 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80'}');">
      <span>${plant.name}</span>
    </div>
  `).join('');

  typePreview.querySelectorAll('.type-preview-item').forEach((item) => {
    item.addEventListener('click', () => {
      const modal = document.getElementById('plantModal');
      const modalImage = document.getElementById('modalPlantImage');
      const modalName = document.getElementById('modalPlantName');
      const modalInfo = document.getElementById('modalPlantInfo');

      if (!modal || !modalImage || !modalName || !modalInfo) return;

      modalName.textContent = item.dataset.name || 'Planta';
      modalImage.src = item.dataset.image || '';
      modalImage.alt = item.dataset.name || 'Planta';
      modalInfo.textContent = item.dataset.info || 'Información no disponible.';

      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.style.transition = 'transform 0.25s ease';
        mainContent.style.transform = 'translateX(74px)';
      }

      modal.classList.remove('hidden');
      modal.setAttribute('aria-hidden', 'false');
    });
  });
}

function toggleTypeSelection(type) {
  const typeGrid = document.getElementById('typeGrid');

  if (selectedType === type) {
    selectedType = null;
    activePlantType = 'all';
    if (typeGrid) typeGrid.style.display = 'grid';
    if (typePreview) typePreview.style.display = 'none';
    typePreview.innerHTML = '';
    updateDetail('arboles');
    return;
  }

  selectedType = type;
  activePlantType = type;

  typeCards.forEach((item) => {
    const isActive = item.dataset.type === type;
    item.classList.toggle('active', isActive);
  });

  if (typeGrid) typeGrid.style.display = 'none';
  if (typePreview) {
    typePreview.style.display = 'grid';
    renderTypePreview(type);
  }

  updateDetail(type);
}

function applyLiveSearch(query) {
  const normalized = normalizeText(query.trim());
  const cards = document.querySelectorAll('.plant-card');

  cards.forEach((card) => {
    const name = normalizeText(card.dataset.name || '');
    const type = normalizeText(card.dataset.type || '');
    const match = !normalized || name.includes(normalized) || type.includes(normalized);
    card.style.display = match ? 'block' : 'none';
  });

  typeCards.forEach((card) => {
    const name = normalizeText(card.textContent || '');
    const match = !normalized || name.includes(normalized);
    card.style.display = match ? 'flex' : 'none';
  });
}

function updateDetail(type) {
  const info = plantData[type];
  if (!info) return;

  detailTitle.textContent = info.title;
  detailText.textContent = info.text;
}

typeCards.forEach((card) => {
  card.addEventListener('click', () => {
    const type = card.dataset.type || 'all';

    if (selectedType === type) {
      resetTypeFilter();
      return;
    }

    toggleTypeSelection(type);
  });
});

if (typeSearch) {
  typeSearch.addEventListener('input', () => {
    const query = normalizeText(typeSearch.value);

    typeCards.forEach((card) => {
      const name = normalizeText(card.textContent || '');
      const match = !query || name.includes(query);
      card.style.display = match ? 'flex' : 'none';
    });

    if (activePlantType !== 'all') {
      renderTypePreview(activePlantType);
    }
  });
}

if (gallerySearch) {
  gallerySearch.addEventListener('input', () => {
    const query = normalizeText(gallerySearch.value.trim());
    applyLiveSearch(query);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = normalizeText(searchInput.value.trim());
    applyLiveSearch(query);
  });
}

const typeGrid = document.getElementById('typeGrid');
if (typeGrid) typeGrid.style.display = 'grid';
if (typePreview) typePreview.style.display = 'none';
updateDetail('arboles');
applyLiveSearch('');
