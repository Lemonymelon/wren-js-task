import Field from "./Field";
import Farmer from "./Farmer";

import { ISheep, IField } from "../interfaces";
import React, { useState } from "react";

const App = () => {
  const [fields, setFields] = useState<IField[]>([
    { id: 0, height: 3, width: 3, sheep: [], isSelected: false },
  ]);
  const [sheep, setSheep] = useState<ISheep[]>([
    { name: "a", gender: "male", fieldId: 0, id: 0 },
    { name: "b", gender: "female", fieldId: 0, id: 1 },
  ]);

  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [selectedSheep1Id, setSelectedSheep1Id] = useState<number | null>(null);
  const [selectedSheep2Id, setSelectedSheep2Id] = useState<number | null>(null);

  const [nextFieldId, setNextFieldId] = useState(0);
  const [nextSheepId, setNextSheepId] = useState(0);

  const createField = (height: number, width: number) => {
    const newField: IField = {
      height,
      width,
      id: nextFieldId,
      sheep: [],
      isSelected: false,
    };
    setNextFieldId(nextFieldId + 1);
    setFields([...fields, newField]);
  };

  const selectField = (fieldId: number) => {
    fieldId === selectedField
      ? setSelectedField(null)
      : setSelectedField(fieldId);
  };

  const isFieldFull = (fieldId: number) => {
    const { height, width, sheep } = fields.filter(
      (field) => field.id === fieldId
    )[0];
    return height * width < sheep.length;
  };

  const addSheep = (
    name: string,
    gender: "male" | "female",
    fieldId: number
  ) => {
    const newSheep: ISheep = { name, gender, id: nextSheepId, fieldId };
    setNextSheepId(nextSheepId + 1);
    setSheep([...sheep, newSheep]);
  };

  const brandSheep = (sheepId: number) => {
    const tempSheep = sheep.map((sheep) => {
      sheep.id === sheepId ? (sheep.isBranded = !sheep.isBranded) : null;
      console.log(sheep);
      return sheep;
    });

    setSheep(tempSheep);
  };

  const releaseSheep = (sheepId: number) => {
    const tempSheep = sheep.filter((sheep) => sheep.id !== sheepId);
    setSheep(tempSheep);
  };

  const selectBreedingPartner = (sheepId: number) => {
    selectedSheep2Id === sheepId
      ? setSelectedSheep2Id(null)
      : setSelectedSheep2Id(sheepId);
  };

  const selectSheep = (sheepId: number) => {
    if (sheepId === selectedSheep1Id) {
      setSelectedSheep1Id(null);
      setSelectedSheep2Id(null);
    } else {
      if (selectedSheep1Id === null) {
        setSelectedSheep1Id(sheepId);
      } else {
        selectBreedingPartner(sheepId);
      }
    }
  };

  const selectTwoRandomSheepIds = (fieldId: number) => {
    const selectedFieldSheep = sheep
      .filter((sheep) => sheep.fieldId === fieldId)
      .map((sheep) => sheep.id);

    const [sheep1Id] = selectedFieldSheep.splice(
      Math.floor(Math.random() * Math.floor(selectedFieldSheep.length)),
      1
    );
    const [sheep2Id] = selectedFieldSheep.splice(
      Math.floor(Math.random() * Math.floor(selectedFieldSheep.length)),
      1
    );

    return [sheep1Id, sheep2Id];
  };

  const breedSheep = (sheep1Id: number, sheep2Id: number, fieldId: number) => {
    console.log(sheep1Id, sheep2Id, fieldId);
    if (!isFieldFull(fieldId)) {
      const [sheep1] = sheep.filter((sheep) => sheep.id === sheep1Id);
      const [sheep2] = sheep.filter((sheep) => sheep.id === sheep2Id);

      if (sheep1.gender !== sheep2.gender) {
        const [femaleSheep] = [sheep1, sheep2].filter(
          (sheep) => sheep.gender === "female"
        );

        Math.random() < 0.5 ? (femaleSheep.isPregnant = true) : null;

        const sheepWithoutPregnantSheep = sheep.filter(
          (sheep) => sheep.id !== femaleSheep.id
        );

        setSheep([...sheepWithoutPregnantSheep, femaleSheep]);
      } else {
        console.log("That isn't how you make a sheep.");
      }
    } else {
      // error message
    }
  };

  const breedSelectedSheep = () => {
    selectedSheep1Id &&
      selectedSheep2Id &&
      selectedField &&
      breedSheep(selectedSheep1Id, selectedSheep2Id, selectedField);
  };

  const breedRandomSheep = () => {
    if (selectedField) {
      const [sheep1Id, sheep2Id] = selectTwoRandomSheepIds(selectedField);
      breedSheep(sheep1Id, sheep2Id, selectedField);
    }
  };

  return (
    <div className="app">
      <Farmer
        addSheep={addSheep}
        createField={createField}
        brandSheep={brandSheep}
        releaseSheep={releaseSheep}
        breedSelectedSheep={breedSelectedSheep}
        breedRandomSheep={breedRandomSheep}
        selectedField={selectedField}
        selectedSheep1={
          sheep.filter((sheep) => sheep.id === selectedSheep1Id)[0]
        }
        selectedSheep2={
          sheep.filter((sheep) => sheep.id === selectedSheep2Id)[0]
        }
      />
      <div className="fieldsContainer">
        {fields.map((field, index) => {
          const { height, width, id } = field;

          return (
            <Field
              height={height}
              width={width}
              sheep={sheep.filter((sheep) => sheep.fieldId === id)}
              id={id}
              isSelected={id === selectedField}
              key={index}
              selectField={selectField}
              selectSheep={selectSheep}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
