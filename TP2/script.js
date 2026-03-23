    // Exercice 1 : Menu burger

  //Étape 1 : Ouvrir / fermer (ok) + Etape 3 mise a jour l'aria-expanded (ok)

  // 1. Sélectionner les éléments
const bouton = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');


  // 2. Écouter le clic
bouton.addEventListener('click', () => {
  // 3. Toggle la classe
  menu.classList.toggle('is-open');
  const isOpen = menu.classList.contains('is-open');
  bouton.setAttribute('aria-expanded', isOpen);
});


    // Étape 2 : Accessibilité clavier (ok)

  // 4. Avec le clavier
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    bouton.focus(); // remettre le focus sur le bouton
  }
});



    // Exercice 2 : Sur le bouton "en savoir plus"

  //Etape 1 : Ouvrir / fermer (ok !)

const btnOpen = document.querySelector('.modal-open');
const btnClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');

btnOpen.addEventListener('click', () => {
  modal.classList.add('is-visible');
});

btnClose.addEventListener('click', () => {
  modal.classList.remove('is-visible');
});


  //Etape 2 : Fermer avec Escape (ca marche!)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('is-visible')) {
    modal.classList.remove('is-visible');
    btnOpen.focus();
  }
});


  //Etape 3 : Fermer en cliquant sur l'overlay (surperposition, ok !)

modal.addEventListener('click', (event) => {
  // Si le clic est sur le fond (la modale elle-même), pas sur son contenu
  if (event.target === modal) {
    modal.classList.remove('is-visible');
    btnOpen.focus();
  }
});


  //Etape 4 : masque les contenu non intératif ppour l'accèssibilité (oki) 

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



    //Exercice 3 : Accordéon 

  //Etape 1 : Déroule les sous-menus pour la FAQ (ok) + Etape 2 : ouvrire et fermer les sous-menus pour la FAQ quand on clique un à un (ok)

const questions = document.querySelectorAll('.faq-question');

  // Etape 1 + 2 (ok)
questions.forEach((question) => {
  question.addEventListener('click', () => {
    const reponse = question.nextElementSibling;
    const estDejaOuverte = reponse.classList.contains('is-visible');
    reponse.classList.toggle('is-visible');

    // Fermer toutes les réponses
    document.querySelectorAll('.faq-answer').forEach((r) => {
      r.classList.remove('is-visible');
    });

    // Si elle n'était pas ouverte, l'ouvrir
    if (!estDejaOuverte) {
      reponse.classList.add('is-visible');
    }
  });
});



    //Exercice 4 : Thème sombre (ok! Trop styler !!!)

const btnTheme = document.querySelector('#theme-toggle');

btnTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  const isDark = document.body.classList.contains('dark');
  btnTheme.textContent = isDark ? '☀️ Clair' : '🌙 Sombre';
});