import pokemonData from './pokemon_simple.js';

// List of Pokémon types
const pokemonTypes = [
    'normal', 'fire', 'water', 'grass', 'electric', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic',
    'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

// Dropdown menus
function populateDropdowns() {
    const selects = document.querySelectorAll('select');
    const sortedPokemon = Object.values(pokemonData).sort((a, b) => a.base_id - b.base_id);
    selects.forEach(select => {
        sortedPokemon.forEach(pokemon => {
            const option = document.createElement('option');
            // Use both base_id and form_id as value
            option.value = `${pokemon.base_id}_${pokemon.form_id}`; 
            option.textContent = pokemon.form_name || pokemon.name;
            select.appendChild(option);
        });
    select.addEventListener('change', (event) => {
        const [baseId, formId] = event.target.value.split('_');
        const selectedPokemon = sortedPokemon.find(pokemon => pokemon.base_id == baseId && pokemon.form_id == formId);
        updateImage(select, selectedPokemon);
        updateTypes(select, selectedPokemon.pokemon_type);
        });
    });
}

// Main image updater
function updateImage(select, selectedPokemon) {
    const baseIdFormatted = selectedPokemon.base_id.toString().padStart(4, '0');
    const formIdFormatted = selectedPokemon.form_id ? `_${selectedPokemon.form_id.toString().padStart(2, '0')}` : '';
    const imagePath = `img/pkmn/${baseIdFormatted}${formIdFormatted}.png`;
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

// Populate the second container with type images and text
function populateTypeContainer() {
    const typeContainer = document.querySelector('.type-container');
    pokemonTypes.forEach(type => {
        const typeBox = document.createElement('div');
        typeBox.classList.add('type-box');
        const imagePlaceholder = document.createElement('div');
        imagePlaceholder.classList.add('image-placeholder', 'small');
        imagePlaceholder.style.backgroundImage = `url('img/type/${type}.png')`;
        const typeText = document.createElement('div');
        typeText.classList.add('type-text');
        typeText.textContent = type.charAt(0).toUpperCase() + type.slice(1); // Capitalize type name
        typeBox.appendChild(imagePlaceholder);
        typeBox.appendChild(typeText);
        typeContainer.appendChild(typeBox);
    });
}


// Call the function to populate the dropdowns once the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateDropdowns(); // First container functionality
    populateTypeContainer(); // Second container functionality
});