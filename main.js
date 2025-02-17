const prompt = require("prompt-sync")();
// Introduction
// jeu de combat en mode console 
// deux entités = "Guerrier du Feu" et le "Sombre Lutin", s'affrontent à l'aide d'attaques prédéfinies. 
// L'objectif est de permettre au joueur de choisir une attaque à chaque tour, d'infliger des dégâts à l'adversaire et de remporter le combat 
// en réduisant les points de vie (PV) de l'adversaire à zéro. Le jeu sera exécutable en ligne de commande grâce à Node.js.

// Déroulement du Combat :
// Le joueur et l'ordinateur (Sombre Lutin) s'affrontent tour à tour.
// À chaque tour, le joueur choisit une attaque parmi les quatre attaques disponibles pour le Guerrier du Feu.
// L'ordinateur choisit une attaque pour le Sombre Lutin de manière aléatoire.

// Caractéristiques des Attaques :
// Chaque attaque a une puissance de frappe spécifique (en PV) et une probabilité de toucher.
// Les attaques peuvent infliger des dégâts ou soigner le combattant selon le cas.
// Liste des Attaques Disponibles

// Attaque 1 :
// Nom: Frappe Rapide
// Puissance: 10 PV
// Précision: 50% (1 chance sur 2 de toucher)

// Attaque 2 :
// Nom: Soin Léger
// Puissance: Soigne 15 PV
// Précision: 33.33% (1 chance sur 3 de toucher)

// Attaque 3 :
// Nom: Coup Puissant
// Puissance: 20 PV
// Précision: 33.33% (1 chance sur 3 de toucher)

// Attaque 4 :
// Nom: Frappe Dévastatrice
// Puissance: 30 PV
// Précision: 25% (1 chance sur 4 de toucher)

// Affichage en Mode Console :
// Afficher le nom et les PV restants de chaque entité à chaque tour.
// Afficher les options d'attaque disponibles pour le joueur.
// Afficher les attaques effectuées par chaque combattant et les dommages infligés.

// Gestion des Dommages et de la Santé :
// Calculer les dégâts infligés à l'adversaire en fonction de la puissance de l'attaque et de la
// probabilité de toucher.
// Gérer la santé des entités en fonction des dégâts reçus.

// Fin du Combat :
// Le combat se termine lorsque les PV de l'une des entités (le joueur ou le Sombre Lutin) atteignent zéro.
// Afficher un message indiquant le vainqueur du combat.

// Interface Utilisateur :
// Guider l'utilisateur tout au long du combat avec des messages informatifs et des invitations à choisir une attaque.

// Livraisons Attendues :
// Code source du jeu correctement commenté et structuré.
// Le jeu doit être capable de gérer des erreurs d'entrée utilisateur et de guider le joueur pour qu'il
// fasse un choix valide.

//les types d'attaques
let attaques = [
    { attaque: "frappe rapide", puissance: 10, précision: 2 }, //1 chance sur 2
    { attaque: "soin léger", puissance: -15, précision: 3 }, //1 chance sur 3; -15 car il soigne 15 pv
    { attaque: "coup puissant", puissance: 20, précision: 3 }, //1 chance sur 3
    { attaque: "frappe dévastatrice", puissance: 30, précision: 4 } //1 chance sur 4
]

//la fonction pour avoir une attaque aléatoire 
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
} // Pour convertir la valeur à virgule flottante en entier, nous devons utiliser la fonction Math.floor() : https://www.delftstack.com/fr/howto/javascript/javascript-pick-random-from-array/

//les variables joueurs (1 vrai joueur + l'ordi)
let joueur = { nom: "Guerrier du Feu", pv: 1000 }
let ordinateur = { nom: "Sombre Lutin", pv: 1000 }

//la fonction pour choisir une des 4 attaques
function choixAttaque() {
    console.log("Tu peux choisir quelle attaque tu souhaites infliger à ton adversaire!");

    for (let i = 0; i < attaques.length; i++) {
        let attaque = attaques[i]
        console.log(i + 1 + " " + attaque.attaque + " attaque " + attaque.puissance + " puissance " + attaque.précision + " précision ");
    }
}
//le joueur doit faire le choix d'un attaque
choixAttaque()

let choice = Number(prompt("Il faut choisir une attaque (1, 2, 3 ou 4)"))

while (choice) {
    if (choice !== 1 && choice !== 2 && choice !== 3 && choice !== 4) {
        console.log("Oupsssss, choix invalide")
        choice = Number(prompt("Il faut choisir une attaque (1, 2, 3 ou 4)"))
    }
}

//l'attaque choisie prise en compte

let attaqueChoisie = attaques[choice - 1]

//tirage au sort

let aléatoire = randomize(1, attaqueChoisie.précision) === 1;

console.log("Tu as choisi l'attaque " + attaqueChoisie.attaque);

if (aléatoire.attaqueChoisie.puissance < 0) {
    joueur.pv -= attaqueChoisie.puissance;
    console.log("Et bravo! Tu reprends " + -attaqueChoisie.puissance + "PV");
} else {
    console.log("Oupsssss ton attaque a été défaiante! ");
}

console.log("PV de " + joueur.nom + " : " + joueur.pv);
console.log("PV de " + ordinateur.nom + " : " + ordinateur.pv);
