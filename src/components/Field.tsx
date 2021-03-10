import React from "react";
import * as CSS from "csstype";

import { IField } from "../interfaces";
import { Sheep } from "./index";

const Field = (props: IField) => {
  const {
    height,
    width,
    sheep,
    selectField,
    selectSheep,
    selectedSheep1Id,
    selectedSheep2Id,
    id,
    isSelected,
  } = props;

  const fieldInlineStyle: CSS.Properties = {
    height: `${(height * 5 + 2).toString()}rem`,
    width: `${(width * 5 + 2).toString()}rem`,
  };

  return (
    <div
      className={`field${isSelected ? " field--selected" : ""}`}
      onClick={() => {
        selectField && selectField(id);
      }}
      style={fieldInlineStyle}
      key={id}
    >
      {sheep.map((sheep, index) => {
        const { name, gender, id, fieldId, isBranded } = sheep;
        return (
          <Sheep
            name={name}
            gender={gender}
            id={id}
            fieldId={fieldId}
            isBranded={isBranded}
            fieldIsSelected={isSelected}
            key={index}
            sheepSelectedNumber={
              id === selectedSheep1Id ? 1 : id === selectedSheep2Id ? 2 : null
            }
            selectSheep={selectSheep}
            selectField={selectField}
          />
        );
      })}
    </div>
  );
};

export default Field;
