import { StyledH1 } from "../comp.style";
import { Checkbox } from "@material-ui/core";
import { StyledCtrBox, StyledHeader } from "./Header.style";
import { IComp } from '../../data-lib/hook/useComp';
import useComp from '../../data-lib/hook/useComp';
import { BOOLEAN_VALUES } from '../../util/constant';

export const SettingsCheck = (props: IComp) => {
  const { dataPath } = props;
  const { compValue } = useComp({dataPath});

  return(
    <Checkbox name="checkedA" onChange={() => alert("Hi!")} checked={compValue === BOOLEAN_VALUES.TRUE}/>
  )
};

export default function Header() {
  return (
    <StyledHeader>
      <StyledH1>Year Planner - 2021</StyledH1>
      <StyledCtrBox>
        <SettingsCheck dataPath={"settings.showSettings"}/>
        <strong>Config</strong>
      </StyledCtrBox>
    </StyledHeader>
  );
}
