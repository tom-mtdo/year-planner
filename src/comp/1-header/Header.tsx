import { StyledH1 } from "../comp.style";

import { StyledCtrBox, StyledHeader } from "./Header.style";
import Checkbox from "../../data-lib/adapter/MU-adapter/checkbox/Checkbox";

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Year Planner - 2021</StyledH1>
      <StyledCtrBox>
        <Checkbox compId={"settings.showSettings"} dataPath={"settings.showSettings"}/>
        <strong>Settings</strong>
      </StyledCtrBox>
    </StyledHeader>
  );
}
