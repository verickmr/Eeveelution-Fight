import { useLocation } from "react-router-dom";
import PokemonBattle from "../assets/components/Batle";

export const Game = () => {
  const location = useLocation();
  const { selectedEeveelutions, remainingEeveelutions } = location.state || {};

  return (
    <div>
      {/* Cabeçalho com logo */}
      <div className="mx-auto max-w-7xl flex text-center justify-between items-center">
        <img src="/logoEeveelution fight.png" alt="logo" className="w-80 p-5" />
      </div>
      <div>
      
    </div>

      {/* Área principal do jogo */}
      <div className="max-w-5xl game-font max-h-[650px] border-2 border-black m-auto">
        <PokemonBattle
           selectedEeveelutions={selectedEeveelutions}
           remainingEeveelutions={remainingEeveelutions}
        />
      </div>
    </div>
  );
};