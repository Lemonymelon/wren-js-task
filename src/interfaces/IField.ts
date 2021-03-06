import { ISheep } from "./index";

export interface IField {
  id: number;
  height: number;
  width: number;
  sheep: ISheep[];
  key?: number;
  isSelected: boolean;
  selectedSheep1Id?: number | null;
  selectedSheep2Id?: number | null;
  selectField?: (fieldId: number) => void;
  selectSheep?: (sheepId: number) => void;
}
