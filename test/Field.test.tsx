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
        {
          id: 1,
          name: "Mutton1",
          gender: "female",
          fieldId: 0,
        },
      ],
    });

    const field = findByTestAttr(wrapper, "field");
    expect(field.find("div.sheep")).toHaveLength(2);
  });

  it("assumes the correct class when selected", () => {
    wrapper = setupShallow({ ...defaultFieldProps, isSelected: true });
    const field = findByTestAttr(wrapper, "field");
    expect(field.hasClass("field--selected")).toBe(true);
  });
});

// test css - sheep = field dimensions logic
