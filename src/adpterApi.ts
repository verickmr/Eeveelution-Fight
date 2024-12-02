import { Eeveelution } from './model/Eeveelution';

export class EeveelutionAdapter {
  static fromApiResponse(apiResponse: any): Eeveelution {
    return {
      name: apiResponse.name,
      type: apiResponse.types[0]?.type?.name || "Unknown", // Pode haver múltiplos tipos, pegando o primeiro
      hp: apiResponse.stats.find((stat: any) => stat.stat.name === 'hp')?.base_stat || 0,
      attack: apiResponse.stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat || 0,
      defense: apiResponse.stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat || 0,
      spAttack: apiResponse.stats.find((stat: any) => stat.stat.name === 'special-attack')?.base_stat || 0,
      spDefense: apiResponse.stats.find((stat: any) => stat.stat.name === 'special-defense')?.base_stat || 0,
      speed: apiResponse.stats.find((stat: any) => stat.stat.name === 'speed')?.base_stat || 0,
      imgFront: apiResponse.sprites.front_default,
      imgBack: apiResponse.sprites.back_default,
      ability: apiResponse.abilities[0]?.ability?.name || "Unknown", // Assumindo que há pelo menos uma habilidade
      moves: [],  // Se você tiver dados de movimentos, você pode mapear da mesma forma
    };
  }
}