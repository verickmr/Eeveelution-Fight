import { executeAttack } from "./Attack";
import { Eeveelution } from "./Eeveelution";
import { Move } from "./move";

export function executeTurn(
  active: Eeveelution,
  activeEnemy: Eeveelution,
  moveActive: Move,
  moveEnemy: Move
): TurnResult {
  const log: string[] = [];

  // Determina quem ataca primeiro
  const firstAttacker =
    active.speed >= activeEnemy.speed ? active : activeEnemy;
  const secondAttacker = firstAttacker === active ? activeEnemy : active;

  const firstMove = firstAttacker === active ? moveActive : moveEnemy;
  const secondMove = firstAttacker === active ? moveEnemy : moveActive;

  // Primeiro ataque
  const firstResult = executeAttack(firstAttacker, secondAttacker, firstMove);
  secondAttacker.hp = firstResult.remainingHp;

  if (firstResult.isHit) {
    log.push(
      `${firstAttacker.name} usou ${firstMove.name} e causou ${firstResult.damage} de dano em ${secondAttacker.name}! HP restante: ${secondAttacker.hp}`
    );
  } else {
    log.push(`${firstAttacker.name} usou ${firstMove.name}, mas errou!`);
  }

  // Verifica se o segundo atacante foi derrotado
  if (secondAttacker.hp <= 0) {
    log.push(`${secondAttacker.name} foi derrotado!`);
    return { active: firstAttacker, activeEnemy: secondAttacker, log }; // Retorna a batalha com o vencedor
  }

  // Segundo ataque
  const secondResult = executeAttack(secondAttacker, firstAttacker, secondMove);
  firstAttacker.hp = secondResult.remainingHp;

  if (secondResult.isHit) {
    log.push(
      `${secondAttacker.name} usou ${secondMove.name} e causou ${secondResult.damage} de dano em ${firstAttacker.name}! HP restante: ${firstAttacker.hp}`
    );
  } else {
    log.push(`${secondAttacker.name} usou ${secondMove.name}, mas errou!`);
  }

  // Verifica se o primeiro atacante foi derrotado
  if (firstAttacker.hp <= 0) {
    log.push(`${firstAttacker.name} foi derrotado!`);
  }

  return { active: firstAttacker.hp > 0 ? firstAttacker : secondAttacker, activeEnemy: secondAttacker.hp > 0 ? secondAttacker : firstAttacker, log };
}
