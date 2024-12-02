export type Move = {
    name: string;
    type: string;
    power: number | null; // Algumas vezes pode ser null
    accuracy: number | null;
    description:string
  };