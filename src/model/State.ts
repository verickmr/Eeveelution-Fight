import { Eeveelution } from "../models/Eeveelution";

export function handleStatusEffect(pokemon: Eeveelution): void {
  if (pokemon.state === "burn") {
    pokemon.attack = Math.floor(pokemon.attack / 2);
    console.log(`${pokemon.name} está queimado! Ataque reduzido.`);
  }
}
