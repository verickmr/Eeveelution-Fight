import { Eeveelution } from "../../model/Eeveelution";

interface TagProps {
  eeveelution: Eeveelution;
}

const Tag: React.FC<TagProps> = ({ eeveelution }) => {
  // Calcula a porcentagem de HP restante
  const hpPercentage = (eeveelution.hp / eeveelution.maxHp) * 100;

  return (
    <>
      <div className="absolute bottom-5 right-16 w-2/5 h-[21%] rounded-tl-3xl rounded-tr-xl rounded-bl-xl rounded-br-3xl border-transparent bg-[#1f1f27] p-1.5">
        <div className="bg-[#f0f0d0] rounded-tl-3xl rounded-tr-xl rounded-bl-xl rounded-br-3xl h-full border-transparent">
          <ul className="list-none h-full flex flex-col w-[90%] mx-auto p-2">
            <li className="w-full h-[50%] flex justify-between">
              <span className="text-l font-semibold uppercase">{eeveelution.name}</span>
              <span className="text-sm">Lv: 99</span>
            </li>
            <li className="w-full h-[50%] flex items-end">
              <div className="w-[80%] h-[70%] left-10 bottom-1 bg-[#404050] rounded-full mx-auto relative">
                <div className="absolute left-1.5 text-[#e67959] font-bold text-sm">HP</div>
                <div className="w-[85%] h-[70%] bg-white rounded-full relative top-[15%] left-[13%]">
                  {/* Barra de HP dinâmica */}
                  <div
                    className="h-[70%] bg-[#6EDAAB] rounded-full relative top-[15%] left-[2.5%]"
                    style={{ width: `${hpPercentage}%` }}
                  ></div>
                </div>
              </div>
            </li>
            <li className="w-full h-[35%] flex justify-end">
              <span className="text-[#404050] font-semibold text-sm">
                {eeveelution.hp} / {eeveelution.maxHp}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="absolute bottom-2 right-36 w-1/3 h-1/6 bg-[#404050] mx-auto -z-10"
        style={{
          clipPath: "polygon(25% 0%, 100% 25%, 100% 100%, 0% 100%)",
        }}
      />
    </>
  );
};

export default Tag;
