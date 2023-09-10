import Spacer from "./spacer";

const SpaceAround = (
  fn: () => void,
  spaceAbove?: number,
  spaceBelow?: number
) => {
  Spacer(spaceAbove);
  fn();
  Spacer(spaceBelow);
};

export default SpaceAround;
