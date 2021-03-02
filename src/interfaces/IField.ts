import { ISheep } from "./index";

export interface IField {
  id: number;
  height: number;
  width: number;
  sheep: ISheep[];
  key?: number;
  isSelected: boolean;
  selectField?: (fieldId: number) => void;
  selectSheep?: (sheepId: number) => void;
}
