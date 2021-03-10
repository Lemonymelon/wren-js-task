import React from "react";
import { ISheep } from "../interfaces";

const Sheep = (props: ISheep) => {
  const {
    name,
    gender,
    id,
    isBranded,
    fieldId,
    fieldIsSelected,
    sheepSelectedNumber,
    selectSheep,
    selectField,
  } = props;

  return (
    <div
      className={`sheep${isBranded ? " sheep--branded" : ""}${
        sheepSelectedNumber ? ` sheep--selectedSheep${sheepSelectedNumber}` : ""
      }`}
      onClick={(event) => {
        event.stopPropagation();
        selectField && !fieldIsSelected ? selectField(fieldId) : null;
        selectSheep && selectSheep(id);
      }}
      key={id}
      data-test="sheep"
    >
      <div className="sheep__name">{`"${name}"`}</div>
      <div className="sheep__gender">{gender}</div>
    </div>
  );
};

export default Sheep;
