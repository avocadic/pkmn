// JavaScript code to generate the dropdowns
document.addEventListener("DOMContentLoaded", function () {
    // Define the Pokémon options
    const pokemonOptions = ["Bulbasaur", "Charmander", "Squirtle"];
    
    // Get the container for dropdowns
    const container = document.getElementById("dropdown-container");
    
    // Create 6 dropdowns
    for (let i = 1; i <= 6; i++) {
        // Create a select element
        const select = document.createElement("select");

        // Add options to the select element
        pokemonOptions.forEach(pokemon => {
            const option = document.createElement("option");
            option.value = pokemon.toLowerCase();
            option.textContent = pokemon;
            select.appendChild(option);
        });

        // Append the select element to the container
        container.appendChild(select);
    }
});
