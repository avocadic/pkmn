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
        // Add an event listener to update the image when the dropdown value changes
        dropdown.addEventListener('change', function () {
            updatePokemonImage(dropdown);
        });
    }
    function updatePokemonImage(dropdown) {
        const selectedKey = dropdown.value;
        const pokemon = pokemonData[selectedKey];

        if (pokemon) {
            const baseId = pokemon.base_id.toString().padStart(4, '0');
            const formId = pokemon.form_id.toString().padStart(2, '0');
            const imageName = pokemon.form_name ? `${baseId}_${formId}.png` : `${baseId}.png`;
            const imageUrl = `img/pkmn/${imageName}`;

            // Update the src attribute of the img element
            const imgElement = document.getElementById('pokemon-image');
            imgElement.src = imageUrl;
            imgElement.alt = pokemon.name;
        }
    }
    // Populate each dropdown
    dropdownIds.forEach(id => populateDropdown(id));
});
