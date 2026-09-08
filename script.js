const MAX_LEAVES = 20;
const LEAF_INTERVAL_MS = 500;

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
    showHomeView();
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
const typeSearch = document.getElementById('typeSearch');
const gallerySearch = document.getElementById('gallerySearch');
const searchInput = document.getElementById('searchInput');
const plantCards = document.querySelectorAll('.plant-card');

function applyLiveSearch(query) {
  const normalized = query.trim().toLowerCase();

  plantCards.forEach((card) => {
    const name = (card.dataset.name || '').toLowerCase();
    const match = !normalized || name.includes(normalized);
    card.style.display = match ? 'block' : 'none';
  });

  typeCards.forEach((card) => {
    const name = card.textContent.toLowerCase();
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
    typeCards.forEach((item) => item.classList.toggle('active', item === card));
    updateDetail(card.dataset.type);
  });
});

if (typeSearch) {
  typeSearch.addEventListener('input', () => {
    const query = typeSearch.value.toLowerCase();

    typeCards.forEach((card) => {
      const name = card.textContent.toLowerCase();
      const match = name.includes(query);
      card.style.display = match ? 'flex' : 'none';
    });
  });
}

if (gallerySearch) {
  gallerySearch.addEventListener('input', () => {
    const query = gallerySearch.value.trim().toLowerCase();
    applyLiveSearch(query);
  });
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    applyLiveSearch(query);
  });
}

applyLiveSearch('');
