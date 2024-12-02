import { Eeveelution, Move } from "../models/Eeveelution";
import { handleStatusEffect } from "./state";

export function executeAttack(
  attacker: Eeveelution,
  defender: Eeveelution,
  move: Move
): AttackResult {
  

  // Determina se o ataque atinge
  const accuracyRoll = Math.random() * 100;
  if (accuracyRoll > move.accuracy) {
    return {
      damage: 0,
      remainingHp: defender.hp,
      isHit: false,
    };
  }

  // Determina estatísticas de ataque e defesa
  const attackStat = move.name.toLowerCase().includes("special")
    ? attacker.spAttack
    : attacker.attack;
  const defenseStat = move.name.toLowerCase().includes("special")
    ? defender.spDefense
    : defender.defense;

  // Cálculo básico de dano
  const baseDamage =
    ((2 * 1) / 5 + 2) * (move.power * (attackStat / defenseStat)) / 50 + 2;

  // Modificadores de dano
  let damageModifier = 1;

  // STAB
  if (attacker.type.includes(move.type)) {
    damageModifier *= 1.5;
  }



  // Efeito de status
  handleStatusEffect(attacker);


  // Dano final
  const totalDamage = Math.floor(baseDamage * damageModifier);
  const remainingHp = Math.max(0, defender.hp - totalDamage);

  return {
    damage: totalDamage,
    remainingHp,
    isHit: true,
  };
}
