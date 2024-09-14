import pokemonData from './pokemon_simple.js';
// Function to populate dropdown menus
function populateDropdowns() {
    // Get all select elements
    const selects = document.querySelectorAll('select');
    // Create an array of Pokémon data sorted by base_id
    const sortedPokemon = Object.values(pokemonData).sort((a, b) => a.base_id - b.base_id);
    // Populate each dropdown
    selects.forEach(select => {
        sortedPokemon.forEach(pokemon => {
            const option = document.createElement('option');
            option.value = pokemon.base_id;
            option.textContent = pokemon.form_name || pokemon.name;
            select.appendChild(option);
        });
    });
}

// Call the function to populate the dropdowns once the document is loaded
document.addEventListener('DOMContentLoaded', populateDropdowns);