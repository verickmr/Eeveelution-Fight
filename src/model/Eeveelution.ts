import { Move } from "./move";

export type Eeveelution = {
  state:string
  imgCard: string
    name: string;
    type: string;
    hp: number;
    maxHp: number;
    attack: number;
    defense: number;
    spAttack: number;
    spDefense: number;
    speed: number;
    imgFront: string,
    imgBack: string,
    ability: string
    moves: Move[];
  };