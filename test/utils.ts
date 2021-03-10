import { ReactWrapper, ShallowWrapper } from "enzyme";

export const findByTestAttr = (
  wrapper: ShallowWrapper | ReactWrapper,
  val: string
) => {
  const component = wrapper.find(`[data-test='${val}']`);
  return component;
};
