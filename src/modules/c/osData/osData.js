import { LightningElement, track } from 'lwc';
import { getPokemon, capitalize } from './util';

export default class OsData extends LightningElement {
    pokemonName = 'ditto';

    @track
    pokemonData;

    // Use custom get functions to retrieve the desired pieces of data
    get pkmName() {
        return capitalize(this.pokemonData.name);
    }

    get pkmSprite() {
        return this.pokemonData.sprites.front_default;
    }

    get altText() {
        return `Front Sprite for ${this.pkmName}`;
    }

    get pkmTypes() {
        return this.pokemonData.types.map(t => capitalize(t.type.name));
    }

    get pkmAbilities() {
        return this.pokemonData.abilities.map(t => {
            return (t.is_hidden) ? `Hidden Ability: ${capitalize(t.ability.name)}` : capitalize(t.ability.name);
        })
    }

    get pkmHealth() {
        return this.pokemonData.stats[0].base_stat;
    }

    get pkmAttack() {
        return this.pokemonData.stats[1].base_stat;
    }

    get pkmDefense() {
        return this.pokemonData.stats[2].base_stat;
    }

    get pkmSpAttack() {
        return this.pokemonData.stats[3].base_stat;
    }

    get pkmSpDefense() {
        return this.pokemonData.stats[4].base_stat;
    }

    get pkmSpeed() {
        return this.pokemonData.stats[5].base_stat;
    }

    updatePokemonData(event) {

        // This method is in response for keydown and click events, so filter out the non-enter key events
        if (event.code && event.code != 'Enter') return;

        this.inputsBusy();
        this.pokemonName = this.template.querySelector("input[type=text]").value;

        // This function returns a promise with the data from the callout
        getPokemon(this.pokemonName)
            .then(response => {
                this.pokemonData = response;
                this.inputsReady();
            })
            .catch(error => {
                console.error(`Request resulted in an error: ${error}`);
                this.inputsReady();
            });
    }

    // Used for accessibility to let aria users know when they should modify the inputs again
    inputsBusy() {
        let inputs = this.template.querySelectorAll("section[role=search] *");
        for (let ele of inputs) {
            ele.setAttribute("aria-busy", "true");
        }
    }

    inputsReady() {
        let inputs = this.template.querySelectorAll("section[role=search] *");
        for (let ele of inputs) {
            ele.setAttribute("aria-busy", "false");
        }
    }
}