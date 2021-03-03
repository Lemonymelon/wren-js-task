import React, { useState } from "react";

import { IFarmer } from "../interfaces";

const Farmer = (props: IFarmer) => {
  const {
    createField,
    addSheep,
    brandSheep,
    releaseSheep,
    breedSelectedSheep,
    breedRandomSheep,
    selectedField,
    selectedSheep1,
    selectedSheep2,
  } = props;

  const [newFieldWidth, setNewFieldWidth] = useState<number | null>(null);
  const [newFieldHeight, setNewFieldHeight] = useState<number | null>(null);

  const [newSheepName, setNewSheepName] = useState<string | null>(null);
  const [newSheepGender, setNewSheepGender] = useState<
    "male" | "female" | null
  >(null);

  const [maleIsChecked, setMaleIsChecked] = useState(false);
  const [femaleIsChecked, setFemaleIsChecked] = useState(false);

  const handleFieldDimensionOnChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number | null>>
  ) => {
    setter(Number(value));
  };

  return (
    <div className="farmer">
      <div className="farmer__controlsContainer">
        <div className="farmer__controlsSubContainer">
          <div>New field</div>
          <div className="farmer__fieldControls">
            <br />
            <input
              className="characterInput"
              name="newFieldWidth"
              value={newFieldWidth || ""}
              onChange={(event) =>
                handleFieldDimensionOnChange(
                  event.target.value,
                  setNewFieldWidth
                )
              }
              placeholder="How many sheep across?"
            ></input>

            <input
              className="characterInput"
              name="newFieldHeight"
              value={newFieldHeight || ""}
              onChange={(event) =>
                handleFieldDimensionOnChange(
                  event.target.value,
                  setNewFieldHeight
                )
              }
              placeholder="How many sheep down?"
            ></input>

            <button
              onClick={() => {
                newFieldHeight &&
                  newFieldWidth &&
                  createField(newFieldHeight, newFieldWidth);
                setNewFieldWidth(null);
                setNewFieldHeight(null);
              }}
            >
              Create new field
            </button>
          </div>
        </div>

        <div className="farmer__controlsSubContainer">
          <div>New sheep</div>
          <div className="farmer__newSheepControls">
            <div className="radioInput">
              <input
                className="radioInput"
                type="radio"
                value="male"
                id="male"
                name="newSheepGender"
                checked={maleIsChecked}
                onChange={(event) => {
                  event.target.value === "male" &&
                    setNewSheepGender(event.target.value);
                  setMaleIsChecked(true);
                  setFemaleIsChecked(false);
                }}
              ></input>
              <label htmlFor="male">Male</label>
            </div>

            <div className="radioInput">
              <input
                type="radio"
                value="female"
                id="female"
                name="newSheepGender"
                checked={femaleIsChecked}
                onChange={(event) => {
                  event.target.value === "female" &&
                    setNewSheepGender(event.target.value);
                  setFemaleIsChecked(true);
                  setMaleIsChecked(false);
                }}
              ></input>
              <label htmlFor="female">Female</label>
            </div>

            <input
              className="characterInput"
              name="newSheepName"
              type="text"
              value={newSheepName !== null ? newSheepName : ""}
              onChange={(event) => setNewSheepName(event.target.value)}
              placeholder="What is the new sheep's name?"
            ></input>
            {selectedField !== null && newSheepName && newSheepGender ? (
              <button
                onClick={() => {
                  addSheep(newSheepName, newSheepGender, selectedField);
                  setNewSheepName(null);
                  setMaleIsChecked(false);
                  setFemaleIsChecked(false);
                }}
              >
                Add sheep
              </button>
            ) : (
              <button disabled>Add sheep</button>
            )}
          </div>
        </div>

        <div className="farmer__controlsSubContainer">
          <u>Selected sheep 1:</u>
          <div>
            {selectedSheep1 ? (
              `${selectedSheep1.name} (field ${selectedField})`
            ) : (
              <br />
            )}
          </div>
          <u>Selected sheep 2:</u>
          <div>
            {selectedSheep2 ? (
              `${selectedSheep2.name} (field ${selectedField})`
            ) : (
              <br />
            )}
          </div>

          <div className="farmer__selectedSheepControls">
            {selectedSheep1 && !selectedSheep2 ? (
              <button onClick={() => brandSheep(selectedSheep1.id)}>
                Brand sheep
              </button>
            ) : (
              <button disabled>Brand sheep</button>
            )}
            {selectedSheep1 && !selectedSheep2 ? (
              <button onClick={() => releaseSheep(selectedSheep1.id)}>
                Release sheep
              </button>
            ) : (
              <button disabled>Release sheep</button>
            )}

            <br />

            {selectedSheep1 && selectedSheep2 ? (
              <button onClick={breedSelectedSheep}>Breed sheep</button>
            ) : (
              <button disabled>Breed sheep</button>
            )}
          </div>
          <div>
            {selectedField !== null ? (
              <button onClick={breedRandomSheep}>Breed Random Sheep</button>
            ) : (
              <button disabled>Breed Random Sheep</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Farmer;
