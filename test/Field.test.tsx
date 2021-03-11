import React from "react";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "./utils";
import { IField } from "../src/interfaces";
import { Field } from "../src/components";

const setupShallow = (props: IField) => {
  const component = shallow(<Field {...props} />);
  return component;
};

const setupMount = (props: IField) => {
  const component = mount(<Field {...props} />);
  return component;
};

const defaultFieldProps: IField = {
  id: 0,
  height: 3,
  width: 3,
  sheep: [],
  isSelected: false,
};

describe("Sheep render", () => {
  let wrapper: ReactWrapper | ShallowWrapper;

  it("renders when passed the minimum required props", () => {
    wrapper = setupShallow(defaultFieldProps);
    const field = findByTestAttr(wrapper, "field");
    expect(field).toHaveLength(1);
  });

  it("renders sheep when passed an array of sheep", () => {
    wrapper = setupMount({
      ...defaultFieldProps,
      sheep: [
        {
          id: 0,
          name: "Mutton",
          gender: "male",
          fieldId: 0,
        },
      ],
    });

    // const field = findByTestAttr(wrapper, "field");
    // expect(field.find("div.sheep")).toHaveLength(1);
  });
});

// describe("Sheep methods", () => {
//   let wrapper: ShallowWrapper;

//   it("calls selectSheep method when sheep is clicked", () => {
//     const mockSelectSheep = jest.fn();
//     wrapper = setup({ ...defaultSheepProps, selectSheep: mockSelectSheep });
//     const sheep = findByTestAttr(wrapper, "sheep");
//     expect(mockSelectSheep).toBeCalledTimes(0);
//     sheep.simulate("click", {
//       stopPropagation: () => {},
//     });
//     expect(mockSelectSheep).toBeCalledTimes(1);
//   });

// });
