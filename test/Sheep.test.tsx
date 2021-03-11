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

describe("Sheep render", () => {
  let wrapper: ShallowWrapper;

  it("renders when passed the minimum required props", () => {
    wrapper = setup(defaultSheepProps);
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(sheep).toHaveLength(1);
  });

  it("renders with a name and a gender displayed", () => {
    wrapper = setup(defaultSheepProps);
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(sheep.find("div.sheep__name")).toHaveLength(1);
    expect(sheep.find("div.sheep__name").text()).toBe('"Mutton"');
    expect(sheep.find("div.sheep__gender")).toHaveLength(1);
    expect(sheep.find("div.sheep__gender").text()).toBe("male");
  });

  it("assumes the correct class when branded", () => {
    wrapper = setup({ ...defaultSheepProps, isBranded: true });
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(sheep.hasClass("sheep--branded")).toBe(true);
  });

  it("assumes the correct class when it is the primary selected sheep", () => {
    wrapper = setup({ ...defaultSheepProps, sheepSelectedNumber: 1 });
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(sheep.hasClass("sheep--selectedSheep1")).toBe(true);
  });

  it("assumes the correct class when it is the secondary selected sheep", () => {
    wrapper = setup({ ...defaultSheepProps, sheepSelectedNumber: 2 });
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(sheep.hasClass("sheep--selectedSheep2")).toBe(true);
  });
});

describe("Sheep methods", () => {
  let wrapper: ShallowWrapper;

  it("calls selectSheep method when sheep is clicked", () => {
    const mockSelectSheep = jest.fn();
    wrapper = setup({ ...defaultSheepProps, selectSheep: mockSelectSheep });
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(mockSelectSheep).toBeCalledTimes(0);
    sheep.simulate("click", {
      stopPropagation: () => {},
    });
    expect(mockSelectSheep).toBeCalledTimes(1);
  });

  it("calls selectField method when sheep is clicked", () => {
    const mockSelectField = jest.fn();
    wrapper = setup({ ...defaultSheepProps, selectField: mockSelectField });
    const sheep = findByTestAttr(wrapper, "sheep");
    expect(mockSelectField).toBeCalledTimes(0);
    sheep.simulate("click", {
      stopPropagation: () => {},
    });
    expect(mockSelectField).toBeCalledTimes(1);
  });
});
