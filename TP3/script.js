//Exercice 1 : Les infos qui se met en forme en carte

const projets = [
	{ id: 1, titre: "Portfolio", description: "Mon site personnel responsive.", tags: ["HTML", "CSS", "gg"] },
	{ id: 2, titre: "Blog tech", description: "Articles sur le développement web.", tags: ["JS", "API", "gg"] },
	{ id: 3, titre: "App météo", description: "Application de météo en temps réel.", tags: ["JS", "API", "gg"] },
	{ id: 4, titre: "Refonte asso", description: "Nouveau site pour une association.", tags: ["HTML", "CSS", "Figma", "gg"] },
	{ id: 5, titre: "Mini-jeu", description: "Jeu de mémoire en JavaScript.", tags: ["JS", "DOM", "gg"] },
];
const conteneur = document.querySelector('#projets-liste');

function afficherProjets(listeProjets) {
	conteneur.innerHTML = ''; // Vider le conteneur

	listeProjets.forEach((projet) => {
		const carte = document.createElement('article');
		carte.classList.add('carte');

		carte.innerHTML = `
			<h3>${projet.titre}</h3>
			<p>${projet.description}</p>
			<div class="tags">
				${projet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
			</div>
			<button class="btn-supprimer" data-id="${projet.id}">Supprimer</button>
		`;

		conteneur.append(carte);
	});

	document.querySelectorAll('.btn-supprimer').forEach((btn) => {
		btn.addEventListener('click', () => {
			const id = Number(btn.dataset.id);
				const index = projets.findIndex(p => p.id === id);
				projets.splice(index, 1);
					afficherProjets(projets);
					sauvegarder();
			//todo
		});
	});
}



// Affichage initial
afficherProjets(projets);




//Exercice 2 : Les filtres qui marche en appuyent sur les boutons pour trier ce quon veux comme un projet qui a du CSS.
// Exemple le bouton CSS, cela va nous afficher que les fichiers qui ont du CSS. 

//Inconvénient : On ne peut pas choisir plusieurs filtres en meme temps, exemple : CSS + HTML

const boutonsFiltres = document.querySelectorAll('.filtre');

boutonsFiltres.forEach((btn) => {
	btn.addEventListener('click', () => {
		// 1. Mettre à jour le bouton actif
		document.querySelector('.filtre.active').classList.remove('active');
		btn.classList.add('active');

		// 2. Filtrer les données
		const tag = btn.dataset.tag;
		if (tag === 'tous') {
			afficherProjets(projets);
		} else {
			const projetsFiltres = projets.filter(p => p.tags.includes(tag));
			afficherProjets(projetsFiltres);
		}
	});

		const selectTri = document.querySelector('#tri');

			selectTri.addEventListener('change', () => {
  				const valeur = selectTri.value;
					if (valeur === 'az') {
  						projets.sort((a, b) => a.titre.localeCompare(b.titre));
					} else {
  						projets.sort((a, b) => b.titre.localeCompare(a.titre));
				}
				afficherProjets(projets);
				
		});
});





//Exercice 3 : On peux ajouter des projets grâce à ces commandes. Mais quand on fait F5 ont perde les ou le projet(s) ajouter.

const form = document.querySelector('#form-ajout');

form.addEventListener('submit', (event) => {
	event.preventDefault(); // Empêcher le rechargement de la page

	const titre = document.querySelector('#input-titre').value.trim();
	const description = document.querySelector('#input-desc').value.trim();
	const tagsTexte = document.querySelector('#input-tags').value.trim();

	if (!titre || !description) return; // Ne rien faire si vide

	const nouveauProjet = {
		id: projets.length + 1,
		titre: titre,
		description: description,
		tags: tagsTexte ? tagsTexte.split(',').map(t => t.trim()) : [],
	};

	projets.push(nouveauProjet);
	afficherProjets(projets);
	sauvegarder();
	form.reset(); // Vider le formulaire

});




//Exercice 4: On va stocket les projets créer, on ne va plus pourvoir les perdres.

function sauvegarder() {
	localStorage.setItem('projets', JSON.stringify(projets));
}

function charger() {
	const donnees = localStorage.getItem('projets');
	if (donnees) {
		// Remplacer le contenu du tableau (sans réassigner la variable)
		projets.length = 0;
		JSON.parse(donnees).forEach(p => projets.push(p));
	}
}

// Au chargement de la page
charger();
afficherProjets(projets);


