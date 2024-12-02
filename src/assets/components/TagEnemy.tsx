import { Eeveelution } from "../../model/Eeveelution";

interface TagEnemyProps {
  eeveelution: Eeveelution;
}

const TagEnemy: React.FC<TagEnemyProps> = ({ eeveelution }) => {
  // Calculando a porcentagem de HP
  const hpPercentage = (eeveelution.hp / eeveelution.maxHp) * 100;

  return (
    <div>
      <div className="absolute top-12 left-16 w-2/5 h-1/6 rounded-tl-3xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border-transparent bg-[#1f1f27] p-1.5">
        <div className="bg-[#f0f0d0] rounded-tl-3xl rounded-tr-xl rounded-bl-xl rounded-br-3xl h-full border-transparent">
          <ul className="list-none h-full flex flex-col w-[90%] mx-auto p-2">
            <li className="w-full h-[50%] flex justify-between">
              <span className="text-l font-semibold uppercase">{eeveelution.name}</span>
              <span className="text-sm">Lv:  99</span>
            </li>
            <li className="w-full h-[50%] flex items-end">
              <div className="w-[80%] h-[70%] left-10 bottom-1 bg-[#404050] rounded-full mx-auto relative">
                <div className="absolute left-1.5 text-[#e67959] font-bold text-sm">
                  HP
                </div>
                <div className="w-[85%] h-[70%] bg-white rounded-full relative top-[15%] left-[13%]">
                  {/* Barra de HP com a largura dinâmica baseada na porcentagem */}
                  <div
                    className="w-full h-full bg-[#6EDAAB] rounded-full"
                    style={{
                      width: `${hpPercentage}%`, // A largura da barra depende da porcentagem de HP
                    }}
                  ></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="absolute top-16 left-36 w-1/3 h-1/6 bg-[#404050] mx-auto -z-10"
        style={{
          clipPath: "polygon(0% 25%, 75% 0%, 100% 100%, 0% 100%)",
        }}
      />
    </div>
  );
};

export default TagEnemy;
