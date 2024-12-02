import { Eeveelution } from './model/Eeveelution';
import { EeveelutionAdapter } from './adpterApi';

export class EeveelutionFactory {
  static async createEeveelutionsFromNames(names: string[], moveNamesArray: string[][]): Promise<Eeveelution[]> {
    // Fazendo chamadas à API para pegar os dados de cada Eeveelution
    const apiResponses = await Promise.all(names.map(name => this.fetchEeveelutionData(name)));

    // Criando as Eeveelutions com base nas respostas da API
    const eeveelutions = apiResponses.map(apiResponse => EeveelutionAdapter.fromApiResponse(apiResponse));

    // Atribuindo os movimentos a cada Eeveelution
    return this.assignMovesToEeveelutions(eeveelutions, moveNamesArray);
  }

  private static async fetchEeveelutionData(name: string): Promise<any> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return data;
  }

  private static async assignMovesToEeveelutions(
    eeveelutions: Eeveelution[],
    moveNamesArray: string[][]
  ): Promise<Eeveelution[]> {
    // Valida se o número de Eeveelutions corresponde ao número de arrays de movimentos
    if (eeveelutions.length !== moveNamesArray.length) {
      throw new Error("O número de Eeveelutions não corresponde ao número de arrays de movimentos.");
    }

    // Atribuindo movimentos para cada Eeveelution
    const eeveelutionsWithMoves = await Promise.all(
      eeveelutions.map(async (eeveelution, index) => {
        const moveNames = moveNamesArray[index];
        const moves = await this.fetchMoves(moveNames);  // Obtendo os movimentos
        return { ...eeveelution, moves };  // Retorna a Eeveelution com os movimentos atribuídos
      })
    );

    return eeveelutionsWithMoves;
  }

  private static async fetchMoves(moveNames: string[]): Promise<any[]> {
    const moveRequests = moveNames.map((name) =>
      fetch(`https://pokeapi.co/api/v2/move/${name}`).then((res) => res.json())
    );

    // Aguarda todas as requisições serem resolvidas
    const movesData = await Promise.all(moveRequests);
    return movesData.map((move) => ({
      id: move.id,
      name: move.name,
      type: move.type.name,
      power: move.power,
      accuracy: move.accuracy,
      pp: move.pp,
      damageClass: move.damage_class.name, // Classe de dano (físico, especial, status)
    }));
  }
}

