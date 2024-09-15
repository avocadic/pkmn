import pokemonData from './pokemon_filtered.js';
import typeData from './type.js';

// Track current selections
let currentSelections = Array.from({ length: 6 }, () => null);

// Dropdown menus
function populateDropdowns() {
    const selects = document.querySelectorAll('select');
    const sortedPokemon = Object.values(pokemonData).sort((a, b) => a.base_id - b.base_id);
    selects.forEach((select, index) => {
        sortedPokemon.forEach(pokemon => {
            const option = document.createElement('option');
            option.value = `${pokemon.base_id}_${pokemon.form_id}`; 
            option.textContent = pokemon.form_name || pokemon.name;
            select.appendChild(option);
        });
        select.addEventListener('change', (event) => {
            const [baseId, formId] = event.target.value.split('_');
            const selectedPokemon = sortedPokemon.find(pokemon => pokemon.base_id == baseId && pokemon.form_id == formId);
            // Update the current selection
            currentSelections[index] = selectedPokemon;
            updateImage(select, selectedPokemon);
            updateTypes(select, selectedPokemon.pokemon_type);
            updateTallies();
        });
    });
}

// Reset all dropdown menus
function resetSelections() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
        select.selectedIndex = 0; // Set to "---" option
    });
    const imagePlaceholders = document.querySelectorAll('.image-placeholder.large, .image-placeholder.small');
    imagePlaceholders.forEach(placeholder => {
        placeholder.style.backgroundImage = 'none';
    });
    currentSelections = Array.from({ length: 6 }, () => null);
    updateTallies(); // Reset tallies
}

// Randomly select options in all dropdowns
function randomSelections() {
    const selects = document.querySelectorAll('select');
    const sortedPokemon = Object.values(pokemonData).sort((a, b) => a.base_id - b.base_id);
    selects.forEach((select, index) => {
        const randomIndex = Math.floor(Math.random() * sortedPokemon.length) - 1;
        select.selectedIndex = randomIndex;
        const selectedValue = select.options[randomIndex].value;
        const [baseId, formId] = selectedValue.split('_');
        const selectedPokemon = sortedPokemon.find(pokemon => pokemon.base_id == baseId && pokemon.form_id == formId);
        currentSelections[index] = selectedPokemon;
        updateImage(select, selectedPokemon);
        updateTypes(select, selectedPokemon.pokemon_type);
    });

    updateTallies(); // Update tallies after random selections
}

document.getElementById('reset').addEventListener('click', resetSelections);
document.getElementById('random').addEventListener('click', randomSelections);

// Main image updater
function updateImage(select, selectedPokemon) {
    const baseIdFormatted = selectedPokemon.base_id.toString().padStart(4, '0');
    const formIdFormatted = selectedPokemon.form_id ? `_${selectedPokemon.form_id.toString().padStart(2, '0')}` : '';
    const imagePath = `img/pkmn/${baseIdFormatted}${formIdFormatted}.png`;
    const box = select.closest('.box');
    const imagePlaceholder = box.querySelector('.image-placeholder.large');
    imagePlaceholder.style.backgroundImage = `url('${imagePath}')`;
    imagePlaceholder.style.backgroundSize = 'cover';
    imagePlaceholder.style.backgroundPosition = 'center';
}

// Type image(s) updater
function updateTypes(select, pokemonTypes) {
    const box = select.closest('.box');
    const typePlaceholders = box.querySelectorAll('.image-placeholder.small');
    typePlaceholders.forEach((placeholder, index) => {
        if (pokemonTypes[index]) {
            const typeImagePath = `img/type/${pokemonTypes[index]}.png`;
            placeholder.style.backgroundImage = `url('${typeImagePath}')`;
            placeholder.style.backgroundSize = 'cover';
            placeholder.style.backgroundPosition = 'center';
        } else {
            placeholder.style.backgroundImage = 'none';
        }
    });
}

// Update tallies based on current selections
function updateTallies() {
    const tallies = document.querySelectorAll('.tally p');
    tallies.forEach(tally => {
        tally.textContent = '0';
        tally.style.color = ''; // Reset color
    });
    let tallyMap = {};
    currentSelections.forEach(selection => {
        if (selection) {
            const { pokemon_type } = selection;
            const typeDataMap = typeData[0].type_data;
            let immune2 = new Set();
            let resist2 = new Set();
            let weak2 = new Set();
            let resist4 = new Set();
            let weak4 = new Set();
            pokemon_type.forEach(type => {
                const typeInfo = typeDataMap[type];
                if (typeInfo.immune2) {
                    typeInfo.immune2.forEach(t => immune2.add(t));
                }
                if (typeInfo.resists) {
                    typeInfo.resists.forEach(t => resist2.has(t) ? resist4.add(t) : resist2.add(t));
                }
                if (typeInfo.weak2) {
                    typeInfo.weak2.forEach(t => weak2.has(t) ? weak4.add(t) : weak2.add(t));
                }
            });
            // Remove resist2/weak2 that are now counted in resist4/weak4
            resist4.forEach(t => resist2.delete(t));
            weak4.forEach(t => weak2.delete(t));
            // Remove weak2/resist2 types that are also in immune2
            immune2.forEach(t => weak2.delete(t));
            immune2.forEach(t => resist2.delete(t));
            // Remove types that are in both resist2 and weak2
            resist2.forEach(t => {
                if (weak2.has(t)) {
                    resist2.delete(t);
                    weak2.delete(t);
                }
            });
            // Accumulate tally values
            immune2.forEach(t => tallyMap[t] = (tallyMap[t] || 0) + 3);
            resist4.forEach(t => tallyMap[t] = (tallyMap[t] || 0) + 2);
            resist2.forEach(t => tallyMap[t] = (tallyMap[t] || 0) + 1);
            weak2.forEach(t => tallyMap[t] = (tallyMap[t] || 0) - 1);
            weak4.forEach(t => tallyMap[t] = (tallyMap[t] || 0) - 2);
        }
    });
    // Update tally boxes
    const typeImages = document.querySelectorAll('.tally img');
    typeImages.forEach(img => {
        const type = img.src.split('/').pop().split('.')[0];
        const tally = document.querySelector(`.tally img[src$="${type}.png"]`).nextElementSibling;
        const tallyValue = tallyMap[type] || 0;
        tally.textContent = tallyValue;
        if (tallyValue >= 3) {
            tally.style.color = '#00af00';
        } else if (tallyValue === 2) {
            tally.style.color = '#007d00';
        } else if (tallyValue === 1) {
            tally.style.color = '#004b00';
        } else if (tallyValue <= -3) {
            tally.style.color = '#e10000';
        } else if (tallyValue === -2) {
            tally.style.color = '#af0000';
        } else if (tallyValue === -1) {
            tally.style.color = '#7d0000';
        }
    });
}

// Call the function to populate the dropdowns once the document is loaded
document.addEventListener('DOMContentLoaded', populateDropdowns);