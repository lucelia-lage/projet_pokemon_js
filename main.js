const prompt = require("prompt-sync")();

// attaques disponibles : 
let attaques = [
    { attaque: "frappe rapide", puissance: 10, précision: 2 },       
    { attaque: "soin léger", puissance: -15, précision: 3 }, // puissance négative pour le soin        
    { attaque: "coup puissant", puissance: 20, précision: 3 },      
    { attaque: "frappe dévastatrice", puissance: 30, précision: 4 }  
];

// Fonction pour générer un nmb aléatoire
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// (joueur + ordinateur)
let joueur = { nom: "Guerrier du Feu", pv: 50 };
let ordinateur = { nom: "Sombre Lutin", pv: 50 };

// Affiche les attaques disponibles :
function choixAttaque() {
    console.log("Voici les attaques disponibles :");
    for (let i = 0; i < attaques.length; i++) {
        let attaque = attaques[i];
        console.log(`${i + 1}. ${attaque.attaque} (puissance: ${attaque.puissance}, précision: 1/${attaque.précision})`);
    }
}

// Choix aléatoire d'une attaque pour l'ordinateur : 
function choixAttaqueOrdi() {
    let choix = randomize(1, attaques.length) - 1;
    return attaques[choix];
}

// Affiche les PV :
function tourAttaque() {
    console.log(`\n État du combat: `);
    console.log(`${joueur.nom} - PV : ${joueur.pv}`);
    console.log(`${ordinateur.nom} - PV : ${ordinateur.pv}`);
}

// Boucle principale du jeu :
while (joueur.pv > 0 && ordinateur.pv > 0) {
    tourAttaque();
    choixAttaque();

    let choice = Number(prompt("Choisis une attaque (1, 2, 3 ou 4) : "));

    // Validation de l'entrée : 
    while (![1, 2, 3, 4].includes(choice)) { // includes vérifie si le choix est valide
        console.log("Oups, choix invalide !");
        choice = Number(prompt("Choisis une attaque (1, 2, 3 ou 4) : "));
    }

    // Tour du joueur : 
    let attaqueChoisie = attaques[choice - 1];
    let réussite = randomize(1, attaqueChoisie.précision) === 1;

    console.log(`\n Tu as choisi : ${attaqueChoisie.attaque}`);

    if (réussite) {
        if (attaqueChoisie.puissance < 0) {
            joueur.pv -= attaqueChoisie.puissance;
            console.log(`Tu t'es soigné de ${-attaqueChoisie.puissance} PV !`);
        } else {
            ordinateur.pv -= attaqueChoisie.puissance;
            console.log(`Tu as infligé ${attaqueChoisie.puissance} dégâts à l'adversaire !`);
        }
    } else {
        console.log("Ton attaque a échoué !");
    }

    // Tour de l'ordinateur si encore en vie : 
    if (ordinateur.pv > 0) {
        let attaqueOrdi = choixAttaqueOrdi();
        let réussiteOrdi = randomize(1, attaqueOrdi.précision) === 1;

        console.log(`\n Le Sombre Lutin tente : ${attaqueOrdi.attaque}`);

        if (réussiteOrdi) {
            if (attaqueOrdi.puissance < 0) {
                ordinateur.pv -= attaqueOrdi.puissance;
                console.log(` Le lutin se soigne de ${-attaqueOrdi.puissance} PV.`);
            } else {
                joueur.pv -= attaqueOrdi.puissance;
                console.log(` Le lutin t'inflige ${attaqueOrdi.puissance} dégâts !`);
            }
        } else {
            console.log(" L'attaque du lutin a échoué !");
        }
    }

    console.log(`\n PV de ${joueur.nom} : ${joueur.pv}`);
    console.log(` PV de ${ordinateur.nom} : ${ordinateur.pv}`);
}

// Fin du jeu : 
if (joueur.pv <= 0) {
    console.log(" Tu as perdu ! Le Sombre Lutin a gagné...");
} else {
    console.log(" Victoire ! Tu as vaincu le Sombre Lutin !");
}
