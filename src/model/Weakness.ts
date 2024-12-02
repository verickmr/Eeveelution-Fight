export enum PokemonType {
  Fire = "Fire",
  Water = "Water",
  Grass = "Grass",
  Electric = "Electric",
  Ice = "Ice",
  Psychic = "Psychic",
  Dark = "Dark",
  Fairy = "Fairy",
  Rock = "Rock",
  Bug = "Bug",
  Ground = "Ground",
  Flying = "Flying",
}

export const typeChart: { [attackerType in PokemonType]?: { [defenderType in PokemonType]?: number } } = {
  [PokemonType.Fire]: { 
    [PokemonType.Water]: 0.5, 
    [PokemonType.Grass]: 2, 
    [PokemonType.Fire]: 0.5, 
    [PokemonType.Rock]: 0.5, 
    [PokemonType.Bug]: 2, 
    [PokemonType.Ice]: 2 
  },
  [PokemonType.Water]: { 
    [PokemonType.Fire]: 2, 
    [PokemonType.Grass]: 0.5, 
    [PokemonType.Water]: 0.5, 
    [PokemonType.Rock]: 2, 
    [PokemonType.Ground]: 2 
  },
  [PokemonType.Grass]: { 
    [PokemonType.Water]: 2, 
    [PokemonType.Fire]: 0.5, 
    [PokemonType.Grass]: 0.5, 
    [PokemonType.Rock]: 2, 
    [PokemonType.Ground]: 2, 
    [PokemonType.Flying]: 0.5 
  },
  [PokemonType.Electric]: { 
    [PokemonType.Water]: 2, 
    [PokemonType.Flying]: 2, 
    [PokemonType.Electric]: 0.5, 
    [PokemonType.Grass]: 0.5, 
    [PokemonType.Ground]: 0 
  },
  [PokemonType.Ice]: { 
    [PokemonType.Grass]: 2, 
    [PokemonType.Fire]: 0.5, 
    [PokemonType.Water]: 0.5, 
    [PokemonType.Ice]: 0.5, 
    [PokemonType.Rock]: 0.5 
  },
  [PokemonType.Psychic]: { 
    [PokemonType.Fighting]: 2, 
    [PokemonType.Poison]: 2, 
    [PokemonType.Dark]: 0, 
    [PokemonType.Psychic]: 0.5 
  },
  [PokemonType.Dark]: { 
    [PokemonType.Psychic]: 2, 
    [PokemonType.Fairy]: 0.5, 
    [PokemonType.Fighting]: 0.5, 
    [PokemonType.Ghost]: 2, 
    [PokemonType.Dark]: 0.5 
  },
  [PokemonType.Fairy]: { 
    [PokemonType.Fighting]: 2, 
    [PokemonType.Dragon]: 2, 
    [PokemonType.Dark]: 2, 
    [PokemonType.Fire]: 0.5, 
    [PokemonType.Poison]: 0.5, 
    [PokemonType.Steel]: 0.5 
  },
};

export function getTypeEffectiveness(
  moveType: PokemonType,
  defenderTypes: PokemonType[]
): number {
  let multiplier = 1;
  defenderTypes.forEach((type) => {
    if (typeChart[moveType]?.[type]) {
      multiplier *= typeChart[moveType]![type]!;
    }
  });
  return multiplier;
}
