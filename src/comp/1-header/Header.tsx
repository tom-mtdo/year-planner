import { StyledH1 } from "../comp.style";
import { Checkbox } from "@material-ui/core";
import { StyledCtrBox, StyledHeader } from "./Header.style";

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Year Planner - 2021</StyledH1>
      <StyledCtrBox>
        <Checkbox name="checkedA" onChange={() => alert("Hi!")} />
        <strong>Config</strong>
      </StyledCtrBox>
    </StyledHeader>
  );
}
