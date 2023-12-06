class Pokemon {
    constructor(name, frontImage, types, stats) {
        this.name = name;
        this.frontImage = frontImage;
        this.types = types;
        this.stats = stats;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("button");

    const containers = document.querySelectorAll('.pokemon-container');
    const pokemons = [];

    const getPokemonData = async (randomNumber) => {
        const requestString = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
        const data = await fetch(requestString);
        return await data.json();
    };

    const createPokemonObject = (data) => {
        const name = data.name;
        const frontImage = data.sprites.front_default;
        const types = data.types.map(type => type.type.name);
        const stats = data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
        }));
        return new Pokemon(name, frontImage, types, stats);
    };

    const updatePokemonInfo = (pokemon, container) => {
        const [image, number, name, type, stats] = container.children;

        image.src = pokemon.frontImage;
        number.textContent = `#${pokemon.id}`;
        name.textContent = pokemon.name;
        type.textContent = pokemon.types.join('/');

        // Affiche les statistiques sous forme de chaîne (nom: valeur)
        stats.textContent = pokemon.stats.map(stat => `${stat.name}: ${stat.value}`).join(', ');
    };

    const changePokemon = async () => {
        for (let i = 0; i < containers.length; i++) {
            const randomNumber = Math.ceil(Math.random() * 150) + 1;
            const pokemonData = await getPokemonData(randomNumber);
            const pokemon = createPokemonObject(pokemonData);
            pokemon.id = randomNumber; // Ajoute l'ID à l'objet Pokemon

            pokemons[i] = pokemon; // Stocke le Pokemon dans le tableau

            updatePokemonInfo(pokemon, containers[i]);
        }
    };

    changePokemon();

    button.addEventListener("click", changePokemon);
});

