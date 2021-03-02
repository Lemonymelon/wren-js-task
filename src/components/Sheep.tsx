import React from "react";
import { ISheep } from "../interfaces";

// import * as sheepImg from "../assets/sheep.png";

const Sheep = (props: ISheep) => {
  const {
    name,
    gender,
    id,
    isBranded,
    fieldId,
    fieldIsSelected,
    selectSheep,
    selectField,
  } = props;

  return (
    <div
      className={`sheep${isBranded ? " sheep--branded" : ""}`}
      onClick={(event) => {
        event.stopPropagation();
        selectField && !fieldIsSelected ? selectField(fieldId) : null;
        selectSheep && selectSheep(id);
      }}
      key={id}
    >
      <div>{gender}</div>
      <div>{name}</div>
    </div>
  );
};

export default Sheep;
