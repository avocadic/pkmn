import pokemonData from './pokemon_simple.js';
document.addEventListener("DOMContentLoaded", function () {
    // Array of dropdowns
    const dropdowns = [
        { dropdownId: 'dropdown1', infoId: 'info1' },
        { dropdownId: 'dropdown2', infoId: 'info2' },
        { dropdownId: 'dropdown3', infoId: 'info3' },
        { dropdownId: 'dropdown4', infoId: 'info4' },
        { dropdownId: 'dropdown5', infoId: 'info5' },
        { dropdownId: 'dropdown6', infoId: 'info6' }
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
    // Function to update info based on selected value
    function updateInfo(dropdownId, infoId) {
        const dropdown = document.getElementById(dropdownId);
        const info = document.getElementById(infoId);
        const selectedKey = dropdown.value;
        const pokemon = pokemonData[selectedKey];

        if (pokemon) {
            // Format base_id as a four-digit number
            const baseIdFormatted = pokemon.base_id.toString().padStart(4, '0');
            // Get pokemon_type values
            const pokemonType = pokemon.pokemon_type ? pokemon.pokemon_type.join(', ') : '';

            // Update the info element
            info.innerHTML = `Base ID: ${baseIdFormatted}<br>Types: ${pokemonType}`;
        } else {
            info.innerHTML = '';
        }
    }

    // Populate each dropdown and add event listeners
    dropdowns.forEach(({ dropdownId, infoId }) => {
        populateDropdown(dropdownId);
        document.getElementById(dropdownId).addEventListener('change', () => {
            updateInfo(dropdownId, infoId);
        });
    });

    // Initialize info display for all dropdowns
    dropdowns.forEach(({ dropdownId, infoId }) => {
        updateInfo(dropdownId, infoId);
    });
});