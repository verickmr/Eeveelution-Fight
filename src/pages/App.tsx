import { useEffect, useState } from "react";
import { Card } from "../assets/components/Card";
import { EeveelutionFactory } from "../creatorEevvelution";
import { Eeveelution } from "../model/Eeveelution";
import { useNavigate } from "react-router-dom";

const App = () => {
  const [eeveelutions, setEeveelutions] = useState<Eeveelution[]>([]);
  const [selectedEeveelutions, setSelectedEeveelutions] = useState<Eeveelution[]>([]);
  const [disabledPokeballs, setDisabledPokeballs] = useState<boolean[]>([false, false, false, false]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEeveelutions = async () => {
      const eeveelutionNames: string[] = [
        "vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon"
      ];

      // Array de Nomes de movimentos para cada Eeveelution
      const moveNamesArray: string[][] = [
        ["water-gun", "hydro-pump", "aqua-ring", "surf"], // Vaporeon
        ["thunderbolt", "volt-tackle", "thunder", "signal-beam"], // Jolteon
        ["flamethrower", "fire-blast", "will-o-wisp", "flame-charge"], // Flareon
        ["psychic", "shadow-ball", "future-sight", "dazzling-gleam"], // Espeon
        ["foul-play", "moonlight", "toxic", "snarl"], // Umbreon
        ["leaf-blade", "synthesis", "x-scissor", "leaf-storm"], // Leafeon
        ["ice-beam", "blizzard", "hail", "frost-breath"], // Glaceon
        ["moonblast", "hyper-beam", "calm-mind", "psyshock"] // Sylveon
      ];

      // Criando Eeveelutions com os movimentos
      const eeveelutionsData = await EeveelutionFactory.createEeveelutionsFromNames(eeveelutionNames, moveNamesArray);

      // Atualizando as imagen
      eeveelutionsData[7].imgBack = "sylvionback.webp";
      const updatedEeveelutions = eeveelutionsData.map((eeveelution, index) => {
        const images = [
          "vaporeon.png", "jolteon.jpg", "flareon.jpeg", "Espeon.jpeg",
          "umbreon.jpg", "leafeon.jpg", "glacion.jpg", "Sylvion.jpg"
        ];
        if (eeveelution.name === "sylveon") {
          eeveelution.imgBack = "sylvionback.webp";
        }
        eeveelution.maxHp = eeveelution.hp
        eeveelution.imgCard = images[index];
        return eeveelution;
      });

      setEeveelutions(updatedEeveelutions);
    };

    fetchEeveelutions();
  }, []);

  const handleCardClick = (eeveelution: Eeveelution) => {
    if (selectedEeveelutions.length < 4) {
      setSelectedEeveelutions((prev) => [...prev, eeveelution]);

      const newDisabledPokeballs = [...disabledPokeballs];
      const firstDisabledIndex = newDisabledPokeballs.indexOf(false);
      if (firstDisabledIndex !== -1) {
        newDisabledPokeballs[firstDisabledIndex] = true;
        setDisabledPokeballs(newDisabledPokeballs);
      }
    }
  };

  const handleAvancarClick = () => {
    const remainingEeveelutions = eeveelutions.filter(
      (eeveelution) => !selectedEeveelutions.includes(eeveelution)
    );

    navigate("/game", {
      state: { selectedEeveelutions, remainingEeveelutions }
    });
  };

  return (
    <>
      <div className="text-white bg-slate-950">
        <div className="mx-auto max-w-7xl flex text-center justify-between items-center">
          <img src="/logoEeveelution fight.png" alt="logo" className="w-80" />
          <h4 className="uppercase">Escolha 4 Eeveelutions</h4>
          <div className="flex">
            {disabledPokeballs.map((disabled, index) => (
              <div
                key={index}
                className={`pokeball m-5 ${disabled ? "" : "desativa"}`}
              />
            ))}
          </div>
          <button onClick={handleAvancarClick}>Avançar</button>
        </div>
      </div>
      <div>
        {eeveelutions.length === 0 ? (
          <p>Carregando Eeveelutions...</p>
        ) : (
          <div className="grid grid-cols-4 gap-4 mx-auto max-w-7xl mt-2">
            {eeveelutions.map((eeveelution, index) => (
              <Card
                key={index}
                eeveelution={eeveelution}
                onClick={() => handleCardClick(eeveelution)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
