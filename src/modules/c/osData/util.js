const key = 'pkmList';

// Makes a callout to the api for the list of all pokemon names
let getPokemonList = () => {
    const req = new Request('https://pokeapi.co/api/v2/pokemon?limit=1118');
    return response = fetch(req)
        .then(response => {
            if (!response.ok) {
                throw new Error(response);
            }
            return response.json();
        });
}

// Retrieves the list of all pokemon and caches it
let cachePokemonList = () => {
    return getPokemonList()
        .then(response => {

            // If the response was good, we'll cache the response
            localStorage.setItem(key, JSON.stringify(response));
            return Promise.resolve(true);
        })
        .catch(error => {

            // If the response was bad, we'll output the error
            console.error(`The list query resulted in an error: ${error}`);
            return Promise.resolve(false);
        });
}

// Loads the list if the list is not cached
let loadList = () => {
    let pList = localStorage.getItem(key);

    // If there's no cached value, load and cache the list
    if (!pList) {
        return cachePokemonList()
            .then(() => {
                pList = localStorage.getItem(key);
                return Promise.resolve('42');
            });
    }
    return Promise.resolve('42');
}

// Reduces the list of all pokemon down to the best match
let findPokemon = (pokemon) => {

    // Pull in the pokemon list from the cache
    let pList = JSON.parse(localStorage.getItem(key)).results;

    // Finds the name that has the earliest index of the search string
    const reducer = (previous, current) => {
        let pIndex = previous.name.indexOf(pokemon);
        let cIndex = current.name.indexOf(pokemon);
        if (pIndex < 0) pIndex = 100;
        return (cIndex >= 0 && cIndex < pIndex) ? current : previous;
    };

    // Reduce and return the name
    return pList.reduce(reducer).name;
}

// Makes a callout for the requested pokemon
let makeCallout = (pokemon) => {

    // Match the input string to a valid pokemon name
    pokemon = findPokemon(pokemon.toLowerCase());

    // Fetch the resource
    const req = new Request('https://pokeapi.co/api/v2/pokemon/' + pokemon);
    return fetch(req)
        .then(response => {
            if (!response.ok) {
                throw new Error(response);
            }

            // If the response was a success, then return the json
            return response.json();
        });
}

// This function returns a promise of the requested data
let pokeapiCallout = (pokemon) => {

    // First, we need to load the list of all pokemon
    return loadList()
        .then(() => {

            // Then, we make the callout and return the response
            return makeCallout(pokemon)
                .then(response => {
                    return response;
                });
        });
}

// Returns a string with the first letter capitalized
let capitalize = word => {
    let allWords = word.split('-');
    let ret = "";
    for (let word of allWords) {
        ret += capitalizeWord(word) + " ";
    }
    return ret.substr(0, ret.length - 1);
}

let capitalizeWord = word => {
    let wordBody = word.substring(1);
    return word[0].toUpperCase() + wordBody;
}

export { pokeapiCallout as getPokemon, capitalize };