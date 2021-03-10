import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "./utils";
import { ISheep } from "../src/interfaces";
import Sheep from "../src/components/Sheep";

const setup = (props: ISheep) => {
  const component = shallow(<Sheep {...props} />);
  return component;
};

const defaultSheepProps: ISheep = {
  id: 0,
  name: "Mutton",
  gender: "male",
  fieldId: 0,
};

describe("Sheep", () => {
  let wrapper: ShallowWrapper;

  it("renders a sheep when passed the minimum required props", () => {
    wrapper = setup(defaultSheepProps);
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(sheep).toHaveLength(1);
  });
});
