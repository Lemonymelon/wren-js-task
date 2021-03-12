import React from "react";
import { shallow, mount, ReactWrapper, ShallowWrapper } from "enzyme";
import { findByTestAttr } from "./utils";
// import { IField, ISheep, IFarmer } from "../src/interfaces";
// import { Field, Sheep, Farmer, App } from "../src/components";
import { App } from "../src/components";

const setupShallow = () => {
  const component = shallow(<App />);
  return component;
};

const setupMount = () => {
  const component = mount(<App />);
  return component;
};

let wrapper: ReactWrapper | ShallowWrapper;

describe("App render", () => {
  it("renders an App upon initial load", () => {
    wrapper = setupShallow();
    const app = findByTestAttr(wrapper, "App");
    expect(app).toHaveLength(1);
  });

  it("renders an App with a farmer div upon initial load", () => {
    wrapper = setupMount();
    const app = findByTestAttr(wrapper, "App");
    expect(app.find("div.farmer")).toHaveLength(1);
  });

  // mount field testing
  // renders a field after farmer width, height controls are inputted, and button is clicked

  // it("renders an App without fields or sheep upon initial load", () => {
  //   wrapper = setupShallow();
  //   const app = findByTestAttr(wrapper, "App");
  //   expect(app.find("div.field")).toHaveLength(0);
  // });
});
