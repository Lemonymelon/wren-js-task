export interface ISheep {
  id: number;
  name: string;
  gender: "male" | "female";
  fieldId: number;
  isBranded?: boolean;
  key?: number;
  sheepSelectedNumber?: null | 1 | 2;
  fieldIsSelected?: boolean;
  selectSheep?: (sheepId: number) => void;
  selectField?: (fieldId: number) => void;
}
