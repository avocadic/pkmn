import pokemonData from './pokemon_simple.js';

// Dropdown menus
function populateDropdowns() {
    const selects = document.querySelectorAll('select');
    const sortedPokemon = Object.values(pokemonData).sort((a, b) => a.base_id - b.base_id);
    selects.forEach(select => {
        sortedPokemon.forEach(pokemon => {
            const option = document.createElement('option');
            option.value = pokemon.base_id;
            option.textContent = pokemon.form_name || pokemon.name;
            select.appendChild(option);
        });
    select.addEventListener('change', (event) => {
        const selectedPokemon = sortedPokemon.find(pokemon => pokemon.base_id == event.target.value);
        updateImage(select, selectedPokemon);
        updateTypes(select, selectedPokemon.pokemon_type);
        });
    });
}

// Main image updater
function updateImage(select, selectedPokemon) {
    const baseIdFormatted = selectedPokemon.base_id.toString().padStart(4, '0');
    const imagePath = `img/pkmn/${baseIdFormatted}.png`;
    // Find the box that contains the selection
    const box = select.closest('.box');
    const imagePlaceholder = box.querySelector('.image-placeholder.large');
    // Set the image source
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
            // Clear the background if there is no type for this index
            placeholder.style.backgroundImage = 'none';
        }
    });
}

// Call the function to populate the dropdowns once the document is loaded
document.addEventListener('DOMContentLoaded', populateDropdowns);