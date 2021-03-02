import { ISheep } from "./index";

export interface IFarmer {
  selectedField: number | null;
  selectedSheep1?: ISheep;
  selectedSheep2?: ISheep;

  createField: (height: number, width: number) => void;
  addSheep: (name: string, gender: "male" | "female", fieldId: number) => void;
  brandSheep: (sheepId: number) => void;
  releaseSheep: (sheepId: number) => void;
  breedSelectedSheep: () => void;
  breedRandomSheep: () => void;
}
