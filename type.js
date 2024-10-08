export default [
    {
    "type_data": {
        "normal": {
            "immune2": [ "ghost" ],
            "resists": [],
            "weak2": [ "fighting" ]
        },
        "fighting": {
            "immune2": [],
            "resists": [ "bug", "rock", "dark" ],
            "weak2": [ "flying", "fairy", "psychic" ]
        },
        "flying": {
            "immune2": [ "ground" ],
            "resists": [ "bug", "fighting", "grass" ],
            "weak2": [ "rock", "ice", "electric" ]
        },
        "poison": {
            "immune2": [],
            "resists": [ "fighting", "grass", "bug", "poison", "fairy" ],
            "weak2": [ "psychic", "ground" ]
        },
        "ground": {
            "immune2": [ "electric" ],
            "resists": [ "rock", "poison" ],
            "weak2": [ "ice", "grass", "water" ]
        },
        "rock": {
            "immune2": [],
            "resists": [ "fire", "flying", "poison", "normal" ],
            "weak2": [ "ground", "grass", "fighting", "steel", "water" ]
        },
        "bug": {
            "immune2": [],
            "resists": [ "ground", "fighting", "grass" ],
            "weak2": [ "flying", "rock", "fire" ]
        },
        "ghost": {
            "immune2": [ "fighting", "normal" ],
            "resists": [ "bug", "poison" ],
            "weak2": [ "dark", "ghost" ]
        },
        "steel": {
            "immune2": [ "poison" ],
            "resists": [ "normal", "grass", "bug", "rock", "steel", "flying", "fairy", "psychic", "dragon", "ice" ],
            "weak2": [ "ground", "fire", "fighting" ]
        },
        "fire": {
            "immune2": [],
            "resists": [ "grass", "bug", "fire", "steel", "fairy", "ice" ],
            "weak2": [ "rock", "ground", "water" ]
        },
        "water": {
            "immune2": [],
            "resists": [ "ice", "fire", "steel", "water" ],
            "weak2": [ "electric", "grass" ]
        },
        "grass": {
            "immune2": [],
            "resists": [ "electric", "grass", "ground", "water" ],
            "weak2": [ "bug", "fire", "poison", "flying", "ice" ]
        },
        "electric": {
            "immune2": [],
            "resists": [ "flying", "electric", "steel" ],
            "weak2": [ "ground" ]
        },
        "psychic": {
            "immune2": [],
            "resists": [ "psychic", "fighting" ],
            "weak2": [ "dark", "bug", "ghost" ]
        },
        "ice": {
            "immune2": [],
            "resists": [ "ice" ],
            "weak2": [ "steel", "rock", "fire", "fighting" ]
        },
        "dragon": {
            "immune2": [],
            "resists": [ "grass", "electric", "fire", "water" ],
            "weak2": [ "ice", "dragon", "fairy" ]
        },
        "dark": {
            "immune2": [ "psychic" ],
            "resists": [ "dark", "ghost" ],
            "weak2": [ "bug", "fairy", "fighting" ]
        },
        "fairy": {
            "immune2": [ "dragon" ],
            "resists": [ "bug", "fighting", "dark" ],
            "weak2": [ "poison", "steel" ]
        },
        "null": {
            "immune2": [],
            "resists": [],
            "weak2": []
        }
    }
}]