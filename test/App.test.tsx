import React from "react";
import { shallow, ReactWrapper, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "./utils";
// import { IField, ISheep, IFarmer } from "../src/interfaces";
// import { Field, Sheep, Farmer, App } from "../src/components";
import { App } from "../src/components";

const setupShallow = () => {
  const component = shallow(<App />);
  return component;
};

// const setupMount = () => {
//   const component = mount(<App />);
//   return component;
// };

describe("App render", () => {
  let wrapper: ReactWrapper | ShallowWrapper;

  it("renders an App upon initial load", () => {
    wrapper = setupShallow();
    const app = findByTestAttr(wrapper, "App");
    expect(app).toHaveLength(1);
  });
});

// App could have had an interface
