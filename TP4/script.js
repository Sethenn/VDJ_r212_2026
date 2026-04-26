// TP4 — Fetch & API
// Complétez ce fichier en suivant les exercices du sujet.

// ===========================================
// TEMPS 1 — JSON local (exercices 1.1 à 1.3)
// ===========================================

const conteneur = document.querySelector('#projets-liste');

async function chargerEtAfficher() {
  // État : chargement
  conteneur.innerHTML = '<p class="loading">Chargement...</p>';

  try {
    const reponse = await fetch('./data.json');

    if (!reponse.ok) {
      throw new Error(`Erreur HTTP : ${reponse.status}`);
    }

    const donnees = await reponse.json();

    // État : succès
    afficherProjets(donnees.projets);

  } catch (erreur) {
    // État : erreur
    conteneur.innerHTML = `<p class="error">Impossible de charger les données : ${erreur.message}</p>`;
    console.error(erreur);
  }
}

function afficherProjets(projets) {
  conteneur.innerHTML = '';
  projets.forEach((projet) => {
    const carte = document.createElement('article');
    carte.classList.add('carte');
    carte.innerHTML = `
      <h3>${projet.titre}</h3>
      <p>${projet.description}</p>
      <p class="annee">${projet.annee}</p>
      <div class="tags">
        ${projet.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    `;
    conteneur.append(carte);
  });
}

// Lancer au chargement
chargerEtAfficher();


// ===========================================
// TEMPS 2 — API distante (exercices 2.1 à 2.3)
// ===========================================

const api = document.querySelector('#api-liste');
async function chargerPays(ok) {
  ok.innerHTML = '<p class="loading">Chargement du contenu depuis cette API.</p>';

  try {
    const reponse = await fetch('https://restcountries.com/v3.1/region/europe');
    const pays = await reponse.json();

    ok.innerHTML = '';
    pays.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');
      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;
      ok.append(carte);
    });

  } catch (erreur) {
    ok.innerHTML = '<p class="error">Nous ne parvenons pas à récuperés les informations de cette API.</p>';
  }
}

chargerPays(api); 



// ===========================================
// TEMPS 3 — Recherche + API (exercices 3.1 et 3.2)
// ===========================================

const input = document.querySelector('#recherche');
const recherche = document.querySelector('#recherche-resultats');

input.addEventListener('input', async () => {
  const terme = input.value.trim();

  if (terme.length < 2) {
    recherche.innerHTML = '<p>Tapez au moins 2 caractères.</p>';
    return;
  }

  recherche.innerHTML = '<p class="loading">Recherche en cours...</p>';

  try {
    const reponse = await fetch(`https://restcountries.com/v3.1/name/${terme}`);

    if (!reponse.ok) {
      recherche.innerHTML = '<p>Aucun résultat.</p>';
      return;
    }

    const pays = await reponse.json();

     recherche.innerHTML = '';
     pays.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');
      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;
      recherche.append(carte);
    });

  } catch (erreur) {
    recherche.innerHTML = '<p class="error">Erreur de recherche.</p>';
  }
});


// ===========================================
// TEMPS 4 — Bonus (exercices 4.1 à 4.3)
// ===========================================

async function afficherPays(bonus, pays) { //paramètre de la fonction
     bonus.innerHTML = ''; //conteneur
     pays.forEach((p) => {
      const carte = document.createElement('article');
      carte.classList.add('carte');
      carte.innerHTML = `
        <h3>${p.flag} ${p.name.common}</h3>
        <p>Capitale : ${p.capital ? p.capital[0] : 'Inconnue'}</p>
        <p>Population : ${p.population.toLocaleString()}</p>
      `;
      bonus.append(carte);
    });}


let tousPays = [];
const bonus = document.querySelector('#bonus');

async function chargerPays() {
  const reponse = await fetch('https://restcountries.com/v3.1/region/europe');
  tousPays = await reponse.json();
  afficherPays(bonus, pays);
}

// Tri par population (décroissant)
document.querySelector('#tri-pop').addEventListener('click', () => {
  const tries = [...tousPays].sort((a, b) => b.population - a.population);
  afficherPays(bonus, tries);
});

// Tri par nom (alphabétique)
document.querySelector('#tri-nom').addEventListener('click', () => {
  const tries = [...tousPays].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
  afficherPays(bonus, tries);
});

// Filtre > 10 millions
document.querySelector('#filtre-grand').addEventListener('click', () => {
  const grands = tousPays.filter(p => p.population > 10_000_000);
  afficherPays(bonus, grands);
});

// // Réinitialiser essayer
// document.querySelector('#reinitialiser').addEventListener('click', () => {
//     chargerPays(bonus);
// });
