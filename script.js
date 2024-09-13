import pokemonData from './pokemon_simple.js';
document.addEventListener("DOMContentLoaded", function () {
    // Get the dropdown element
    const dropdown = document.getElementById('pokemon-dropdown');
    // Loop through the Pokémon data and extract the names
    for (const key in pokemonData) {
        if (pokemonData.hasOwnProperty(key)) {
            const pokemon = pokemonData[key];
            // Create an option element for each Pokémon
            const option = document.createElement('option');
            option.value = key;
            option.textContent = pokemon.form_name || pokemon.name;
            // Add the option to the dropdown
            dropdown.appendChild(option);
        }
    }
});
