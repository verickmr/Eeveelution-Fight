import React, { useState } from "react";
import Tag from "./Tag";
import TagEnemy from "./TagEnemy";
import { Eeveelution, Move } from "../../model/Eeveelution";
import { executeTurn, TurnResult } from "../../model/Turn";

interface PokemonBattleProps {
  selectedEeveelutions: Eeveelution[];
  remainingEeveelutions: Eeveelution[];
}

const PokemonBattle: React.FC<PokemonBattleProps> = ({
  selectedEeveelutions,
  remainingEeveelutions,
}) => {
  const [isRightPanelVisible, setIsRightPanelVisible] = useState(true);
  const [log, setLog] = useState<string[]>([]);
  const [active, setActive] = useState<Eeveelution>(selectedEeveelutions[0]);
  const [activeEnemy, setActiveEnemy] = useState<Eeveelution>(remainingEeveelutions[0]);
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);
  const [isFightClicked, setIsFightClicked] = useState(false);

  // Inicia o movimento de luta
  const handleFightClick = () => {
    if (active && active.moves) {
      setIsFightClicked(true);
      setSelectedMove(active.moves[0]); // Define o primeiro movimento como selecionado
    }
  };

  // Seleciona um movimento específico
  const handleMoveClick = (move: Move) => {
    setSelectedMove(move); // Atualiza o movimento selecionado
  };

  // Função para voltar ao estado anterior
  const handleBackClick = () => {
    setIsFightClicked(false);
    setSelectedMove(null); // Limpa o movimento selecionado
  };

  // Executa o ataque quando o jogador clica no botão "Atacar"
  const checkDefeatedAndSwitch = () => {
    // Função auxiliar para alternar Eeveelutions
    const switchEeveelution = (
      current: Eeveelution,
      eeveelutions: Eeveelution[],
      setActiveFn: React.Dispatch<React.SetStateAction<Eeveelution>>,
      isPlayer: boolean
    ) => {
      const nextIndex = eeveelutions.findIndex(eevee => eevee.name === current.name) + 1;
  
      if (nextIndex < eeveelutions.length) {
        const nextEeveelution = { ...eeveelutions[nextIndex] }; // Garantir nova instância
        setActiveFn(nextEeveelution);
  
        console.log(
          isPlayer
            ? `${current.name} foi derrotado! ${nextEeveelution.name} entrou na batalha.`
            : `Inimigo ${current.name} foi derrotado! ${nextEeveelution.name} entrou na batalha.`
        );
      } else {
        console.log(
          isPlayer
            ? "Fim do jogo: todas as Eeveelutions do jogador foram derrotadas!"
            : "Você venceu a batalha!"
        );
      }
    };
  
    // Verifica se a Eeveelution do jogador foi derrotada
    if (active.hp <= 0) {
      switchEeveelution(active, selectedEeveelutions, setActive, true);
    }
  
    // Verifica se a Eeveelution inimiga foi derrotada
    if (activeEnemy.hp <= 0) {
      switchEeveelution(activeEnemy, remainingEeveelutions, setActiveEnemy, false);
    }
  };
  
  
  
  // Chame esta função após cada turno
  const handleAttack = () => {
    if (selectedMove) {
      const enemyMove = activeEnemy.moves[Math.floor(Math.random() * activeEnemy.moves.length)];
      const result: TurnResult = executeTurn(active, activeEnemy, selectedMove, enemyMove);
  
      setActive(result.active);
      setActiveEnemy(result.activeEnemy);
      setLog((prevLog) => [...prevLog, ...result.log]);
  
      // Verifica se as Eeveelutions foram derrotadas
      checkDefeatedAndSwitch();
    }}

  return (
    <div className="h-[650px]">
      {/* Top Section */}
      <div className="h-[510px]">
        <div className="h-full bg-[url(lobby.jpeg)] bg-cover bg-center relative -z-50">
          <Tag eeveelution={active} />
          <img
            className="size-2/5 absolute left-8 bottom-[-50px]"
            src={active.imgBack}
            alt={active.name}
          />
          <img
            className="size-2/5 absolute top-40 right-0"
            src={activeEnemy.imgFront}
            alt={activeEnemy.name}
          />
          <TagEnemy eeveelution={activeEnemy} />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="h-[30%] w-full bg-[#404050] relative z-3 flex">
        {/* Painel de Movimentos */}
        <div className="h-[90%] bg-[#CF5132] rounded-2xl w-[99%] top-[5%] left-[0.5%] relative z-4">
          <div className="h-[90%] bg-[#589098] rounded-2xl w-[95%] top-[5%] left-[2.5%] relative z-5 overflow-auto">
            <div id="text" className="p-5 text-white">
              {isFightClicked && active.moves ? (
                <ul className="grid grid-cols-2 gap-2">
                  {active.moves.map((move, index) => (
                    <li
                    key={index}
                    className="cursor-pointer"
                      onClick={() => handleMoveClick(move)}
                    >
                      <strong>{move.name.toUpperCase()}</strong>
                    </li>
                  ))}
                </ul>
              ) : null}
                    {log.map((entry, index) => (
                      <div>
                    <p className="block" key={index}>{entry}</p>
                    <br /></div>
                  ))}
            </div>
          </div>
        </div>

        {/* Painel de Ações */}
        {isRightPanelVisible && (
          <div className="h-[90%] bg-white rounded-2xl w-[50%] top-[5%] right-[0.5%] relative z-4 border border-gray-300 p-6">
            <div className="mt-4 flex gap-4">
              {selectedMove ? (
                <div>
                  <h2 className="text-lg font-bold">
                    {selectedMove.name.toUpperCase()}
                  </h2>
                  <p>PP: {selectedMove.pp}</p>
                  <p>Power: {selectedMove.power || "N/A"}</p>
                  <p>Accuracy: {selectedMove.accuracy || "N/A"}%</p>
                  <p>Type: {selectedMove.damageClass}</p>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded uppercase mt-2"
                    onClick={handleAttack} // Executa o ataque
                  >
                    Atacar
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded uppercase mt-2"
                    onClick={handleBackClick}
                  >
                    Voltar
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded uppercase"
                    onClick={handleFightClick}
                  >
                    FIGHT
                  </button>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded uppercase">
                    SWITCH
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default PokemonBattle;
