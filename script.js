/**
 * Exercice : Mini Pokédex
 * @author Steve Fallet <steve.fallet@dvitec.ch>
 * @since 2024-09-01
 */

'use strict';

// Couleurs pour chaque type de Pokémon
const typeColors = {
    'Électrique': '#FFD700',
    'Plante': '#78C850',
    'Poison': '#A040A0',
    'Feu': '#F08030',
    'Eau': '#6890F0',
    'Normal': '#A8A878',
    'Fée': '#EE99AC',
    'Spectre': '#705898',
    'Combat': '#C03028',
    'Vol': '#A890F0',
    'Glace': '#98D8D8',
    'Roche': '#B8A038',
    'Sol': '#E0C068',
    'Psy': '#F85888'
};

// Tableau d'objets représentant les Pokémon
const pokemonsTab = [
    { name: 'Pikachu', type: 'Électrique', level: 35, img: 'pikachu.png' },
    { name: 'Bulbizarre', type: 'Plante,Poison', level: 15, img: 'bulbizarre.png' },
    { name: 'Salamèche', type: 'Feu', level: 20, img: 'salameche.png' },
    { name: 'Carapuce', type: 'Eau', level: 10, img: 'carapuce.png' },
    { name: 'Rondoudou', type: 'Normal,Fée', level: 25, img: 'rondoudou.png' },
    { name: 'Ectoplasma', type: 'Spectre,Poison', level: 45, img: 'ectoplasma.png' },
    { name: 'Évoli', type: 'Normal,Combat', level: 22, img: 'evoli.png' },
    { name: 'Dracaufeu', type: 'Feu,Vol', level: 50, img: 'dracaufeu.png' },
    { name: 'Florizarre', type: 'Plante,Poison', level: 55, img: 'florizarre.png' },
    { name: 'Tortank', type: 'Eau', level: 52, img: 'tortank.png' },
    { name: 'Mélofée', type: 'Fée', level: 18, img: 'melofee.png' },
    { name: 'Raichu', type: 'Électrique', level: 40, img: 'raichu.png' },
    { name: 'Magicarpe', type: 'Eau', level: 5, img: 'magicarpe.png' },
    { name: 'Lokhlass', type: 'Eau,Glace', level: 35, img: 'lokhlass.png' },
    { name: 'Onix', type: 'Roche,Sol', level: 30, img: 'onix.png' },
    { name: 'Ronflex', type: 'Normal', level: 45, img: 'ronflex.png' },
    { name: 'Mewtwo', type: 'Psy', level: 70, img: 'mewtwo.png' }
];

// Couleur par défaut pour les types de Pokémon non définis
const DEFAULT_COLOR = '#ccc';
const pokemonContainer = document.querySelector('.pokemon-container');
const barreRecherche = document.getElementById('search-bar');
const selectionType = document.getElementById('type-filter');
const ordreTri = document.getElementById('sort-order');

function generatePokemonCardHTML(pokemon) {
    let resultat = ``;
        let typesArray = pokemon.type.split(',');
        resultat += `<div class="pokemon-card">`
        if (typesArray.length > 1) {
            resultat += `<div style="background: linear-gradient(to right, ${typeColors[typesArray[0]]} 50%, ${typeColors[typesArray[1]]} 50%);">`
        } else {
            resultat += `<div style="background: ${typeColors[typesArray[0]]}">`
        }
         resultat += `<img src="images/${pokemon.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')}.png" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <div>Type: ${typesArray.join(', ')}</div>
        <div>Niveau: ${pokemon.level}</div>
</div>"`;
    return resultat;
}

// Fonction qui affiche la liste des pokémons.
function displayPokemons(tabPokemons) {
    pokemonContainer.innerHTML = '';

    // S'il n'y a pas de pokémons, afficher un message d'erreur.
    if (tabPokemons.length === 0) {
        pokemonContainer.innerHTML += `<p>Dracaufeu a tout brûlé, aucun pokémon ne correspond à ta recherche !</p>`
    } else {
            // Pour chaque pokémon de la liste, on ajoute son nom et son/ses type(s).
            for (let pokemon of tabPokemons) {
//            let typesArray = pokemon.type.split(',');
//            let typesString = ``;
//            for (let index = 0; index < typesArray.length; index++) {
//                typesString += `<small>${typesArray[index]}</small> `;
//            }
                pokemonContainer.innerHTML += generatePokemonCardHTML(pokemon);
            }
    }
}

function filterAndSortPokemons() {
    const searchQuery = barreRecherche.value.toLowerCase();
    const selectedType = selectionType.value;
    const selectedSortOrder = ordreTri.value;

    let filteredPokemons = pokemonsTab.filter(pokemon => {
        const matchesName = pokemon.name.toLowerCase().includes(searchQuery);
        const matchesType = selectedType === "" || pokemon.type.includes(selectedType);
        return matchesName && matchesType;
    });

    // Trier les Pokémon en fonction du critère sélectionné
    filteredPokemons.sort((a, b) => {
        if (selectedSortOrder === 'name-asc') {
            return a.name.localeCompare(b.name);  // Tri par nom A-Z
        } else if (selectedSortOrder === 'name-desc') {
            return b.name.localeCompare(a.name);  // Tri par nom Z-A
        } else if (selectedSortOrder === 'level-asc') {
            return a.level - b.level;  // Tri par niveau croissant
        } else if (selectedSortOrder === 'level-desc') {
            return b.level - a.level;  // Tri par niveau décroissant
        }
    });
    displayPokemons(filteredPokemons);
}
// Appel de la fonction.
filterAndSortPokemons()

barreRecherche.addEventListener('input', filterAndSortPokemons);
selectionType.addEventListener('change', filterAndSortPokemons);
ordreTri.addEventListener('change', filterAndSortPokemons);