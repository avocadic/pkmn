import pokemonData from './pokemon_simple.js';
document.addEventListener("DOMContentLoaded", function () {
    // Array of dropdown IDs
    const dropdownIds = [
        'dropdown1', 'dropdown2', 'dropdown3',
        'dropdown4', 'dropdown5', 'dropdown6'
    ];
    // Function to populate a dropdown
    function populateDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        // Clear existing options
        dropdown.innerHTML = '';
        // Loop through the Pokémon data and extract the names or form_names
        for (const key in pokemonData) {
            if (pokemonData.hasOwnProperty(key)) {
                const pokemon = pokemonData[key];
                // Create an option element for each Pokémon
                const option = document.createElement('option');
                option.value = key;
                // Use form_name if it exists, otherwise use name
                option.textContent = pokemon.form_name || pokemon.name;
                // Add the option to the dropdown
                dropdown.appendChild(option);
            }
        }
    }
    // Populate each dropdown ee
    dropdownIds.forEach(id => populateDropdown(id));
});
