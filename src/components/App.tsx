import Field from "./Field";
import Farmer from "./Farmer";

import { ISheep, IField } from "../interfaces";
import React, { useState } from "react";

const App = () => {
  const [fields, setFields] = useState<IField[]>([]);
  const [sheep, setSheep] = useState<ISheep[]>([]);

  const [selectedField, setSelectedField] = useState<number | null>(null);
  const [selectedSheep1Id, setSelectedSheep1Id] = useState<number | null>(null);
  const [selectedSheep2Id, setSelectedSheep2Id] = useState<number | null>(null);

  const [nextFieldId, setNextFieldId] = useState(0);
  const [nextSheepId, setNextSheepId] = useState(0);
  const [nextMuttonId, setNextMuttonId] = useState(1);

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
    const fieldSheep = sheep.filter((sheep) => sheep.fieldId === fieldId);
    const { height, width } = fields.filter((field) => field.id === fieldId)[0];
    console.log(height, width, fieldSheep.length);

    return height * width <= fieldSheep.length;
  };

  const addSheep = (
    name: string,
    gender: "male" | "female",
    fieldId: number
  ) => {
    if (selectedField !== null && !isFieldFull(selectedField)) {
      const newSheep: ISheep = { name, gender, id: nextSheepId, fieldId };
      setNextSheepId(nextSheepId + 1);
      setSheep([...sheep, newSheep]);
    } else {
      alert("This field is full! Sheep need their personal space.");
    }
  };

  const brandSheep = (sheepId: number) => {
    const tempSheep = sheep.map((sheep) => {
      sheep.id === sheepId ? (sheep.isBranded = !sheep.isBranded) : null;

      return sheep;
    });

    setSheep(tempSheep);
  };

  const releaseSheep = (sheepId: number) => {
    const tempSheep = sheep.filter((sheep) => sheep.id !== sheepId);
    setSelectedSheep1Id(null);
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
    if (!isFieldFull(fieldId)) {
      const [sheep1] = sheep.filter((sheep) => sheep.id === sheep1Id);
      const [sheep2] = sheep.filter((sheep) => sheep.id === sheep2Id);

      if (
        sheep1.gender !== sheep2.gender &&
        !sheep1.isBranded &&
        !sheep2.isBranded
      ) {
        const breedingIsSuccessful = Math.random() < 0.5;
        if (breedingIsSuccessful) {
          alert(`${sheep1.name} and ${sheep2.name} are trying to have a baby.`);

          const newSheepGender = Math.random() < 0.5 ? "male" : "female";

          const muttonGenerator = () => {
            alert("Fine. Mutton it is.");
            setNextMuttonId(nextMuttonId + 1);
            return `Mutton${nextMuttonId}`;
          };

          let newSheepName =
            prompt(
              `It's a ${newSheepGender === "male" ? "boy" : "girl"}! Give ${
                newSheepGender === "male" ? "him" : "her"
              } a name!`
            ) || muttonGenerator();

          const newSheep: ISheep = {
            name: newSheepName,
            gender: newSheepGender,
            id: nextSheepId,
            fieldId,
          };

          setSheep([...sheep, newSheep]);
        } else {
          alert(
            `${sheep1.name} and ${sheep2.name} were unsuccessful. Better luck next time!`
          );
        }
      } else {
        alert("That isn't how you make a sheep.");
      }
    } else {
      alert("This field is full! Sheep need their personal space.");
    }
  };

  const breedSelectedSheep = () => {
    selectedSheep1Id !== null &&
      selectedSheep2Id !== null &&
      selectedField !== null &&
      breedSheep(selectedSheep1Id, selectedSheep2Id, selectedField);
  };

  const breedRandomSheep = () => {
    if (selectedField !== null) {
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
              selectedSheep1Id={selectedSheep1Id}
              selectedSheep2Id={selectedSheep2Id}
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
