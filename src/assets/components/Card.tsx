import { EeveelutionType, EeveelutionDarkType } from "../../enumColors";
import { Eeveelution } from "../../model/Eeveelution";

type CardProps = {
  eeveelution: Eeveelution;
  onClick: () => void;
};

export const Card = ({ eeveelution, onClick }: CardProps) => {
  // Obter a cor do tipo normal e do tipo escuro
  const typeColor = EeveelutionType[eeveelution.type.toLowerCase() as keyof typeof EeveelutionType];
  const darkTypeColor = EeveelutionDarkType[`${eeveelution.type.toLowerCase()}Dark` as keyof typeof EeveelutionDarkType];

  // Criar o gradiente usando as cores do tipo normal e dark na diagonal
  const gradientBackground = `linear-gradient(135deg, ${typeColor} 0%,${darkTypeColor} 50%, ${typeColor} 100%)`;

  return (
    <div onClick={onClick}
      className="border-8 border-zinc-300 h-96 w-72 p-4 rounded-md"
      style={{ background: gradientBackground , borderRadius: "16px"}} // Aplicando o gradiente diagonal
    >

      {/* Nome e Tipo */}
      <div className="text-center font-bold text-xl flex capitalize justify-between">
        {eeveelution.name}   <img src={`30px-${eeveelution.type}-attack.png`} alt="icon" className="w-5 h-5" />
      </div>

      {/* Imagem do Card */}
      <div className="text-center my-2">
        <img
          src={eeveelution.imgCard}
          alt={`${eeveelution.name} Card`}
          className="h-40 w-full object-cover mx-auto shadow-md border-4 border-gold"
        />
      </div>

      {/* Estatísticas */}
      <div className="text-sm grid grid-cols-[40%_60%] text-zinc-100">
        <p>HP: {eeveelution.hp}</p>
        <p>Special Attack: {eeveelution.spAttack}</p>
        <p>Attack: {eeveelution.attack}</p>
        <p>Special Defense: {eeveelution.spDefense}</p>
        <p>Defense: {eeveelution.defense}</p>
        <p>Speed: {eeveelution.speed}</p>
      </div>

      {/* Habilidade */}
      

      {/* Movimentos */}
      <ul className="mt-4">
        {eeveelution.moves?.map((move, index) => (
          <li key={index}>
            <strong>{move.name}</strong> ({move.type}) - Power: {move.power}
          </li>
        ))}
      </ul>
    </div>
  );
};
