    // Menu burger 

//1. Sélectionner les éléments
const bouton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

// 2. Écouter le clic
bouton.addEventListener('click', () => {
  // 3. Toggle la classe
  menu.classList.toggle('is-open');
  const isOpen = menu.classList.contains('is-open');
  bouton.setAttribute('aria-expanded', isOpen);
});

//Avec le clavier
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    bouton.focus(); // remettre le focus sur le bouton
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
    modal.classList.remove('is-visible');
    btnOpen.focus();
  }
});

    //Modale accessible 

  //Ouvrir / fermer

const btnOpen = document.querySelector('.modal-open');
const btnClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

btnOpen.addEventListener('click', () => {
  modal.classList.add('is-visible');
});

btnClose.addEventListener('click', () => {
  modal.classList.remove('is-visible');
});


  //Fermer avec Escape

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
    modal.classList.remove('is-visible');
    btnOpen.focus();
  }
});


  //Fermer en cliquant sur l'overlay

modal.addEventListener('click', (event) => {
  // Si le clic est sur le fond (la modale elle-même), pas sur son contenu
  if (event.target === modal) {
    modal.classList.remove('is-visible');
    btnOpen.focus();
  }
});


  //Masque les contenu non intératif ppour l'accèssibilité 

function ouvrirModale() {
  modal.classList.add('is-visible');
  modal.setAttribute('aria-hidden', 'false');
}

function fermerModale() {
  modal.classList.remove('is-visible');
  modal.setAttribute('aria-hidden', 'true');
  btnOpen.focus();
}

btnOpen.addEventListener('click', ouvrirModale);
btnClose.addEventListener('click', fermerModale);

//Thème sombre 

const btnTheme = document.querySelector('#theme-toggle');

btnTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  const isDark = document.body.classList.contains('dark');
  btnTheme.textContent = isDark ? '☀️ Clair' : '🌙 Sombre';
});

